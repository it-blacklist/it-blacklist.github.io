import Taro from '@tarojs/taro'
import * as api from '../service/black'
import Notify from '../@vant/notify/notify'

export default {
  namespace: 'black_new',
  state: {
    name: '',
    info: '',
  },
  effects: {
    * submit ({ payload }, { call }) {
      const time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      const response = yield call(api.addBlackApi, { ...payload, time, checked: false })
      if (response.errMsg === 'collection.add:ok') {
        Notify({
          type: 'success', message: '提交成功',
          onClose: () => {Taro.navigateBack({ delta: 0 })}
        })
      }
    },
  },
  reducers: {
    saveState (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
