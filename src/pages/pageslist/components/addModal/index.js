import React, { PureComponent, Component, Fragment } from 'react'
import { Modal, Form, Input, Tabs, Row, Col, Spin, Empty, Icon } from 'antd';
import styles from "./index.less";


@Form.create()
class AddModal extends PureComponent {

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, handleRefresh, editInfo, handleCancel } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(editInfo && editInfo.ConfigName && editInfo.Id){
          dispatch({
            type: 'pageslist/editName',
            payload: { configId: editInfo.Id, configname: values.ConfigName },
          }).then(e => {
            if(e) {
              handleRefresh();
              handleCancel();
            }
          })
        }else {
          dispatch({
            type: 'pageslist/addNewPage',
            payload: { ConfigId: '', ConfigName: values.ConfigName
            }
          }).then(_ => {
            handleRefresh()
            handleCancel();
          })
        }
      }
    });
  };

  render() {
    const { title, visible, handleCancel, confirmLoading, form, editInfo } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <Modal
          title={title}
          width={400}
          destroyOnClose={true}
          visible={visible}
          onOk={this.handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          style={{
            minWidth: 400
          }}
        >
          <Form layout="inline" className={styles.form} onSubmit={this.handleSubmit} hideRequiredMark >
            <Form.Item label="配置名称">
              {getFieldDecorator('ConfigName', {
                rules: [{ required: true, message: '请输入配置名称' }],
                initialValue: editInfo && editInfo.ConfigName
              })(<Input placeholder="请输入配置名称" allowClear style={{ minWidth: 286}}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}


export default AddModal;
