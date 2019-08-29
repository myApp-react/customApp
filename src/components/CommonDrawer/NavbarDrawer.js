import React, { Component, PureComponent } from "react";
import styles from './NavbarDrawer.less';
import { Button, Drawer, Form, Col, Row, Avatar, Select, Table, Icon, Divider, Popconfirm } from 'antd';
import { TabBar } from '@/components'
const { Option } = Select;
import NavBarTwoDrawer from '../ChildrenDrawer/navBarTwoDrawer'
import reactCSS from 'reactcss'
import { CirclePicker, CompactPicker, } from 'react-color'
import { colorPicker, bgPicker, Prefix  } from '@/utils/config'
import { message, Alert } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
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
  OrderNo: null,
  btnName: "",
  nomalIcon: "",
  selectIcon: "",
  LinkType: 0,
  LinkUrl: "",
  FunctionName: 2,
}

@Form.create()
class NavbarDrawer extends Component {
  state = {
    color: "#ffffff",
    childrenDrawer: false,
    handleType: 1,
    editId: '',
    currentInfo: initState
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { editInfo, dispatch } = this.props;
    const { Images } = editInfo;
    const dragRow = Images[dragIndex];
    const targetRow = Images[hoverIndex];

    const newEdit = update(editInfo, {
      Images: {
        $splice: [
          [dragIndex, 1, {...targetRow, OrderNo: dragIndex + 1}],
          [hoverIndex, 1, {...dragRow, OrderNo: hoverIndex + 1}]
        ],
      },
    })
    dispatch({
      type: 'pagesinfo/updateDrawerNavbar',
      payload: { ...newEdit }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, sourceInfo, editInfo, onClose, handleRefresh } = this.props;
    const { Id, ConfiId, OrderNo,  } = sourceInfo;
    const { BaseColor, FontColor, SelectColor, Images  } = editInfo;

    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        console.log('Received values of form: ', values);

        const configJson = JSON.stringify({
          Id,
          ConfiId,
          OrderNo,
          BaseColor,
          FontColor,
          SelectColor,
          Images,
        })
        console.warn("打印请求参数：", configJson)
        dispatch({
          type: 'pagesinfo/saveNavbar',
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

  colorHandleChange = (color) => {
    const FontColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerNavbar',
      payload: { ...editInfo, FontColor }
    })
  };

  bgColorHandleChange = color => {
    const BaseColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerNavbar',
      payload: { ...editInfo, BaseColor }
    })
  }

