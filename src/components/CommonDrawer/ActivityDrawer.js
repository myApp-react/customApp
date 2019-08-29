import React, { Component, PureComponent } from "react";
import styles from './index.css';
import { Button, Popover, Select, Drawer, Form, Row, Col, Input } from 'antd';
import shortid from 'shortid';
import { message } from 'antd';
import isEqual from "react-fast-compare";
const { Option } = Select;

@Form.create()
class ActivityDrawer extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, sourceInfo, editInfo, handleRefresh, onClose } = this.props;
    const { Id, ConfigId, OrderNo } = sourceInfo;
    const { activityId, Image, Name } = editInfo;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const configJson = JSON.stringify({
          Id, ConfigId, OrderNo, activityId, Image, Name
        });
        console.log("打印请求参数", configJson)
        dispatch({
          type: 'pagesinfo/saveActivity',
          payload: { configJson }
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

  handleChange = value => {

    const { editInfo, dispatch, activityData } = this.props;
    const currInfo = activityData.filter(_ => _.Id === value)
    if(currInfo && currInfo.length !== 0){
      dispatch({
        type: 'pagesinfo/updateDrawerActivity',
        payload: {
          Image: currInfo[0].Image,
          Name: currInfo[0].Name,
          activityId: currInfo[0].Id
        }
      })
    }
  }

  shouldComponentUpdate(preProps, preState){
    if(preProps.visible !== this.props.visible ||
      !isEqual(preProps.editInfo, this.props.editInfo) ||
      !isEqual(preProps.activityData, this.props.activityData)
    ){
      return true
    }
    return false
  }

  render() {
    const { visible, onClose, form, activityData, editInfo } = this.props;
    const { getFieldDecorator } = form;

    const { activityId } = editInfo;
    return (
      <Drawer
        title="推荐活动设置"
        width={520}
        placement="right"
        closable={false}
        maskClosable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={visible}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="推荐活动">
                {getFieldDecorator('BaseColor', {
                  rules: [{ required: true, message: '请选择推荐活动' }],
                  initialValue: activityId ? activityId : undefined
                })(
                  <Select
                    onChange={this.handleChange}
                    placeholder="选择推荐活动"
                  >
                    {
                      activityData.map(_ => (
                        <Option key={_.Id} value={_.Id}>{_.Name}</Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
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
export default ActivityDrawer;
