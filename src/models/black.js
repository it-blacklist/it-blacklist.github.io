import * as api from '../service/black'
import { stopPullDownRefresh } from 'remax/wechat'

export default {
  namespace: 'black',
  state: {
    blackList: [],
    searchVal: '',
    pagination: { total: 0, pageSize: 20, current: 1 }
  },
  effects: {
    * fetch ({ payload }, { call, put, select }) {
      const pageSize = yield select(state => state['black'].pagination.pageSize)
      const res = yield call(api.fetchApi, { ...payload, pageSize })
      if (res.errMsg === 'cloud.callFunction:ok') {
        const { list, total } = res.result
        yield put({
          type: 'saveFetch',
          payload: { blackList: list, pagination: { total: total, current: payload.current } }
        })
        stopPullDownRefresh()
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
    saveFetch (state, { payload: { blackList = [], pagination = { total: 0, pageSize: 20, current: 1 } } }) {
      return { ...state, blackList, pagination: { ...state.pagination, ...pagination } }
    },
    saveSearchVal (state, { payload }) {
      return { ...state, ...payload }
    },
    saveSearch (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
