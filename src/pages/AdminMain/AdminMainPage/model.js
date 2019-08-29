import { getBiconfig } from 'api'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'


export default {
  namespace: 'AdminMainPage', //namespace 是该 model 的命名空间
  state: {//是状态的初始值。
    res: "",
  },
  /**
   * 用于订阅某些数据源，并根据情况 dispatch 某些 action，
   * */
  subscriptions: {
    setup({ dispatch, history }) {//一进入页面请求
      // dispatch({
      //   type: 'getBiconfig',
      //   payload: {
      //     limit: 10,
      //     offset: 0
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
    *getBiconfig({ payload }, { call, put, select }, ) {
      const response = yield call(getBiconfig);
      console.warn("获取", response)
      return response
    },
    *siderChange({ payload }, { call, put }) {

    },
    *rangeChange({ payload }, { call, put }) {

    },


  },
  /**
   * 类似于 redux 中的 reducer，它是一个纯函数，用于处理同步操作，
   * 是唯一可以修改 state 的地方，由 action 触发，它有 state 和 action 两个参数
   * */
  reducers: {
    update(){

    }

  },

};
