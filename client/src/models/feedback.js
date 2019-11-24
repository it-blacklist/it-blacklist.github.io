import Taro from '@tarojs/taro'
import * as api from '../service/black'

export default {
  namespace: 'feedback',
  state: {
    feedback: '',
    actionShow: false,
  },
  effects: {
    * submit ({ payload }, { call, put }) {
      const response = yield call(api.feedbackApi, { ...payload })
      if (response.errMsg === 'collection.add:ok') {
        Taro.atMessage({ message: '提交成功', type: 'success' })
        yield put({ type: 'saveState', payload: { actionShow: false, feedback: '' } })
      }
    },
  },
  reducers: {
    saveState (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
