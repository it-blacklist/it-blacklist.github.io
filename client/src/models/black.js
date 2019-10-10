import * as api from '../service/black'

export default {
  namespace: 'black',
  state: {
    blackList: [],
    total: 0,
    pageSize: 10,
    currentPage: 1
  },
  effects: {
    * fetch ({ payload }, { call, put }) {
      const response = yield call(api.fetchApi, payload)
      if (response.errMsg === 'collection.get:ok') {
        yield put({ type: 'saveFetch', payload: { blackList: response.data, currentPage: payload.current } })
      }
    },
    * getCount (_, { call, put }) {
      const response = yield call(api.getCountApi)
      if (response.errMsg === 'collection.count:ok') {
        yield put({ type: 'saveCount', payload: { total: response.total } })
      }
    }
  },
  reducers: {
    saveFetch (state, { payload }) {
      return { ...state, ...payload }
    },
    saveCount (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
