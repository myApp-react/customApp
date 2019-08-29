import modelExtend from 'dva-model-extend'
import { pageModel } from '@/utils/model'
import { queryPageList, removePage, releasePage, addPage, CopyPage, editName } from 'api'
import { pathMatchRegexp, router } from '@/utils';
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { message } from 'antd';

export default modelExtend(pageModel, {
  namespace: 'pageslist', //namespace 是该 model 的命名空间
  /**
   * 用于订阅某些数据源，并根据情况 dispatch 某些 action，
   * */
  subscriptions: {
    setup({ dispatch, history }) {//一进入页面请求
      history.listen(location => {
        if (pathMatchRegexp('/pageslist', location.pathname)) {
          const payload = location.query.Skip && location.query || { Skip: 1, Take: 10 };
          dispatch({ type: 'queryPageList', payload })
        }
      })
    },
  },

  /**
   * 用于处理异步操作，不能直接修改 state，由 action 触发，也可触发 action。
   * 它只能是 generator 函数，并且有 action 和 effects 两个参数。
   * 第二个参数 effects 包含 put、call 和 select 三个字段，
   *    put 用于触发 action，
   *    call 用于调用异步处理逻辑，
   *    select 用于从 state 中获取数据
   * */
  effects: {
    *queryPageList({ payload }, { call, put, select }, ) {
      const response = yield call(queryPageList, payload);
      const { data, Status, Total } = response;
      if(Status === 1){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              Skip: Number(payload.Skip),
              Take: Number(payload.Take),
              total: Total,
            },
          },
        })
      }
    },
    *delete({ payload }, { call, put, select }){
      const response = yield call(removePage, payload);
      const { Status } = response;
      if(Status === 1){
        message.success("删除成功！")
      }
    },
    *release({ payload }, { call, put, select }){
      const response = yield call(releasePage, payload);
      const { Status } = response;
      if(Status === 1){
        message.success("发布成功！")
      }
    },
    *CopyPage({ payload }, { call, put, select }){
      const response = yield call(CopyPage, payload);
      const { Status } = response;
      if(Status === 1){
        message.success("复制成功！")
      }
    },
    *addNewPage({ payload }, { call, put }){
      const response = yield call(addPage, payload);
      const { Status } = response;
      if(Status === 1){
        message.success("保存成功！");
        return { succ: true }
      }else {
        message.error("保存失败！")
      }
    },
    *editName({ payload }, { call, put }){
      const response = yield call(editName, payload);
      const { Status } = response;
      if(Status === 1){
        message.success("修改成功！");
        return { succ: true }
      }else {
        message.error("保存失败！")
      }
    },
  },
  /**
   * 类似于 redux 中的 reducer，它是一个纯函数，用于处理同步操作，
   * 是唯一可以修改 state 的地方，由 action 触发，它有 state 和 action 两个参数
   * */
  reducers: {

  },

});
