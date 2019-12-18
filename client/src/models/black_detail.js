import * as api from '../service/black'
import Notify from '../@vant/notify/notify'

export default {
  namespace: 'black_detail',
  state: {
    detail: {},
    rate: '',
    rateList: []
  },
  effects: {
    * submit ({ payload }, { call, put }) {
      const response = yield call(api.updateRateApi, { ...payload, checked: false })
      if (response.errMsg === 'collection.add:ok') {
        Notify({
          type: 'success', message: '提交成功',
          onClose: yield put({ type: 'saveRate', payload: { rate: '' } })
        })
      }
    },
    * getRateList ({ payload }, { call, put }) {
      const response = yield call(api.getRateListApi, { ...payload })
      if (response.errMsg === 'collection.get:ok') {
        yield put({ type: 'saveState', payload: { rateList: response.data } })
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
    saveState (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
