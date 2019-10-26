/**
 * title: 配置列表
 */
import React, {PureComponent, Fragment} from 'react';
import { Helmet } from 'react-helmet'
import style from './index.less'
import { router } from '@/utils'
import { connect } from 'dva'
import { stringify } from 'qs'
import { Page } from '@/components'
import { Button } from 'antd';
import List from './components/List'
import AddModal from './components/addModal'

@connect(({ pageslist, loading }) => ({ pageslist, loading }))
class Pageslist extends PureComponent {

  state = {
    visible: false,
  }

  _addPageHandle = () => {
    this.setState((pre) => ({
      visible: !pre.visible
    }))
  };

  handleCancel = () => {
    this.setState((pre) => ({
      visible: !pre.visible
    }))
  };

  render() {
    const { visible } = this.state;
    const { location, dispatch, pageslist, loading } = this.props
    const { query, pathname } = location
    const { list, pagination, currentItemId } = pageslist;

    const handleRefresh = newQuery => {
      router.replace({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          // { arrayFormat: 'repeat' }
        ),
      })
    }

    const listProps = {
      handleRefresh,
      dispatch,
      currentItemId,
      dataSource: list,
      // loading,
      confirmLoading: loading.effects['pageslist/editName'],
      loading: loading.effects['pageslist/queryPageList'],
      pagination,
      onChange(page, filters, sorter) {
        const { field, order } = sorter;
        handleRefresh({
          Skip: page.current,
          Take: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'pageslist/delete',
          payload: {
            configId: id
          },
        }).then(() => {
          handleRefresh({
            Skip:
              list.length === 1 && pagination.Skip > 1
                ? pagination.Skip - 1
                : pagination.Skip,
            Take: pagination.Take
          })
        })
      },
      onReleaseItem(id){//release
        dispatch({
          type: 'pageslist/release',
          payload: {
            configId: id
          },
        }).then(() => {
          handleRefresh({
            Skip:
              list.length === 1 && pagination.Skip > 1
                ? pagination.Skip - 1
                : pagination.Skip,
            Take: pagination.Take
          })
        })
      },
      onCopyItem(id) {
        dispatch({
          type: 'pageslist/CopyPage',
          payload: {
            configId: id,
          },
        }).then(() => {
          handleRefresh({
            Skip:
              list.length === 1 && pagination.Skip > 1
                ? pagination.Skip - 1
                : pagination.Skip,
            Take: pagination.Take
          })
        })
      },
    }

    const addProps = {
      title: '新增配置列表',
      visible,
      dispatch,
      location,
      confirmLoading: loading.effects['pageslist/addNewPage'],
      handleCancel: this.handleCancel,
      handleRefresh,
    }
    console.log("预览地址：", previewUrl)
    return (
      <Page inner>
        <div className={style['add-btn-warp']}>
          <Button icon="plus" type="primary"  onClick={this._addPageHandle}>新增</Button>
        </div>
        <List {...listProps}/>
        <AddModal {...addProps}/>
      </Page>
    );
  }
}

export default Pageslist
