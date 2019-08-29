import React, { Component, PureComponent } from "react";
import styles from './BrandDrawer.less';
import { Button, Popover, Drawer, Switch, Form, Col, Row, Avatar, Select, Radio, Popconfirm, Icon, Table, Divider, } from 'antd';
import { Brand } from '@/components';
import { CirclePicker, CompactPicker } from 'react-color'
import PropTypes from 'prop-types'
import { fliterData } from '@/utils'
import { Prefix } from '@/utils/config'
import { bgPicker, colorPicker } from '@/utils/config'
import { message } from 'antd';
import isEqual from "react-fast-compare";

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};



@Form.create()
class BrandDrawer extends Component {

  state = {
    visible: false,
    bgColor: "#ffffff",
    fontColor: "#000000",
    IconNum: 4,
    isScroll: false
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  _IconChangeHandle = (e) => {
    const IsIcon = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerBrand',
      payload: { ...editInfo, IsIcon }
    })
  }

  _bgColorChangeComplete = (color) => {

    const BackColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerBrand',
      payload: { ...editInfo, BackColor }
    })

  };

  _LogoColorChangeComplete = (color) => {
    console.log(color)
    const LogoColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerBrand',
      payload: { ...editInfo, LogoColor }
    })

  };

  handleSubmit = e => {
    e.preventDefault();
    const { onClose, dispatch, handleRefresh, form, sourceInfo, editInfo } = this.props;
    const { IsIcon, LogoColor, BackColor, ShopPro } = editInfo;
    const { ConfigId, Id, OrderNo, type } = sourceInfo;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', sourceInfo);
        const modelJson = JSON.stringify({
          Id,
          ConfigId,
          IsIcon,
          BackColor,
          type,
          ShopPro,
          OrderNo,
          LogoColor,
        })
        console.log("打印发送参数：", modelJson);
        // console.log("打印发送参数ShopPro：", ShopPro);
        dispatch({
          type: 'pagesinfo/saveBrand',
          payload: {
            modelJson
          }
        }).then(_ => {
          if(_){
            message.success("保存成功").then(_ => {
              onClose()
            })
            handleRefresh()
          }
        })
      }
    });
  };

  storeOnchange = (value) => {
    const { dispatch, editInfo, sourceInfo, ShopBrand } = this.props;
    const { Id } = sourceInfo;
    // const ShopPro = ShopBrand.filter(_ => _.ShopPromotionId === value)
    let ShopPro = []
    value.forEach(_ => {
      ShopBrand.forEach((el) => {
        if(el.StoreName !== _) return
        ShopPro.push({
          ...el,
          brandconfigId: Id
        })
      })
    })

    // value.forEach(_ => {
    //   ShopBrand.forEach((el) => {
    //     if(el.ShopPromotionId !== _) return
    //     ShopPro.push({
    //       ...el,
    //       brandconfigId: Id
    //     })
    //   })
    // })

    dispatch({
      type: 'pagesinfo/updateDrawerBrand',
      payload: { ...editInfo, ShopPro }
    })

  }

  shouldComponentUpdate(preProps, preState){
    if(preProps.visible !== this.props.visible ||
      !isEqual(preProps.editInfo, this.props.editInfo) ||
      !isEqual(preProps.ShopBrand, this.props.ShopBrand)

    ){
      return true
    }
    return false
  }

  render() {
    const { onClose, visible, form, sourceInfo, editInfo, ShopBrand } = this.props;
    const { getFieldDecorator } = form;
    const { IsIcon, LogoColor, BackColor, ShopPro } = editInfo;

    let ShopProInit = [];
    ShopPro.forEach(_ => {
      ShopProInit.push(_.StoreName)
    })

    return (
      <Drawer
        title="品牌导航设置"
        width={520}
        placement="right"
        className={styles['tabBar-drawer']}
        closable={false}
        destroyOnClose={true}
        maskClosable={true}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles['show-main']}>
          <Brand {...editInfo}/>
        </div>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="样式选择">
                {getFieldDecorator('IsIcon', {
                  rules: [{ required: true, message: '样式选择' }],
                  initialValue: IsIcon
                })(
                  <Radio.Group onChange={this._IconChangeHandle}>
                    <Radio style={radioStyle} value={0}>LOGO列表显示</Radio>
                    <Radio style={radioStyle} value={1}>LOGO滚动显示</Radio>
                    <Radio style={radioStyle} value={2}>LOGO文字滚动显示1</Radio>
                    <Radio style={radioStyle} value={3}>LOGO文字滚动显示2</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            {
              IsIcon !== 0 && IsIcon !== 1 ?
                <Col span={24}>
                  <Form.Item label="LOGO底色设置">
                    {getFieldDecorator('LogoColor', {
                      rules: [{ required: true, message: '请选择LOGO底色' }],
                      initialValue: LogoColor || "#ffffff"
                    })(
                      <CompactPicker
                        color={LogoColor || "#ffffff"}
                        colors={bgPicker}
                        className={styles['color-picker']}
                        onChange={this._LogoColorChangeComplete}
                      />
                    )}
                  </Form.Item>
                </Col> : null
            }
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="背景色设置">
                {getFieldDecorator('BackColor', {
                  rules: [{ required: true, message: '请选择背景色' }],
                  initialValue: BackColor || "#ffffff"
                })(
                  <CompactPicker
                    color={BackColor || "#ffffff"}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this._bgColorChangeComplete}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="推荐品牌设置">
                {getFieldDecorator('ShopPro', {
                  rules: [{ required: true, message: '推荐品牌设置' }],
                  initialValue: ShopProInit
                })(
                  <Select
                    mode="multiple"
                    placeholder="推荐品牌设置"
                    onChange={this.storeOnchange}
                    optionLabelProp="label"
                  >
                    {//_.ShopPromotionId
                      ShopBrand.map(_ => (
                        <Select.Option
                          key={_.ShopPromotionId}
                          label={_.StoreName}
                          value={_.StoreName}
                        >
                          <div className={styles.select}>
                            <Avatar size={24} src={Prefix + _.LogoUrl} />
                            <span className={styles.name}>{_.StoreName}</span>
                          </div>
                        </Select.Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={onClose}
          >取消</Button>
          <Button onClick={this.handleSubmit} type="primary">保存</Button>
        </div>
      </Drawer>
    );
  }
}

BrandDrawer.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  ShopBrand: PropTypes.array,
}
export default BrandDrawer;
