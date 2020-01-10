import React, { useContext } from 'react'
import VanTabbar from '@vant/weapp/dist/tabbar'
import VanTabbarItem from '@vant/weapp/dist/tabbar-item'
import { switchTab } from 'remax/wechat'
import { AppContext } from '@/app'

const tabList = [
  { title: '黑名单', icon: 'wap-home-o', url: '/pages/black/index' },
  { title: '新体验', icon: 'bulb-o', url: '/pages/index/index' },
  { title: '关于', icon: 'apps-o', url: '/pages/about/index' },
]
export default function () {
  const App = useContext(AppContext)
  const changeState = newState => {
    App.setGlobalData({ ...App.globalData, ...newState })
  }
  const handleClick = e => {
    changeState({ tabBarIndex: e.detail })
    switchTab({ url: tabList[e.detail]['url'] })
  }
  return (
    <VanTabbar active={App.globalData.tabBarIndex} onchange={handleClick}>
      {tabList.map(item => (
        <VanTabbarItem icon={item.icon} key={item.url}>{item.title}</VanTabbarItem>
      ))}
    </VanTabbar>
  )
}
