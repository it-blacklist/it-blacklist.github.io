import React from 'react'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import Notify from '@vant/weapp/dist/notify/notify'
import { addBlackApi } from '@/service/black'
import { navigateBack } from 'remax/wechat'

export default function () {
  const [state, setState] = React.useState({
    name: '',
    info: '',
  })
  const [loading, setLoading] = React.useState({})

  function submit () {
    if (!state.name || !state.info) {
      Notify({ type: 'warning', message: '请补全信息后再提交!' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        setLoading({ submit: true })
        const time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        addBlackApi({ name: state.name, info: state.name, time, checked: true })
          .then(res => {
            setLoading({})
            if (res.result.errMsg === 'collection.add:ok') {
              Notify({
                type: 'success', message: '提交成功',
                onClose: () => {navigateBack()}
              })
            } else if (res.result.errCode === 87014) {
              Notify({ type: 'danger', message: '内容含有违法违规内容' })
            }
          }).catch(r => {})
      }).catch(r => {})
    }
  }

  return [state, setState, loading, submit]
}
