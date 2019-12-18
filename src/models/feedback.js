import { navigateBack } from 'remax/wechat'
import * as api from '../service/black'
import Notify from '@vant/weapp/dist/notify/notify'

export default {
  namespace: 'feedback',
  state: {
    feedback: '',
  },
  effects: {
    * submit ({ payload }, { call }) {
      const response = yield call(api.feedbackApi, { ...payload })
      if (response.errMsg === 'collection.add:ok') {
        Notify({
          type: 'success', message: '提交成功',
          onClose: () => {navigateBack({ delta: 0 })}
        })
      }
    },
  },
  reducers: {
    saveState (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
