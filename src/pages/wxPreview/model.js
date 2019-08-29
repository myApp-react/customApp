import { getInfoForWx } from 'api';
export default {
  namespace: 'wxpreview',
  state: {
    initData: [],
    commonUrl: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'query'})
    },
  },
  effects: {
    *query({ payload }, { call, put, select }){
      const response = yield call(getInfoForWx, payload);
      const { Status, data, msg, url } = response;
      if(Status === 1){
        yield put({
          type: 'updateInit',
          payload: {
            initData: JSON.parse(data),
            commonUrl: url ? url : ''
          }
        })
      }else {
        throw {
          message: msg
        }
      }
    },
  },
  reducers: {
    updateInit(state, { payload:{ initData, commonUrl } }){
      return {
        ...state,
        initData,
        commonUrl
      }
    },
  },
};
