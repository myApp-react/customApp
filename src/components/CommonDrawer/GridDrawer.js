import React, { Component, PureComponent } from "react";
import styles from './GridDrawer.less';
import { Button, Alert, Drawer, Form, Col, Row, Avatar, Select, Radio, Popconfirm, Popover, Icon, Table, Divider, } from 'antd';
import { Grid } from '@/components';
import SwiperTwoDrawer from '../ChildrenDrawer/gridTwoDrawer';
import { CirclePicker, CompactPicker } from 'react-color';
import { message } from 'antd';
import { colorPicker, bgPicker, Prefix } from '@/utils/config';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import isEqual from "react-fast-compare";
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let dragingIndex = -1;


class BodyRow extends Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);


const initState = {
  Index: 0,
  titleText: '',
  urlType: 1,
  system: 2,
  url: '',
  img: '',
}

@Form.create()
class GridDrawer extends Component {

  state = {
    childrenDrawer: false,
    currentInfo: initState,
    handleType: 1,
    bgColor: "#ffffff",
    fontColor: "#000000",
    IconNum: 4,
    isScroll: false
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { editInfo, dispatch } = this.props;
    const { Buttons } = editInfo;
    const dragRow = Buttons[dragIndex];
    const targetRow = Buttons[hoverIndex];

    const newEdit = update(editInfo, {
      Buttons: {
        $splice: [
          [dragIndex, 1, {...targetRow, OrderNo: dragIndex + 1}],
          [hoverIndex, 1, {...dragRow, OrderNo: hoverIndex + 1}]
        ],
      },
    })
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...newEdit }
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
      currentInfo: initState,
      handleType: 1
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  _bgColorChangeComplete = (color) => {
    const BackgroundColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, BackgroundColor }
    })

  };

  _fontColorChangeComplete = (color) => {
    const FontColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, FontColor }
    })
  };

  _IconChangeHandle = (e) => {
    const StyleType = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, StyleType }
    })
  }

  _IconShowTypeChange = (e) => {
    const RowShowType = e.target.value;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, RowShowType }
    })
  }

  _fontSizeChange = (value) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, FontSize: value }
    })
  }

  _addressChangeHandle = (img) => {
    this.setState((pre) => ({
      currentInfo: { ...pre.currentInfo, img }
    }))
  }

  _urlChangeHandle = (e) => {
    const urlType = e.target.value;
    this.setState((pre) => ({
      currentInfo: { ...pre.currentInfo, urlType }
    }))
  }

  _editChildrenDrawe = (record, e) => {
    // console.warn(record)
    const { LinkType, Name, OrderNo, FunctionType, FunctionName, LinkUrl, ImageUrl } = record
    this.setState((pre) => ({
      childrenDrawer: !pre.childrenDrawer,
      handleType: 2,
      editId: record.Id,
      currentInfo: {
        titleText: Name,
        Index: OrderNo,
        urlType: LinkType,
        system: FunctionName,
        url: LinkUrl,
        img: ImageUrl
      }
    }))
  }

  _removeChildrenDrawe = (record, e) => {
    // console.warn(record)
    const { dispatch, editInfo } = this.props;
    const { Buttons } = editInfo
    const newButtons = Buttons.filter( _ => _.Id !== record.Id)

    dispatch({
      type: 'pagesinfo/updateDrawerGrid',
      payload: { ...editInfo, Buttons: newButtons }
    })

  }

  handleSubmit = e => {
    e.preventDefault();
    const { onClose, dispatch, handleRefresh, form, sourceInfo, editInfo } = this.props;
    const { StyleType, RowShowType, Buttons, FontSize, BackgroundColor, FontColor } = editInfo;
    const { ConfiId, Id, OrderNo, type } = sourceInfo;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // console.log("打印发送参数：", {
        //   Id,
        //   ConfiId,
        //   StyleType,
        //   FontSize,
        //   type,
        //   BackgroundColor,
        //   OrderNo,
        //   RowShowType,
        //   Buttons
        // })
        dispatch({
          type: 'pagesinfo/saveGrid',
          payload: {
            modelJson : JSON.stringify({
              Id,
              ConfiId,
              StyleType,
              FontSize,
              FontColor,
              type,
              BackgroundColor,
              OrderNo,
              RowShowType,
              Buttons
            })
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

  shouldComponentUpdate(preProps, preState){
    if(preProps.visible !== this.props.visible ||
      !isEqual(preProps.editInfo, this.props.editInfo) ||
      !isEqual(preState.currentInfo, this.state.currentInfo) ||
      preState.childrenDrawer !== this.state.childrenDrawer

    ){
      return true
    }
    return false
  }

  render() {

    const { fontColor, editId, currentInfo, handleType } = this.state;
    const { onClose, visible, form, sourceInfo, editInfo, dispatch } = this.props;
    const { getFieldDecorator } = form;
    const { Id } = sourceInfo;
    const { StyleType, RowShowType, BackgroundColor, FontSize, Buttons, FontColor } = editInfo;

    const columns = [
      {
        title: '序号',
        dataIndex: 'OrderNo',
        key: 'OrderNo',
        width: 60,
      },
      {
        title: '图标',
        dataIndex: 'ImageUrl',
        key: 'ImageUrl',
        render: e => <Avatar src={`${Prefix + e}`} />
      },
      {
        title: '按钮名称',
        dataIndex: 'Name',
        key: 'Name',
        render: title => <span>{title}</span>,
      },
      {
        title: '打开链接',
        key: 'LinkType',
        dataIndex: 'LinkType',
        render: (text, record) => {
          if(text === 1){
            return "无"
          }else if(text === 2){
            return <Ellipsis length={10} tooltip>{record.ShowFunctionName}</Ellipsis>
          }else {
            return <Ellipsis length={10} tooltip>{record.LinkUrl}</Ellipsis>
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 120,
        render: (text, record) => {
          return (
            <span>
            <a
              href="javascript:void(0)"
              onClick={e => this._editChildrenDrawe(record, e)}
            >编辑</a>
            <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title="确认删除该条数据?"
                onConfirm={e => this._removeChildrenDrawe(record, e)}
                okText="确定"
                cancelText="取消"
              >
              <a href="javascript:void(0)">删除</a>
            </Popconfirm>
          </span>
          )
        },
      },
    ];

    const twoDrawerProps = {
      ...currentInfo,
      dispatch,
      handleType,
      editInfo,
      ModelId: Id,
      editId,
      _addressChangeHandle: this._addressChangeHandle,
      _urlChangeHandle: this._urlChangeHandle,
    }

    return (
      <Drawer
        title="功能模块设置"
        width={700}
        placement="right"
        className={styles['tabBar-drawer']}
        closable={false}
        maskClosable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles['show-main']}>
          <Grid {...editInfo} />
        </div>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="样式选择（每行）">
                {getFieldDecorator('StyleType', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: StyleType
                })(
                  <Radio.Group onChange={this._IconChangeHandle}>
                    <Radio.Button value={5}>5个图标</Radio.Button>
                    <Radio.Button value={4}>4个图标</Radio.Button>
                    <Radio.Button value={3}>3个图标</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="超出显示模式">
                {getFieldDecorator('RowShowType', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: RowShowType
                })(
                  <Radio.Group onChange={this._IconShowTypeChange}>
                    <Radio.Button value={0}>分行显示</Radio.Button>
                    <Radio.Button value={1}>滚动显示</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="底色设置">
                {getFieldDecorator('BackgroundColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: BackgroundColor
                })(
                  <CompactPicker
                    color={BackgroundColor}
                    colors={bgPicker}
                    className={styles['color-picker']}
                    onChange={this._bgColorChangeComplete}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="字体设置">
                {getFieldDecorator('FontSize', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: FontSize
                })(
                  <Select placeholder="请选择字体大小" onChange={this._fontSizeChange}>
                    <Select.Option value={12}>12px</Select.Option>
                    <Select.Option value={13}>13px</Select.Option>
                    <Select.Option value={14}>14px</Select.Option>
                    <Select.Option value={15}>15px</Select.Option>
                    <Select.Option value={16}>16px</Select.Option>
                    <Select.Option value={18}>18px</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="字体颜色设置">
                {getFieldDecorator('FontColor', {
                  rules: [{ required: false, message: 'Please enter user name' }],
                  initialValue: FontColor || "#000"
                })(
                  <CompactPicker
                    color={FontColor || "#000"}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this._fontColorChangeComplete}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" icon="plus" onClick={this.showChildrenDrawer}>新增图标</Button>
        <div className={styles['hold-block']}/>
        <Alert message="移动行可调整显示顺序" type="info" showIcon />
        <SwiperTwoDrawer
          title="新增按钮功能"
          width={500}
          closable={true}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.childrenDrawer}
          {...twoDrawerProps}
        />
        <div className={styles['hold-block']}/>
        {/*<Table*/}
          {/*columns={columns}*/}
          {/*dataSource={Buttons}*/}
          {/*rowKey={record => record.Id}*/}
          {/*pagination={false}*/}
        {/*/>*/}
        <DndProvider backend={HTML5Backend}>
          <Table
            columns={columns}
            dataSource={Buttons}
            components={this.components}
            rowClassName="drag-table"
            className={styles['drag-table']}
            pagination={false}
            rowKey={record => record.Id}
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow,
            })}
          />
        </DndProvider>
        <div className={styles['hold-block']}/>
        <div className={styles['hold-block']}/>
        <div className={styles['hold-block']}/>
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
            zIndex: 999
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


export default GridDrawer;
