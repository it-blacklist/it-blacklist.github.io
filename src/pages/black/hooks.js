import React from 'react'
import { fetchApi, SearchApi } from '@/service/black'
import { pageScrollTo, stopPullDownRefresh } from 'remax/wechat'

export default function () {
  const [state, setState] = React.useState({
    blackList: [],
    searchVal: '',
    pagination: { total: 0, pageSize: 20, current: 1 }
  })
  const [loading, setLoading] = React.useState({})

  function fetch (current = 1) {
    pageScrollTo({ scrollTop: 0, duration: 300 })
    setLoading({ fetch: true })
    fetchApi({ pageSize: state.pagination.pageSize, current })
      .then(res => {
        setLoading({})
        if (res.errMsg === 'cloud.callFunction:ok') {
          const { list, total } = res.result
          setState({
            ...state,
            blackList: list,
            pagination: { total: total, current, pageSize: state.pagination.pageSize }
          })
          stopPullDownRefresh()
        }
      }).catch(r => {})
  }

  function search () {
    setLoading({ fetch: true })
    SearchApi({ name: state.searchVal })
      .then(res => {
        setLoading({})
        if (res.errMsg === 'collection.get:ok') {
          setState({
            ...state,
            blackList: res.data,
            pagination: { total: 1, pageSize: state.pagination.pageSize, current: 1 }
          })
        }
      })
  }

  return [state, setState, loading, fetch, search]
}
