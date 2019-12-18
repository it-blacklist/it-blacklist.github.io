import { switchTab } from 'remax/wechat'
import { connect } from 'remax-dva'
import React, { Component } from 'react'

const tabList = [
  { title: '黑名单', icon: 'wap-home-o', url: '/pages/black/index' },
  { title: '新体验', icon: 'bulb-o', url: '/pages/index/index' },
  { title: '关于', icon: 'apps-o', url: '/pages/about/index' },
]

class TabBar extends Component {
  render () {
    const { currentIndex, handleClick } = this.props
    return (
      <van-tabbar active={currentIndex} onchange={e => handleClick(e.detail)}>
        {tabList.map(item => (
          <van-tabbar-item icon={item.icon} key={item.url}>{item.title}</van-tabbar-item>
        ))}
      </van-tabbar>
    )
  }
}

export default connect(({ tabbar }) => ({
  ...tabbar
}), (dispatch) => ({
  handleClick (currentIndex) {
    dispatch({ type: 'tabbar/switch', payload: { currentIndex } })
    switchTab({ url: tabList[currentIndex]['url'] })
  }
}))(TabBar)
