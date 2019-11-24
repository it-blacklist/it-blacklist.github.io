import Taro from '@tarojs/taro'
import * as api from '../service/black'
import { generator } from '../utils/utils'

export default {
  namespace: 'home',
  state: {
    blackList: []
  },
  effects: {
    * fetch (_, { call, put }) {
      const count = yield call(api.getCountApi)
      if (count.errMsg === 'collection.count:ok') {
        const List = []
        for (let i = 0; i < Math.ceil(count.total / 20); i++) {
          const res = yield call(api._fetchApi, i * 20)
          if (res.errMsg === 'collection.get:ok') {
            List.push(...res.data)
          }
        }
        const blackList = generator(List)
        Taro.setStorageSync('blackList', blackList)
        yield put({ type: 'saveState', payload: { blackList } })
      }
    },
  },
  reducers: {
    saveState (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
