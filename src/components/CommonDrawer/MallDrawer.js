import React, { Component, PureComponent } from "react";
import styles from './MallDrawer.less';
import { Button, Drawer, Form, Col, Row, Input, Select, DatePicker, Icon, Radio, InputNumber } from 'antd';
import { MallList } from '@/components';
import { colorPicker } from '@/utils/config';
import { CirclePicker, CompactPicker } from 'react-color';
import { message } from 'antd';
import isEqual from "react-fast-compare";



@Form.create()
class MallDrawer extends Component {

  showNumChange = value => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, AccordingNum: value }
    })
  }

  showTypeChange = e => {
    console.warn(e)

    const Style = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, Style }
    })
  }

  nameFontSizeChange = value => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, NameSize: value }
    })
  }

  nameColorChange = color => {
    const NameColor = color.hex
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, NameColor }
    })
  }

  pointsFontSizeChange = value => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, PointsSize: value }
    })
  }

  pointsColorChange = color => {
    const PointsColor = color.hex
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, PointsColor }
    })
  }

  btnFontSizeChange = value => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, BtnNameSize: value }
    })
  }

  btnColorChange = color => {
    const BtnNameColor = color.hex
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, BtnNameColor }
    })
  }

  btnBgChange = color => {
    const BtnBackColor = color.hex
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerMall',
      payload: { ...editInfo, BtnBackColor }
    })
  }


  handleSubmit = e => {
    e.preventDefault();
    const { editInfo, sourceInfo, dispatch, onClose, handleRefresh } = this.props;
    const { Id, ConfigId, OrderNo, type, } = sourceInfo;
    const {
      AccordingNum,
      NameSize,
      NameColor,
      BtnNameSize,
      BtnNameColor,
      BtnBackColor,
      PointsSize,
      PointsColor,
      Style,
    } = editInfo;
    this.props.form.validateFields((err, values) => {
      console.warn(values)
      if (!err) {
        console.warn("editInfo", editInfo)
        console.log('Received values of form: ', values);
        const configJson = JSON.stringify({
          Id,
          ConfigId,
          OrderNo,
          type,
          AccordingNum,
          NameSize,
          NameColor,
          BtnNameSize,
          BtnNameColor,
          BtnBackColor,
          PointsSize,
          PointsColor,
          Style,
        })
        console.warn("打印请求参数：", configJson)
        dispatch({
          type: 'pagesinfo/saveMall',
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


  shouldComponentUpdate(preProps, preState){
    if(preProps.visible !== this.props.visible ||
      !isEqual(preProps.editInfo, this.props.editInfo)
    ){
      return true
    }
    return false
  }


  render() {
    const { visible, onClose, form, editInfo, } = this.props;
    const { getFieldDecorator } = form;
    const {
      AccordingNum,
      BtnBackColor,
      BtnNameColor,
      BtnNameSize,
      NameColor,
      NameSize,
      PointsColor,
      PointsSize,
      Style,} = editInfo;

    return (
      <Drawer
        title="积分商城设置"
        width={520}
        placement="right"
        closable={false}
        maskClosable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles['show-main']}>
          <MallList {...editInfo}/>
        </div>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="显示数量">
                {getFieldDecorator('AccordingNum', {
                  rules: [{ required: true, message: '请输入显示数量' }],
                  initialValue: AccordingNum
                })(
                  <InputNumber step={2} min={2} max={10} onChange={this.showNumChange}/>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="显示样式">
                {getFieldDecorator('Style', {
                  rules: [{ required: true, message: '请选择模板背景类型' }],
                  initialValue: Style
                })(
                  <Radio.Group onChange={this.showTypeChange}>
                    <Radio.Button value={1}>并排显示</Radio.Button>
                    <Radio.Button value={2}>单个显示</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="名称大小">
                {getFieldDecorator('NameSize', {
                  rules: [{ required: true, message: '请选择名称大小' }],
                  initialValue: Number(NameSize)
                })(
                  <Select placeholder="请选择名称大小" onChange={this.nameFontSizeChange}>
                    <Select.Option value={14}>14px</Select.Option>
                    <Select.Option value={15}>15px</Select.Option>
                    <Select.Option value={16}>16px</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="名称颜色">
                {getFieldDecorator('NameColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: NameColor
                })(
                  <CompactPicker
                    color={NameColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.nameColorChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="积分文字大小">
                {getFieldDecorator('PointsSize', {
                  rules: [{ required: true, message: '请选择积分文字大小' }],
                  initialValue: PointsSize
                })(
                  <Select placeholder="请选择积分文字大小" onChange={this.pointsFontSizeChange}>
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
              <Form.Item label="积分文字颜色">
                {getFieldDecorator('PointsColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: PointsColor
                })(
                  <CompactPicker
                    color={PointsColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.pointsColorChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24} key={1}>
              <Form.Item label="按钮文字大小">
                {getFieldDecorator('BtnNameSize', {
                  rules: [{ required: true, message: '请选择上边距' }],
                  initialValue: BtnNameSize
                })(
                  <Select placeholder="请选择上边距" onChange={this.btnFontSizeChange}>
                    <Select.Option value={0}>0px</Select.Option>
                    <Select.Option value={6}>6px</Select.Option>
                    <Select.Option value={12}>12px</Select.Option>
                    <Select.Option value={15}>15px</Select.Option>
                    <Select.Option value={20}>20px</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24} key={2}>
              <Form.Item label="按钮文字颜色">
                {getFieldDecorator('BtnNameColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: BtnNameColor
                })(
                  <CompactPicker
                    color={BtnNameColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.btnColorChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24} key={3}>
              <Form.Item label="按钮背景颜色">
                {getFieldDecorator('BtnBackColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: BtnBackColor
                })(
                  <CompactPicker
                    color={BtnBackColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.btnBgChange}
                  />
                )}
              </Form.Item>
            </Col>
            {/*{*/}
              {/*Style === 2 ? [*/}
                {/*<Col span={24} key={1}>*/}
                  {/*<Form.Item label="按钮文字大小">*/}
                    {/*{getFieldDecorator('BtnNameSize', {*/}
                      {/*rules: [{ required: true, message: '请选择上边距' }],*/}
                      {/*initialValue: BtnNameSize*/}
                    {/*})(*/}
                      {/*<Select placeholder="请选择上边距" onChange={this.btnFontSizeChange}>*/}
                        {/*<Select.Option value={0}>0px</Select.Option>*/}
                        {/*<Select.Option value={6}>6px</Select.Option>*/}
                        {/*<Select.Option value={12}>12px</Select.Option>*/}
                        {/*<Select.Option value={15}>15px</Select.Option>*/}
                        {/*<Select.Option value={20}>20px</Select.Option>*/}
                      {/*</Select>*/}
                    {/*)}*/}
                  {/*</Form.Item>*/}
                {/*</Col>,*/}
                {/*<Col span={24} key={2}>*/}
                  {/*<Form.Item label="按钮文字颜色">*/}
                    {/*{getFieldDecorator('BtnNameColor', {*/}
                      {/*rules: [{ required: true, message: 'Please enter user name' }],*/}
                      {/*initialValue: BtnNameColor*/}
                    {/*})(*/}
                      {/*<CompactPicker*/}
                        {/*color={BtnNameColor}*/}
                        {/*colors={colorPicker}*/}
                        {/*className={styles['color-picker']}*/}
                        {/*onChange={this.btnColorChange}*/}
                      {/*/>*/}
                    {/*)}*/}
                    {/*</Form.Item>*/}
                {/*</Col>,*/}
                {/*<Col span={24} key={3}>*/}
                  {/*<Form.Item label="按钮背景颜色">*/}
                    {/*{getFieldDecorator('BtnBackColor', {*/}
                      {/*rules: [{ required: true, message: 'Please enter user name' }],*/}
                      {/*initialValue: BtnBackColor*/}
                    {/*})(*/}
                      {/*<CompactPicker*/}
                        {/*color={BtnBackColor}*/}
                        {/*colors={colorPicker}*/}
                        {/*className={styles['color-picker']}*/}
                        {/*onChange={this.btnBgChange}*/}
                      {/*/>*/}
                    {/*)}*/}
                    {/*</Form.Item>*/}
                {/*</Col>*/}
              {/*] : null*/}
            {/*}*/}
            <Col span={24}>
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
export default MallDrawer;
