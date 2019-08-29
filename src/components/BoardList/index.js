/**
 * 模板列表
 * */
import React, { Component } from 'react'
import style from './index.less';
import { pathMatchRegexp } from '@/utils';
import withRouter from 'umi/withRouter';

function getScrollHeight(){
  return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) + 180;
}

@withRouter
export default class BoardList extends Component {
  _addHandle = (record, e) => {
    const { type } = record;
    const { location, initData, dispatch, handleRefresh, scrollToBottom } = this.props;
    const { pathname } = location;
    const match = pathMatchRegexp('/pageslist/details/:id', pathname);
    const OrderNo = initData.length + 1;
    dispatch({
      type: 'pagesinfo/addPageList',
      payload: {
        configJson: JSON.stringify([{ Id: '', ConfigId: match[1], OrderNo, type }])
      }
    }).then(_ => {
      if(_){
        handleRefresh()
      }
    })
  }

  shouldComponentUpdate(preProps, preState){
    if(preProps.boardList !== this.props.boardList){
      return true
    }
    return false
  }

  render() {
    const { boardList } = this.props;
    return (
      <div className={style['board-list']}>
        <ul>
          {
            boardList.map(_ =>
              <li  key={_.id}>
                <button
                  data-text={_.name}
                  data-id={_.id}
                  className={style['board-list-li']}
                  onClick={e => this._addHandle(_, e)}
                >
                  <span className={style['board-title']}>点击添加</span>
                </button>
              </li>)
          }
        </ul>
      </div>
    )
  }
};
