import Taro from '@tarojs/taro'
import * as api from '../service/black'

export default {
  namespace: 'black_new',
  state: {
    name: '',
    info: '',
    actionShow: false,
  },
  effects: {
    * submit ({ payload }, { call, put }) {
      const time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      const response = yield call(api.addBlackApi, { ...payload, time,rate:[] })
      if (response.errMsg === 'collection.add:ok') {
        yield put({ type: 'saveAction', payload: { actionShow: false } })
        Taro.atMessage({ message: '提交成功', type: 'success' })
        setTimeout(() => {
          Taro.navigateBack({ delta: 0 })
        }, 2000)
      }
    },
  },
  reducers: {
    saveName (state, { payload }) {
      return { ...state, ...payload }
    },
    saveInfo (state, { payload }) {
      return { ...state, ...payload }
    },
    saveAction (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
