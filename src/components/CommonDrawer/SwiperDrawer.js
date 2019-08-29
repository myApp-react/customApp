import React, { Component, PureComponent } from "react";
import styles from './SwiperDrawer.less';
import { Button, Switch, Drawer, Form, Col, Row, Avatar, Select, Popconfirm, Alert, Table, Divider, message } from 'antd';
import { Carousel } from '@/components';
import SwiperTwoDrawer from '../ChildrenDrawer/swiperTwoDrawer';
import { pathMatchRegexp } from '@/utils';
import { Prefix } from '@/utils/config';
import withRouter from 'umi/withRouter'
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
@withRouter
class SwiperDrawer extends Component {
  state = {
    childrenDrawer: false,
    currentInfo: initState,
    handleType: 1,
    editId: ''
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
      type: 'pagesinfo/updateDrawerSwiper',
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

  _editChildrenDrawe = (record, e) => {
    const { LinkType, Title, OrderNo, FunctionType, FunctionName, LinkUrl, ImageUrl } = record;
    this.setState((pre) => ({
      childrenDrawer: !pre.childrenDrawer,
      handleType: 2,
      editId: record.Id,
      currentInfo: {
        titleText: Title,
        Index: OrderNo,
        urlType: LinkType,
        system: FunctionName,
        url: LinkUrl,
        img: ImageUrl
      }
    }))
  }

  _removeChildrenDrawe = (record, e) => {
    const { dispatch, editInfo } = this.props;
    const { Images } = editInfo
    const newImg = Images.filter( _ => _.Id !== record.Id)
    dispatch({
      type: 'pagesinfo/updateDrawerSwiper',
      payload: { ...editInfo, Images: newImg }
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

  _switchOnchange = (_) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerSwiper',
      payload: { ...editInfo, IsFloat: _ ? 1 : 0 }
    })
  }

  _selectRollingTimes = (value) => {
    const { dispatch, editInfo } = this.props;
    dispatch({
      type: 'pagesinfo/updateDrawerSwiper',
      payload: { ...editInfo, RollingTime: value }
    })
  }

  addImagesHandle = (Images) => {
    this.setState((pre) => ({ Images: pre.Images.concat(Images) }))
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onClose, dispatch, handleRefresh, form, sourceInfo, editInfo } = this.props;
    const { IsFloat, RollingTime, Images, } = editInfo;
    const { ConfiId, Id, OrderNo } = sourceInfo;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        dispatch({
          type: 'pagesinfo/saveCarousel',
          payload: {
            configJson: JSON.stringify({
              Id,
              ConfiId,
              IsFloat,
              OrderNo,
              RollingTime,
              Images
            })
          }
        }).then(_ => {
          message.success("保存成功").then(_ => {
            onClose()
          });
          handleRefresh()
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
    const { visible, onClose, form, sourceInfo, editInfo, dispatch, loading } = this.props;
    const { getFieldDecorator } = form;
    const { Id } = sourceInfo;
    const { IsFloat, RollingTime, Images, } = editInfo;
    const { currentInfo, handleType, editId } = this.state;



    const twoDrawerProps = {
      ...currentInfo,
      dispatch,
      Images,
      handleType,
      editId,
      editInfo,
      RollingScreenConfigId: Id,
      _addressChangeHandle: this._addressChangeHandle,
      _urlChangeHandle: this._urlChangeHandle,
      addImagesHandle: this.addImagesHandle,
    }

    const columns = [
      {
        title: '序号',
        dataIndex: 'OrderNo',
        key: 'OrderNo',
        width: 60,
      },
      {
        title: '缩略图',
        dataIndex: 'ImageUrl',
        key: 'ImageUrl',
        render: e => <Avatar src={`${Prefix + e}`} />
      },
      {
        title: '滚动标题',
        dataIndex: 'Title',
        key: 'Title',
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

    return (
      <Drawer
        title="滚屏广告设置"
        width={700}
        placement="right"
        maskClosable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles['show-main']}>
          <Carousel {...editInfo}/>
        </div>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="开启浮动">
                {getFieldDecorator('isFloat', {
                  valuePropName: 'checked',
                  initialValue: IsFloat !== 0
                })(<Switch checkedChildren="开" unCheckedChildren="关" onChange={this._switchOnchange}/>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="停留时长">
                {getFieldDecorator('name', {
                  initialValue: RollingTime
                })(
                  <Select placeholder="请选择停留时长" style={{width: 196}} onChange={this._selectRollingTimes}>
                    <Select.Option value={1000}>1000ms</Select.Option>
                    <Select.Option value={2000}>2000ms</Select.Option>
                    <Select.Option value={3000}>3000ms</Select.Option>
                    <Select.Option value={5000}>5000ms</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" icon='plus' onClick={this.showChildrenDrawer}>新增</Button>
        <div className={styles['hold-block']}/>
        <Alert message="移动行可调整显示顺序" type="info" showIcon />
        <SwiperTwoDrawer
          title="新增滚屏广告"
          width={500}
          closable={true}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.childrenDrawer}
          {...twoDrawerProps}
        />
        <div className={styles['hold-block']}/>
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
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={onClose}
          >取消</Button>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            loading={loading.effects['pagesinfo/saveCarousel']}
          >
            {loading.effects['pagesinfo/saveCarousel'] ? '保存中' : '保存'}
            </Button>
        </div>
      </Drawer>
    );
  }
}

export default SwiperDrawer;
