import React, { PureComponent, Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';
import moment from 'moment';
import { Table, Modal, Avatar, Divider, Popover, Tooltip, Icon, Popconfirm, Badge, Tag, } from 'antd'
import Link from 'umi/link';
const { confirm } = Modal;
import EditModal from './addModal'
const QRCode = require('qrcode.react');
import styles from './List.less'
import isEqual from "react-fast-compare";
const confirmProps = {
  mask: false,
  maskClosable: true,
  width: 320,
}

class List extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    editInfo: {
      ConfigName: '',
      Id: ''
    }
  }
  _copyHandle = (record, e) => {
    const { onCopyItem } = this.props
    onCopyItem(record.Id)
  }

  _releaseHandle = (record, e) => {
    const { onReleaseItem } = this.props
    onReleaseItem(record.Id)
  }

  _removeHandle = (record, e) => {
    const { onDeleteItem } = this.props;
    onDeleteItem(record.Id)
  }

  handleCancel = () => {
    this.setState((pre) => ({
      visible: !pre.visible
    }))
  };

  fetchStart = () => {
    this.setState((pre) => ({
      confirmLoading: !pre.confirmLoading
    }))
  }

  fetchEnd = () => {
    this.setState((pre) => ({
      visible: !pre.visible,
      confirmLoading: !pre.confirmLoading,
    }))


  }

  shouldComponentUpdate(preProps, preState) {
    return !isEqual(preProps.dataSource, this.props.dataSource) ||
           !isEqual(preProps.pagination, this.props.pagination) ||
            preProps.loading !== this.props.loading ||
            preProps.confirmLoading !== this.props.confirmLoading ||
            preProps.currentItemId !== this.props.currentItemId ||
            preState.visible !== this.state.visible
  }

  editNameHandle = (record, e) => {
    // const ConfigName = e.target.getAttribute("data-name");
    // const Id = e.target.getAttribute("data-id");
    const { ConfigName, Id } = record
    this.setState((pre) => ({
      visible: true,
      editInfo: { ConfigName, Id }
    }))
  }

  render() {
    const { visible, editInfo } = this.state;
    const { currentItemId, dispatch, handleRefresh, confirmLoading, ...tableProps } = this.props;
    console.log("预览地址：", previewUrl)
    const showCode = (
      <div>
        <QRCode size={145} value={previewUrl} />
      </div>
    )

    const columns = [
      {
        title: '配置名称',
        dataIndex: 'ConfigName',
        key: 'ConfigName',
        render: (name, record) => {//PublishStatus
          return <Fragment>
            <Tooltip title="点击进入详情编辑" placement="right">
              <Link to={`/pageslist/details/${record.Id}`}>{name}</Link>
            </Tooltip>
          </Fragment>
        }
      },
      {
        title: '创建人',
        dataIndex: 'CreatorName',
        key: 'CreatorName',
        render: _ => _ || '-'
      },
      {
        title: '创建时间',
        dataIndex: 'ShowAddTime',
        key: 'ShowAddTime',
        render: _ => moment(new Date(_)).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '状态',
        key: 'ShowPublishStatus',
        dataIndex: 'ShowPublishStatus',
        render: (text, record) => record.PublishStatus === 0 ?
          <Badge status="error" text={text} /> :
          <Badge status="success" text={text}/>
      },
      {
        title: '操作',
        key: 'action',
        width: 220,
        render: (text, record) => {
          return (
            <div>
              <a onClick={e => this.editNameHandle(record, e)}>编辑名称</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title={`是否复制该条？`}
                okText="确定"
                cancelText="取消"
                onConfirm={e => this._copyHandle(record, e)}
              >
                <a>复制</a>
              </Popconfirm>
              {/*{ record.PublishStatus === 1 ? null : <Divider type="vertical" /> }*/}
              <Divider type="vertical" />
              {
                record.PublishStatus === 1 ?
                  null : <Popconfirm
                    placement="topRight"
                    title={`是否发布该条配置？`}
                    okText="确定"
                    cancelText="取消"
                    onConfirm={e => this._releaseHandle(record, e)}
                  >
                    <a>发布</a>
                  </Popconfirm>
              }
              {
                record.PublishStatus === 1 ?
                  <Popover placement="right" content={showCode} title="扫描预览">
                    <a style={{color: '#52C41A'}}>预览</a>
                  </Popover> : null
              }
              <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title={`是否删除该条配置？`}
                okText="确定"
                cancelText="取消"
                onConfirm={e => this._removeHandle(record, e)}
              >
                <a>删除</a>
              </Popconfirm>
          </div>
          )
        },
      },
    ];

    const editProps = {
      title: '编辑配置名称',
      visible,
      dispatch,
      confirmLoading,
      handleCancel: this.handleCancel,
      fetchStart: this.fetchStart,
      fetchEnd: this.fetchEnd,
      editInfo,
      handleRefresh
    }
    return (
      <Fragment>
        <Table
          {...tableProps}
          columns={columns}
          className={styles['table-warp']}
          bordered
          pagination={{
            ...tableProps.pagination,
            current: tableProps.pagination.Skip,
            pageSize: tableProps.pagination.Take,
            showTotal: total => `总共 ${total} 条数据`,
          }}
          rowKey={record => record.Id}
          rowClassName={(record, index) => {
            return currentItemId && record.Id === currentItemId ? 'active' : ''
          }}
        />
        <EditModal {...editProps}/>
      </Fragment>
    )
  }
}

export default List
