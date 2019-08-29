import React, { Component, PureComponent } from "react";
import styles from './TitleDrawer.less';
import { Button, message, Drawer, Form, Col, Row, Select, Radio, Input, Upload, Icon, } from 'antd';
import { TitleBar } from '@/components'
import { CirclePicker, CompactPicker } from 'react-color'
import { pictureTypeaAndSize, checkImageWH } from '@/utils';
import { Prefix, uploadUrl, functionData, colorPicker } from '@/utils/config';

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
  return (isJPG || isJPEG || isGIF || isPNG) && isLt2M &&  checkImageWH(file, 48);
}

function beforeUploadBg(file, fileList) {

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




@Form.create()
class TitleDrawer extends PureComponent {
  state = {
    bgColor: "#ffffff",
    fileList: [],
    bgLoading: false,
    leftLoading: false,
    rightLoading: false,
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && pictureTypeaAndSize(e.file) ? e.fileList : [];
  };

  handleSubmit = e => {
    e.preventDefault();

    const { editInfo, sourceInfo, dispatch, onClose, handleRefresh } = this.props;
    const { Id, ConfigId, OrderNo, type, } = sourceInfo;
    const {
      Fromabove,
      Istemplate,
      BackColor,
      BackImage,
      LeftImage,
      HeadLine,
      HeadLineSize,
      HeadLineColor,
      RightWord,
      RightWordSize,
      RightWordColor,
      RightImage,
      OpenUrl,
      FuncName,
    } = editInfo;
    this.props.form.validateFields((err, values) => {
      console.warn(values)
      const { CustomLink, FuncName } = values
      if (!err) {
        // console.log('Received values of form: ', values);
        const configJson = JSON.stringify({
          Id,
          ConfigId,
          Fromabove,
          Istemplate,
          OrderNo,
          type,
          BackColor,
          BackImage,
          LeftImage,
          HeadLine,
          HeadLineSize,
          HeadLineColor,
          RightWord,
          RightWordSize,
          RightWordColor,
          RightImage,
          OpenUrl,
          CustomLink: CustomLink || '',
          FuncType: 1,
          FuncName: FuncName || ''
        });
        dispatch({
          type: 'pagesinfo/saveTitle',
          payload: { configJson }
        }).then(_ => {
          if(_){
            message.success("保存成功").then(_ => onClose());
            handleRefresh()
          }
        })
      }
    });
  };

  uploadBgImgChange = info => {
    const { dispatch, editInfo } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ bgLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const BackImage = info.file.response.HttpPath;
      dispatch({ type: 'pagesinfo/updateDrawerTitle', payload: { ...editInfo, BackImage } });
      this.setState({ bgLoading: false })
    }
  };

  uploadBgImgRemove = () => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, BackImage: null }
    })
  }

  uploadLeftImgChange = info => {
    const { dispatch, editInfo } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ leftLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const LeftImage = info.file.response.HttpPath;
      dispatch({ type: 'pagesinfo/updateDrawerTitle', payload: { ...editInfo, LeftImage } });
      // this.props._addressChangeHandle(info.file.response.HttpPath)
      this.setState({ leftLoading: false, })
    }
  };

  uploadLeftImgRemove = () => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, LeftImage: null }
    })
  }


  uploadRightImgChange = info => {
    console.warn("上传结果：", info)
    const { dispatch, editInfo } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ rightLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      console.warn("上传结果：", info)
      this.setState({ rightLoading: false, })
      const RightImage = info.file.response.HttpPath;
      dispatch({ type: 'pagesinfo/updateDrawerTitle', payload: { ...editInfo, RightImage } });

    }
  };



  uploadRightImgRemove = () => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, RightImage: null }
    })
  };



  _bgChangeHandle = (e) => {
    const Istemplate = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, Istemplate }
    })
  }

  _marginTopChangeHandle = (value) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, Fromabove: value }
    })
  }

  handleColorChange = (e) => {
    console.log(e.hex)
    const BackColor = e.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, BackColor }
    })
  }

  titleOnChangeHandle = (e) => {
    const HeadLine = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, HeadLine }
    })
  }

  titleFontsizeChange = (value) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, HeadLineSize: value }
    })
  }

  titleColorOnChange = (color) => {
    const HeadLineColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, HeadLineColor }
    })
  }

  rightTitleOnChange = (e) => {
    const RightWord = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, RightWord }
    })
  }

  rightTitleFontSizeOnChange = (value) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, RightWordSize: value }
    })
  }

  rightTitleColorChange = (color) => {
    const RightWordColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, RightWordColor }
    })
  }

  _openUrlChangeHandle = (e) => {
    const OpenUrl = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerTitle',
      payload: { ...editInfo, OpenUrl }
    })
  }



  render() {
    const { bgLoading, leftLoading, rightLoading } = this.state
    const { onClose, visible, form, editInfo } = this.props;
    const { getFieldDecorator } = form;
    const { Fromabove,
      Istemplate,
      BackImage,
      BackColor,
      LeftImage,
      HeadLine,
      HeadLineSize,
      HeadLineColor,
      RightWord,
      RightWordSize,
      RightWordColor,
      RightImage,
      OpenUrl,
      FuncType,
      FuncName,
      CustomLink,
    } = editInfo;


    const uploadingStatu = (status) => {
      return (
        <div>
          <Icon type={status ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传图片</div>
        </div>
      )
    }

    return (
      <Drawer
        title="标题栏设置"
        width={520}
        placement="right"
        closable={false}
        className={styles['tabBar-drawer']}
        maskClosable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={visible}
      >

        <div className={styles['show-main']}>
          <TitleBar {...editInfo}/>
        </div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="上边距">
                {getFieldDecorator('Fromabove', {
                  rules: [{ required: false, message: '请选择上边距' }],
                  initialValue: Fromabove
                })(
                  <Select placeholder="请选择上边距" onChange={this._marginTopChangeHandle}>
                    <Select.Option value={0}>0px</Select.Option>
                    <Select.Option value={6}>6px</Select.Option>
                    <Select.Option value={12}>12px</Select.Option>
                    <Select.Option value={15}>15px</Select.Option>
                    <Select.Option value={20}>20px</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="模板背景类型">
                {getFieldDecorator('Istemplate', {
                  rules: [{ required: true, message: '请选择模板背景类型' }],
                  initialValue: Istemplate
                })(
                  <Radio.Group onChange={this._bgChangeHandle}>
                    <Radio.Button value={1}>颜色</Radio.Button>
                    <Radio.Button value={2}>图片</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {
              Istemplate === 2
                ? <Col span={24}>
                  <Form.Item label="模板背景图片" extra="请上传750PX * 30PX，且大小在1M以内的图片支持jpg、jpeg、png、gif格式，建议使用可拉伸底图">
                    {getFieldDecorator('BackImage', {
                      rules: [{ required: true, message: '请上传图片!', }],
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                      initialValue: BackImage ? [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: `${Prefix + BackImage}`,
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
                        beforeUpload={beforeUploadBg}
                        onChange={this.uploadBgImgChange}
                        onRemove={this.uploadBgImgRemove}
                      >
                        { BackImage ? null : uploadingStatu(bgLoading) }
                      </Upload>
                    )}
                  </Form.Item>
                </Col> :
                <Col span={24}>
                  <Form.Item label="背景颜色">
                    {getFieldDecorator('BackColor', {
                      rules: [{ required: true, message: 'Please enter user name' }],
                      initialValue: BackColor
                    })(
                      <CompactPicker
                        color={BackColor}
                        colors={colorPicker}
                        className={styles['color-picker']}
                        onChange={this.handleColorChange}
                      />
                    )}
                  </Form.Item>
                </Col>
            }
            <Col span={24}>
              <Form.Item label="左侧图标" extra="请上传48PX * 48PX，且大小在1M以内的图片支持jpg、jpeg、png、gif格式，建议使用可拉伸底图">
                {getFieldDecorator('LeftImage', {
                  rules: [{ required: false, message: '请上传图片!', }],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  initialValue: LeftImage ? [{
                    uid: '-3',
                    name: 'xxx.png',
                    status: 'done',
                    url: `${Prefix + LeftImage}`,
                  }] : null,
                })(
                  <Upload
                    name="base64str"
                    listType="picture-card"
                    className={styles['icon-uploader']}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true
                    }}
                    action={uploadUrl}
                    beforeUpload={beforeUpload}
                    onChange={this.uploadLeftImgChange}
                    onRemove={this.uploadLeftImgRemove}
                  >
                    { LeftImage ? null : uploadingStatu(leftLoading) }
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="标题文字">
                {getFieldDecorator('HeadLine', {
                  rules: [{ required: true, message: '请输入标题' }],
                  initialValue: HeadLine
                })(
                  <Input placeholder="标题" maxLength={6} onChange={this.titleOnChangeHandle}/>
                )}
              </Form.Item>
              <Form.Item label="标题文字大小">
                {getFieldDecorator('HeadLineSize', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: HeadLineSize
                })(
                  <Select placeholder="请选择标题文字大小" onChange={this.titleFontsizeChange}>
                    <Select.Option value={12}>12px</Select.Option>
                    <Select.Option value={14}>14px</Select.Option>
                    <Select.Option value={16}>16px</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="标题文字颜色">
                {getFieldDecorator('HeadLineColor', {
                  rules: [{ required: true, message: '请选择标题文字颜色' }],
                  initialValue: HeadLineColor
                })(
                  <CompactPicker
                    color={HeadLineColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.titleColorOnChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="右侧文字">
                {getFieldDecorator('RightWord', {
                  rules: [{ required: true, message: '请输入右侧文字' }],
                  initialValue: RightWord
                })(
                  <Input placeholder="右侧文字" onChange={this.rightTitleOnChange}/>
                )}
              </Form.Item>
              <Form.Item label="右侧文字大小">
                {getFieldDecorator('RightWordSize', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: RightWordSize
                })(
                  <Select placeholder="请选择右侧文字大小" onChange={this.rightTitleFontSizeOnChange}>
                    <Select.Option value={12}>12px</Select.Option>
                    <Select.Option value={14}>14px</Select.Option>
                    <Select.Option value={16}>16px</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="右侧文字颜色">
                {getFieldDecorator('RightWordColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: RightWordColor
                })(
                  <CompactPicker
                    color={RightWordColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.rightTitleColorChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="右侧图标" extra="请上传48PX * 48PX，且大小在1M以内的图片支持jpg、jpeg、png、gif格式，建议使用可拉伸底图">
                {getFieldDecorator('RightImage', {
                  rules: [{ required: false, message: '请上传图片!', }],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  initialValue: RightImage ? [{
                    uid: '-2',
                    name: 'xxx.png',
                    status: 'done',
                    url: `${Prefix + RightImage}`,
                  }] : [],
                })(
                  <Upload
                    name="base64str"
                    listType="picture-card"
                    className={styles['icon-uploader']}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true
                    }}
                    action={uploadUrl}
                    beforeUpload={beforeUpload}
                    onChange={this.uploadRightImgChange}
                    onRemove={this.uploadRightImgRemove}
                  >
                    { RightImage ? null : uploadingStatu(rightLoading) }
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="打开链接">
                {getFieldDecorator('OpenUrl', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: OpenUrl
                })(
                  <Radio.Group onChange={this._openUrlChangeHandle}>
                    <Radio.Button value={0}>无</Radio.Button>
                    <Radio.Button value={1}>系统功能</Radio.Button>
                    <Radio.Button value={2}>自定义链接</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              {
                OpenUrl === 1 ? <Form.Item label="系统功能">
                  {getFieldDecorator('FuncName', {
                    rules: [{ required: true, message: '请选择系统功能' }],
                    initialValue: FuncName || undefined })(
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
                OpenUrl === 2 ? <Form.Item label="自定义连接">
                  {getFieldDecorator('CustomLink', {
                    rules: [{ required: true, message: '请输入自定义链接地址' }],
                    initialValue: CustomLink })(
                    <Input style={{width: 338}} />,
                  )}
                </Form.Item> : null
              }
              <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Drawer>
    );
  }
}
export default TitleDrawer;
