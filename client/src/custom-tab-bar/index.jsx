import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtTabBar } from 'taro-ui'

@connect(({ tabbar }) => ({
  ...tabbar
}), (dispatch) => ({
  handleClick (currentIndex) {
    dispatch({ type: 'tabbar/switch', payload: { currentIndex } })
    Taro.switchTab({ url: ['/pages/black/index', '/pages/find/index','/pages/about/index'][currentIndex] })
  }
}))
export default class TabBar extends Component {
  render () {
    const { currentIndex, handleClick } = this.props
    return (
      <AtTabBar
        fixed
        tabList={[{ title: '黑名单', iconType: 'home' }, { title: '发现', iconType: 'eye' }, { title: '关于', iconType: 'settings' }]}
        onClick={handleClick}
        current={currentIndex}
      />
    )
  }
}
