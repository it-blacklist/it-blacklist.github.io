import Taro from '@tarojs/taro'
import * as api from '../service/black'

export default {
  namespace: 'black_detail',
  state: {
    blackIndex: 0,
    rate: '',
    actionShow: false,
  },
  effects: {
    * submit ({ payload }, { call, put }) {
      const response = yield call(api.updateBlackApi, { ...payload })
      if (response.errMsg === 'document.update:ok') {
        Taro.atMessage({ message: '提交成功', type: 'success' })
        yield put({ type: 'black/fetch', payload:{current: payload.currentPage }})
        yield put({ type: 'saveAction', payload: { actionShow: false } })
        yield put({ type: 'saveRate', payload: { rate: '' } })
      }
    },
  },
  reducers: {
    saveFetch (state, { payload }) {
      return { ...state, ...payload }
    },
    saveRate (state, { payload }) {
      return { ...state, ...payload }
    },
    saveAction (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
