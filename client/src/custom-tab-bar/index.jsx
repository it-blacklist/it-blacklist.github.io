import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'

const tabList = [
  { title: '黑名单', icon: 'wap-home-o', url: '/pages/black/index' },
  { title: '新体验', icon: 'bulb-o', url: '/pages/index/index' },
  { title: '关于', icon: 'apps-o', url: '/pages/about/index' },
]
@connect(({ tabbar }) => ({
  ...tabbar
}), (dispatch) => ({
  handleClick (currentIndex) {
    dispatch({ type: 'tabbar/switch', payload: { currentIndex } })
    Taro.switchTab({ url: tabList[currentIndex]['url'] })
  }
}))
export default class TabBar extends Taro.Component {
  config = {
    usingComponents: {
      'van-tabbar': '@vant/weapp/dist/tabbar/index',
      'van-tabbar-item': '@vant/weapp/dist/tabbar-item/index'
    }
  }

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
