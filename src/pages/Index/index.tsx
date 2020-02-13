import React, { useEffect, useState } from 'react'
import {
  View,
  Button,
  navigateTo,
  usePullDownRefresh,
  useShareAppMessage,
  pageScrollTo,
  stopPullDownRefresh,
  showLoading,
  hideLoading, Icon, Input
} from 'remax/wechat'
import { shareInfo } from '@/utils/utils'
import { Pagination } from '@/components'
import { fetchApi, SearchApi } from '@/service/black'

const handleClickDetail = (detail: any) => {
  navigateTo({ url: `/pages/BlackDetail/index?detail=${JSON.stringify(detail)}` })
}
export default () => {
  const [blackList, setBlackList] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [pagination, setPagination] = useState({ total: 0, pageSize: 20, current: 1 })
  
  const fetch = (current = 1) => {
    showLoading()
    pageScrollTo({ scrollTop: 0, duration: 300 })
    fetchApi({ pageSize: pagination.pageSize, current })
      .then((res: any) => {
        hideLoading()
        if (res.errMsg === 'cloud.callFunction:ok') {
          const { list, total } = res.result
          setBlackList(list)
          setPagination({ total: total, current, pageSize: pagination.pageSize })
          stopPullDownRefresh()
        }
      }).catch(r => {})
  }
  
  const search = () => {
    showLoading()
    searchVal ?
      SearchApi({ name: searchVal })
        .then((res: any) => {
          hideLoading()
          if (res.errMsg === 'collection.get:ok') {
            setBlackList(res.data)
            setPagination({ total: 1, pageSize: pagination.pageSize, current: 1 })
          }
        }) : fetch()
  }
  
  useEffect(() => {
    fetch()
  }, [])
  usePullDownRefresh(() => {
    setSearchVal('')
    fetch()
  })
  useShareAppMessage(() => {
    return shareInfo
  })
  
  return (
    <View>
      <View className="weui-search-bar">
        <View className="weui-search-bar__form">
          <View className="weui-search-bar__box">
            <Icon className="weui-icon-search_in-box" type="search" size="14"/>
            <Input type="text" className="weui-search-bar__input" placeholder="输入公司名称搜索" value={searchVal}
                   onInput={e => setSearchVal(e.detail.value)}/>
            {searchVal.length > 0 && <View className="weui-icon-clear" onClick={() => setSearchVal('')}>
              <Icon type="clear" size="14"/>
            </View>}
          </View>
        </View>
        <View className="weui-search-bar__cancel-btn">
          <Button style={{ display: 'block' }} type='primary' size='mini' onClick={() => search()}>搜索</Button>
        </View>
      </View>
      <View className="weui-panel">
        <View className="weui-panel__bd">
          {blackList && blackList.length !== 0 ? blackList.map((item: any) => (
            item.checked &&
            <View key={item._id} onClick={() => handleClickDetail(item)}
                  className="weui-media-box weui-media-box_text">
              <View className="weui-media-box__title weui-media-box__title_in-text">{item.name}</View>
              <View className="weui-media-box__desc">{item.info}</View>
              <View className="weui-media-box__info">
                <View className="weui-media-box__info__meta">{item.time}</View>
              </View>
            </View>
          )) : <View className="weui-loadmore weui-loadmore_line">
            <View className="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</View>
          </View>}
        </View>
      </View>
      <Pagination pagination={pagination} onPageChange={fetch}/>
    </View>
  )
}
