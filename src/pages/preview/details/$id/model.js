import { queryInfoById } from 'api'
import { pathMatchRegexp } from '@/utils';
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant';

export default {
  namespace: 'preview',
  state: {
    initData: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/preview/details/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { ConfigId: match[1] } })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }){
      const response = yield call(queryInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1 && data.length !== 0){
        yield put({
          type: 'updateInit',
          payload: {
            initData: data
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
    updateInit(state, { payload:{ initData } }){
      return {
        ...state,
        initData
      }
    },
  },
};
