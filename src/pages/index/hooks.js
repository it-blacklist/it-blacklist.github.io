import React from 'react'
import { fetchAllApi } from '@/service/black'
import { setStorageSync, stopPullDownRefresh } from 'remax/wechat'

export default function () {
  const [state, setState] = React.useState({
    blackList: [],
    scrollTop: 0,
  })
  const [loading, setLoading] = React.useState({})

  function fetchAll () {
    setLoading({ fetchAll: true })
    fetchAllApi()
      .then(res => {
        setLoading({})
        if (res.errMsg === 'cloud.callFunction:ok') {
          setState({ ...state, blackList: res.result })
          setStorageSync('blackList', res.result)
          stopPullDownRefresh()
        }
      }).catch(r => {})
  }

  return [state, setState, loading, fetchAll]
}