  selectColorHandleChange = color => {
    const SelectColor = color.hex;
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerNavbar',
      payload: { ...editInfo, SelectColor }
    })
  }



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

  _urlChangeHandle = (e) => {
    const LinkType = e.target.value;
    const { currentInfo } = this.state
    this.setState({ currentInfo: { ...currentInfo, LinkType } })
  }

  _noSelectedIconHnadle = nomalIcon => {
    const { currentInfo } = this.state
    this.setState({
      currentInfo: {...currentInfo, nomalIcon},
    });
  }

  _SelectedIconHnadle = selectIcon => {
    const { currentInfo } = this.state
    this.setState({
      currentInfo: {...currentInfo, selectIcon},
    });
  }

  _editChildrenDrawe = (record, e) => {
    const { Id, ImageUrl, LinkType, LinkUrl, OrderNo, SelectImageUrl, btnName, FunctionName } = record
    this.setState((pre) => ({
      childrenDrawer: !pre.childrenDrawer,
      handleType: 2,
      editId: Id,
      currentInfo: {
        OrderNo,
        btnName,
        nomalIcon: ImageUrl,
        selectIcon: SelectImageUrl,
        LinkType,
        LinkUrl,
        FunctionName,
      }
    }))
  }

  _removeChildrenDrawe = (record, e) => {
    const { dispatch, editInfo } = this.props;
    const { Images } = editInfo
    const newImg = Images.filter( _ => _.Id !== record.Id)
    dispatch({
      type: 'pagesinfo/updateDrawerNavbar',
      payload: { ...editInfo, Images: newImg }
    })
  }

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
    const { visible, onClose, form, dispatch, sourceInfo, editInfo } = this.props;
    const { getFieldDecorator } = form;
    const { Id } = sourceInfo;
    const { Images, SelectColor, BaseColor, FontColor } = editInfo;
    const { childrenDrawer, currentInfo, handleType, editId } = this.state;

    const twoDrawerProps = {
      ...currentInfo,
      handleType,
      dispatch,
      editInfo,
      editId,
      menuId: Id,
      visible: childrenDrawer,
      onClose: this.onChildrenDrawerClose,
      _urlChangeHandle: this._urlChangeHandle,
      _noSelectedIconHnadle: this._noSelectedIconHnadle,
      _SelectedIconHnadle: this._SelectedIconHnadle,
    }

    const columns = [
      {
        title: '序号',
        dataIndex: 'OrderNo',
        key: 'OrderNo',
        width: 60,
      },
      {
        title: '未选中图标',
        dataIndex: 'ImageUrl',
        key: 'ImageUrl',
        render: e => <Avatar src={`${Prefix + e}`} />
      },
      {
        title: '选中图标',
        dataIndex: 'SelectImageUrl',
        key: 'SelectImageUrl',
        render: e => <Avatar src={`${Prefix + e}`} />
      },
      {
        title: '按钮名称',
        dataIndex: 'btnName',
        key: 'btnName',
        render: title => <span>{title}</span>,
      },
      {
        title: '打开链接',
        key: 'LinkType',
        dataIndex: 'LinkType',
        render: (text, record) => {
          if(text === 0){
            return "无"
          }else if(text === 1){
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

    const btnDisabled = Images.length === 5;

    return (
      <Drawer
        title="底部菜单设置"
        width={700}
        placement="right"
        closable={false}
        className={styles['tabBar-drawer']}
        maskClosable={true}
        onClose={onClose}
        visible={visible}
      >
        <TabBar {...editInfo}/>
        <div className={styles['hold-block']} />
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="背景色设置">
                {getFieldDecorator('BaseColor', {
                  rules: [{ required: false, message: 'Please enter user name' }],
                  initialValue: BaseColor
                })(
                  <CompactPicker
                    color={BaseColor}
                    colors={bgPicker}
                    className={styles['color-picker']}
                    onChange={this.bgColorHandleChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="选中字体颜色">
                {getFieldDecorator('SelectColor', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                  initialValue: SelectColor || "#1890FF"
                })(
                  <CompactPicker
                    color={SelectColor || "#1890FF"}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.selectColorHandleChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="未选中字体颜色">
                {getFieldDecorator('FontColor', {
                  rules: [{ required: true, message: 'Please select an owner' }],
                  initialValue: FontColor
                })(
                  <CompactPicker
                    color={FontColor}
                    colors={colorPicker}
                    className={styles['color-picker']}
                    onChange={this.colorHandleChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" icon='plus' disabled={btnDisabled}  onClick={this.showChildrenDrawer}>新增</Button>
        <div className={styles['hold-block']}/>
        <Alert message="移动行可调整显示顺序" type="info" showIcon />
        <NavBarTwoDrawer
          title="新增底部菜单"
          width={500}
          closable={true}
          {...twoDrawerProps}
        />
        <div className={styles['hold-block']} />
        {/*<Table*/}
          {/*columns={columns}*/}
          {/*dataSource={Images}*/}
          {/*rowKey={record => record.Id}*/}
          {/*pagination={false}*/}
        {/*/>*/}
        <DndProvider backend={HTML5Backend}>
          <Table
            columns={columns}
            dataSource={Images}
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
        <div className={styles['hold-block']} />
        <div className={styles['hold-block']} />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'center',
            background: '#fff',
            borderRadius: '0 0 4px 4px',
            zIndex: 999
          }}
        >
          <Button
            style={{ marginRight: 8, }}
            onClick={onClose}
            htmlType="submit"
          >取消</Button>
          <Button htmlType="submit" onClick={this.handleSubmit} type="primary">保存</Button>
        </div>
      </Drawer>
    );
  }
}
export default NavbarDrawer;
