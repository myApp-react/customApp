import React, { Component, PureComponent } from "react";
import PropTypes from 'prop-types';
import styles from './swiperTwoDrawer.less';
import { pictureTypeaAndSize, checkImageWH } from '@/utils'
import { Prefix, uploadUrl, functionData } from '@/utils/config'
import { Drawer, Form, Select, InputNumber, Radio, Button, Upload, Icon, message, Input, } from 'antd';
import shortid from 'shortid';
import _ from 'lodash';



function beforeUpload(file, fileList) {
  const isJPG = file.type === 'image/jpeg';
  const isJPEG = file.type === 'image/jpeg';
  const isGIF = file.type === 'image/gif';
  const isPNG = file.type === 'image/png';
  if (!(isJPG || isJPEG || isGIF || isPNG)) {
    message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片!');
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('图片大小必须小于1MB!');
    return false
  }
  return (isJPG || isJPEG || isGIF || isPNG) && isLt2M &&  checkImageWH(file, 750);
}


@Form.create({ name: 'validate_add_swiper' })
class SwiperTwoDrawer extends Component {

  state = {
    loading: false,
    imageUrl: '',
    urlKey: 1,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { RollingScreenConfigId, addImagesHandle, handleType, editId, onClose, dispatch, editInfo, img } = this.props;
    const { Images } = editInfo;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { OrderNo, Title, upload, LinkType, FunctionName, LinkUrl } = values;
        const ImageUrl = img ? img : upload[0].response.HttpPath;
        const Name = functionData.filter(_ => _.value === FunctionName)
        const ShowFunctionName = Name && Name.length !== 0 && Name[0].name;
        console.log("排序编号handleType", handleType)
        if(handleType === 1){
          dispatch({
            type: 'pagesinfo/updateDrawerSwiper',
            payload: {
              ...editInfo,
              Images: [
                ...Images,
                {
                  Id: shortid.generate(),
                  RollingScreenConfigId,
                  OrderNo,
                  Title,
                  ImageUrl,
                  LinkType,
                  FunctionType: 1,
                  LinkUrl: LinkUrl || '',
                  FunctionName: FunctionName || '',
                  ShowFunctionName
                }
              ]
            }
          });
          onClose()
        }else {
          const other = Images.filter(_ => _.Id !== editId);
          const Name = functionData.filter(_ => _.value === FunctionName)
          const ShowFunctionName = Name && Name.length !== 0 && Name[0].name;
          const newImages = [
            ...other,
            {
              Id: shortid.generate(),
              RollingScreenConfigId,
              OrderNo,
              Title,
              ImageUrl,
              LinkType,
              FunctionType: 1,
              LinkUrl: LinkUrl || '',
              FunctionName: FunctionName || '',
              ShowFunctionName,
            }
          ]
          const newData =  _.orderBy(newImages, ['OrderNo'], ['asc']);
          dispatch({
            type: 'pagesinfo/updateDrawerSwiper',
            payload: {
              ...editInfo,
              Images: newData
            }
          });
          onClose()
        }
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && pictureTypeaAndSize(e.file) ? e.fileList : [];
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props._addressChangeHandle(info.file.response.HttpPath)
      this.setState({
        loading: false,
      })
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.urlType !== prevState.urlKey){
      return {
        urlKey: nextProps.urlType
      }
    }
    return null
  }

  onRemove = () => {
    this.props._addressChangeHandle(null)
  }

  render() {

    const { Index, system, img, titleText, url, urlType, visible, onClose, width, title, closable, _addressChangeHandle, _urlChangeHandle, editInfo } = this.props;
    const { Images } = editInfo;
    const { imageUrl, urlKey } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{fontSize: 20, color: '#999'}}/>
        <div className="ant-upload-text">上传轮播图片</div>
      </div>
    );

    const orderNum = Images.length !== 0 && (Images[Images.length - 1].OrderNo + 1);
    return (
      <Drawer
        title={title}
        width={width}
        placement="right"
        maskClosable={true}
        destroyOnClose={true}
        closable={closable}
        onClose={onClose}
        visible={visible}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="排序编号">
            {getFieldDecorator('OrderNo', {
              rules: [{ required: true, message: '请输入编号!' }],
              initialValue: Index ? Index : (orderNum || 1) })(<InputNumber disabled={true} min={Index ? Index : (orderNum || 1)} max={10} />)}
          </Form.Item>
          <Form.Item label="滚屏标题" hasFeedback>
            {getFieldDecorator('Title', {
              rules: [{ required: true, message: '请输入滚屏标题' }],
              initialValue: titleText
            })(
              <Input placeholder="请输入滚屏标题" />,
            )}
          </Form.Item>
          <Form.Item label="链接地址">
            {getFieldDecorator('LinkType', {
              rules: [{ required: true, message: '请选择链接地址'}],
              initialValue: urlType
            })(
              <Radio.Group onChange={_urlChangeHandle} >
                <Radio.Button value={1}>无</Radio.Button>
                <Radio.Button value={2}>系统功能</Radio.Button>
                <Radio.Button value={3}>自定义链接</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          {
            urlKey === 2 ? <Form.Item label="系统功能">
              {getFieldDecorator('FunctionName', {
                rules: [{ required: true, message: '请选择系统功能' }],
                initialValue: system || undefined })(
                <Select placeholder="请选择系统功能" >
                  {
                    functionData.map(_ => (
                      <Select.Option key={_.value} value={_.value}>{_.name}</Select.Option>
                    ))
                  }
                </Select>,
              )}
            </Form.Item> : null
          }
          {
            urlKey === 3 ? <Form.Item label="自定义连接">
              {getFieldDecorator('LinkUrl', {
                rules: [{ required: true, message: '请输入自定义链接地址' }],
                initialValue: url })(
                <Input style={{width: 338}} />,
              )}
            </Form.Item> : null
          }

          <Form.Item label="轮播图片" extra="请上传750PX * 360PX，且大小在1M以内的图片支持jpg、jpeg、png、gif格式">
            {getFieldDecorator('upload', {
              rules: [{ required: true, message: '请上传轮播图片!', }],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              initialValue: img ? [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: `${Prefix + img}`,
              }] : [],
            })(
              <Upload
                name="base64str"
                listType="picture-card"
                className={styles['img-uploader']}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true
                }}
                action={uploadUrl}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                onRemove={this.onRemove}
              >
                { img ? null : uploadButton }
              </Upload>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

SwiperTwoDrawer.propTypes = {
  system: PropTypes.number,
  titleText: PropTypes.string,
  urlType: PropTypes.number,
  url: PropTypes.string,
  visible: PropTypes.bool,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number,
  title: PropTypes.string,
}

export default SwiperTwoDrawer;
