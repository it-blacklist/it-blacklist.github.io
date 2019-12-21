import { setStorageSync, stopPullDownRefresh } from 'remax/wechat'
import * as api from '../service/black'

export default {
  namespace: 'home',
  state: {
    blackList: [],
    scrollTop: 0,
  },
  effects: {
    * fetchAll (_, { call, put }) {
      const res = yield call(api._fetchAllApi)
      if (res.errMsg === 'cloud.callFunction:ok') {
        setStorageSync('blackList', res.result)
        yield put({ type: 'saveState', payload: { blackList: res.result } })
        stopPullDownRefresh()
      }
    },
  },
  reducers: {
    saveState (state, { payload: { blackList = [] } }) {
      return { ...state, blackList }
    },
    saveScrollTop (state, { payload: { scrollTop = 0 } }) {
      return { ...state, scrollTop }
    },
  }
}
