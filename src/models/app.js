import { queryShopBrand, getActivity } from 'api'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'


export default {
  namespace: 'app', //namespace 是该 model 的命名空间
  state: {//是状态的初始值。
    ShopBrand: [],
    activityData: [],
  },
  /**
   * 用于订阅某些数据源，并根据情况 dispatch 某些 action，
   * */
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen((location) => {
        // const { cancelRequest = new Map() } = window
        // cancelRequest.forEach((value, key) => {
        //   if (value.pathname !== location.pathname) {
        //     value.cancel(CANCEL_REQUEST_MESSAGE)
        //     cancelRequest.delete(key)
        //   }
        // })
      })
    },
    setup({ dispatch, history }) {//一进入页面请求
      // history.listen((location) => {
      //   if(location.pathname !== "/wxPreview"){
      //     // dispatch({ type: 'queryShopBrand' })
      //   }
      // })
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
    *queryShopBrand({ payload }, { all, call, put, select }, ) {
      const response = yield call(queryShopBrand);
      // const response1 = yield call(getActivity);
      // const [result1, result2]  = yield all([
      //   call(queryShopBrand),
      //   call(getActivity)
      // ]);
      const { Status, data } = response;
      if(Status === 1){
        yield put({
          type: 'querySucc',
          payload: { ShopBrand: data }
        })
      }
    },
  },
  /**
   * 类似于 redux 中的 reducer，它是一个纯函数，用于处理同步操作，
   * 是唯一可以修改 state 的地方，由 action 触发，它有 state 和 action 两个参数
   * */
  reducers: {
    updateState(state, { payload: updateState }) {
      return { ...state, updateState }
    },
    querySucc(state, { payload: { ShopBrand } }){
      return { ...state, ShopBrand }
    },
    queryActivitySucc(state, { payload: { activityData } }){
      return { ...state, activityData }
    },


  },

};
