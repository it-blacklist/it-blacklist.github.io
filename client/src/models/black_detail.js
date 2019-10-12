export default {
  namespace: 'black_detail',
  state: {
    detail: {},
  },
  effects: {
    * fetch ({ payload }, { call, put }) {
      console.log(payload)
      yield put({ type: 'saveFetch', payload: { detail: payload } })
    },
  },
  reducers: {
    saveFetch (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
