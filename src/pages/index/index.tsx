import React, { useEffect, useState, useContext } from 'react'
import {
  View, Button, pageScrollTo, stopPullDownRefresh, showLoading, hideLoading, Icon, Input,
} from 'remax/wechat'
import { usePageEvent } from 'remax/macro'
import { Pagination, LoadingMore } from '@/components'
import { fetchApi, SearchApi } from '@/service/black'
import { GlobalContext, GlobalContextTypes } from '@/app'
import { DetailTypes } from '@/pages/black-detail/data'
import { ResTypes } from './data'
import Cell from 'weui-miniprogram/miniprogram_dist/cell/cell'
import Cells from 'weui-miniprogram/miniprogram_dist/cells/cells'

export default () => {
  const [blackList, setBlackList] = useState<Array<DetailTypes>>([])
  const [searchVal, setSearchVal] = useState('')
  const [pagination, setPagination] = useState({ total: 0, pageSize: 20, current: 1 })
  const { globalShow }: GlobalContextTypes = useContext(GlobalContext)
  const fetch = (current = 1) => {
    showLoading()
    pageScrollTo({ scrollTop: 0, duration: 300 })
    fetchApi({ pageSize: pagination.pageSize, current })
      .then((res: ResTypes) => {
        hideLoading()
        if (res.errMsg === 'cloud.callFunction:ok') {
          const { list, total } = res.result
          setBlackList(list)
          setPagination({ total: total, current, pageSize: pagination.pageSize })
          stopPullDownRefresh()
        }
      })
  }
  const search = () => {
    showLoading()
    searchVal ?
      SearchApi({ name: searchVal })
        .then((res: ResTypes) => {
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
  usePageEvent('onPullDownRefresh', () => {
    setSearchVal('')
    fetch()
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
      <Cells>
        {blackList && blackList.length !== 0 ? blackList.map((item: DetailTypes) => (
          item.checked &&
          <Cell key={item._id} link url={`/pages/black-detail/index?detail=${JSON.stringify(item)}`}>
            <View>{item.name}</View>
            {globalShow && <View className="weui-media-box__desc">{item.info}</View>}
          </Cell>
        )) : <LoadingMore type='noMore'/>}
      </Cells>
      <Pagination pagination={pagination} onPageChange={fetch}/>
    </View>
  )
}
