import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      Skip: 1,
      Take: 10,
      total: 0,
    },
    currentItemId: ''
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    updateCurrentItemId(state, { payload: {currentItemId} }){
      console.error("我被触发了")
      // console.log("currentItemId", payload)
      return { ...state, currentItemId }
    },
  },
})
