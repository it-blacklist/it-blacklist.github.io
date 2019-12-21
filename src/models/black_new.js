import { navigateBack } from 'remax/wechat'
import * as api from '../service/black'
import Notify from '@vant/weapp/dist/notify/notify'

export default {
  namespace: 'black_new',
  state: {
    name: '',
    info: '',
  },
  effects: {
    * submit ({ payload }, { call }) {
      const time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      const res = yield call(api.addBlackApi, { ...payload, time, checked: true })
      if (res.result.errMsg === 'collection.add:ok') {
        Notify({
          type: 'success', message: '提交成功',
          onClose: () => {navigateBack({ delta: 0 })}
        })
      } else if (res.result.errCode === 87014) {
        Notify({ type: 'danger', message: '内容含有违法违规内容' })
      }
    },
  },
  reducers: {
    saveState (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
