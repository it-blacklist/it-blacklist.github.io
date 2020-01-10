import React from 'react'
import Notify from '@vant/weapp/dist/notify/notify'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import { getRateListApi, submitRateApi } from '@/service/black'

export default function () {
  const [state, setState] = React.useState({
    detail: {},
    rate: '',
    rateList: []
  })
  const [loading, setLoading] = React.useState({})

  function fetchRate (detail) {
    setLoading({ fetchRate: true })
    getRateListApi({ _id: detail._id })
      .then(res => {
        setLoading({})
        if (res.errMsg === 'collection.get:ok') {
          setState({ ...state, rateList: res.data, detail })
        }
      }).catch(r => {})
  }

  function submit () {
    if (!state.rate.length) {
      Notify({ type: 'warning', message: '请输入内容' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        setLoading({ submit: true })
        submitRateApi({ father: state.detail._id, content: state.rate, checked: true })
          .then(res => {
            setLoading({})
            if (res.result.errMsg === 'collection.add:ok') {
              Notify({
                type: 'success', message: '提交成功',
                onClose: setState({ ...state, rate: '' })
              })
            } else if (res.result.errCode === 87014) {
              Notify({ type: 'danger', message: '内容含有违法违规内容' })
            }
          })
      }).catch(() => {})
    }
  }

  return [state, setState, loading, fetchRate, submit]
}
