import React, { useEffect } from 'react'
import { View, navigateTo, usePullDownRefresh, useShareAppMessage } from 'remax/wechat'
import { shareInfo } from '../../utils/utils'
import VanNoticeBar from '@vant/weapp/dist/notice-bar'
import VanSearch from '@vant/weapp/dist/search'
import VanButton from '@vant/weapp/dist/button'
import VanLoading from '@vant/weapp/dist/loading'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDivider from '@vant/weapp/dist/divider'
import CustomTabBar from '@/custom-tab-bar'
import Pagination from '@/components/pagination'
import hooks from './hooks'

export default function () {
  const [state, setState, loading, fetch, search] = hooks()
  const changeState = newState => {
    setState({ ...state, ...newState })
  }
  useEffect(() => {
    fetch()
  }, [])
  usePullDownRefresh(() => {
    fetch()
  })
  useShareAppMessage(() => {
    return shareInfo
  })
  const handleClickDetail = (detail) => {
    navigateTo({ url: `/pages/black-detail/index?detail=${JSON.stringify(detail)}` })
  }
  return (
    <View className='has-custom'>
      <VanNoticeBar
        mode='closeable'
        text='如果你觉得小程序做的还不错，点击右上角的按钮，添加到“我的小程序”，或者分享给你身边的IT从业者'
      />
      <View>
        <VanSearch
          value={state.searchVal}
          placeholder='输入公司名称搜索'
          use-action-slot
          onchange={e => changeState({ searchVal: e.detail })}
          onsearch={() => search()}
        >
          <View slot='action' ontap={() => search()}>
            <VanButton type='info' size='small'>搜索</VanButton>
          </View>
        </VanSearch>
        {loading.fetch &&
        <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
        </View>
        }
        <VanCellGroup>
          {state.blackList.map(item => (
            item.checked && <VanCell key={item._id} title={item.name} is-link label={item.time}
                                     onclick={() => handleClickDetail(item)}/>
          ))}
        </VanCellGroup>
        {(state.blackList.length === 0) && <VanDivider contentPosition='center'>没有更多了</VanDivider>}
        <Pagination pagination={state.pagination} onPageChange={fetch}/>
      </View>
      <CustomTabBar/>
    </View>
  )
}
