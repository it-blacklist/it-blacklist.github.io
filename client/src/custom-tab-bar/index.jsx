import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtTabBar } from 'taro-ui'

const tabList = [
  { title: '黑名单', iconType: 'home', url: '/pages/black/index' },
  { title: '新体验', iconType: 'loading-2', url: '/pages/index/index' },
  { title: '关于', iconType: 'tag', url: '/pages/about/index' },
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
  render () {
    const { currentIndex, handleClick } = this.props
    return (
      <AtTabBar fixed tabList={tabList} onClick={handleClick} current={currentIndex}/>
    )
  }
}
