import React from 'react'
import Notify from '@vant/weapp/dist/notify/notify'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import { feedbackApi } from '@/service/black'
import { navigateBack } from 'remax/wechat'

export default function () {
  const [state, setState] = React.useState({ feedback: '' })
  const [loading, setLoading] = React.useState({})

  function submit () {
    if (!state.feedback) {
      Notify({ type: 'warning', message: '请输入内容' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        setLoading({ submit: true })
        feedbackApi({ feedback: state.feedback })
          .then(res => {
            if (res.errMsg === 'collection.add:ok') {
              setLoading({})
              Notify({
                type: 'success', message: '提交成功',
                onClose: () => {navigateBack({ delta: 0 })}
              })
            }
          }).catch(r => {})
      }).catch(r => {})
    }
  }

  return [state, setState, loading, submit]
}
