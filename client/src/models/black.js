import * as api from '../service/black'
import Taro from '@tarojs/taro'

export default {
  namespace: 'black',
  state: {
    blackList: [],
    searchVal: '',
    total: 0,
    pageSize: 20,
    currentPage: 1
  },
  effects: {
    * fetch ({ payload }, { call, put }) {
      const response = yield call(api.fetchApi, payload)
      if (response.errMsg === 'collection.get:ok') {
        yield put({ type: 'saveFetch', payload: { blackList: response.data, currentPage: payload.current } })
        Taro.stopPullDownRefresh()
      }
    },
    * getCount (_, { call, put }) {
      const response = yield call(api.getCountApi)
      if (response.errMsg === 'collection.count:ok') {
        yield put({ type: 'saveCount', payload: { total: response.total } })
      }
    },
    * Search (_, { call, put, select }) {
      const name = yield select(state => state.black.searchVal)
      const response = yield call(api.SearchApi, { name })
      if (response.errMsg === 'collection.get:ok') {
        yield put({ type: 'saveCount', payload: { blackList: response.data, currentPage: 1, total: 1 } })
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
    saveSearchVal (state, { payload }) {
      return { ...state, ...payload }
    },
    saveSearch (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
