import React, { useEffect } from 'react'
import { View, navigateTo, getStorageSync, usePageScroll, useShareAppMessage, usePullDownRefresh } from 'remax/wechat'
import { shareInfo } from '@/utils/utils'
import { CustomTabBar } from '@/components'
import VanCell from '@vant/weapp/dist/cell'
import VanNoticeBar from '@vant/weapp/dist/notice-bar'
import VanLoading from '@vant/weapp/dist/loading'
import VanIndexBar from '@vant/weapp/dist/index-bar'
import VanIndexAnchor from '@vant/weapp/dist/index-anchor'
import hooks from './hooks'

export default function () {
  let timer = null, startTime = new Date().getTime()
  const [state, setState, loading, fetchAll] = hooks()
  const changeState = newState => {
    setState({ ...state, ...newState })
  }
  const handleClickDetail = (detail) => {
    navigateTo({ url: `/pages/black-detail/index?detail=${JSON.stringify(detail)}` })
  }
  usePageScroll(e => {
    if (timer !== null) clearTimeout(timer)
    const curTime = new Date().getTime() // 当前时间
    if (curTime - startTime >= 1000) { // 时间差>=1秒直接执行
      changeState({ scrollTop: e.scrollTop })
      startTime = curTime
    } else { // 否则延时执行，像滚动了一下，差值<1秒的那种也要执行
      timer = setTimeout(() => changeState({ scrollTop: e.scrollTop }), 300)
    }
  })
  useShareAppMessage(() => {
    return shareInfo
  })
  usePullDownRefresh(() => {
    fetchAll()
  })
  useEffect(() => {
    const blackList = getStorageSync('blackList')
    blackList ? changeState({ blackList }) : fetchAll()
    return () => {
      timer = null
      startTime = null
    }
  }, [])
  return (
    <View className='has-custom'>
      <VanNoticeBar wrapable left-icon='volume' text='这里的功能还不太稳定，从这里往下拉可以刷新列表~'/>
      <View>
        {loading.fetchAll ?
          <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
          </View>
          : <VanIndexBar scroll-top={state.scrollTop} index-list={[]}>
            {state.blackList.map(item => (
              <View key={item.key}>
                <VanIndexAnchor index={item.title}/>
                {item.items.map(_item => (
                  _item.checked &&
                  <VanCell title={_item.name} key={_item._id} onclick={() => handleClickDetail(_item)}/>
                ))}
              </View>
            ))}
          </VanIndexBar>}
      </View>
      <CustomTabBar/>
    </View>
  )
}
