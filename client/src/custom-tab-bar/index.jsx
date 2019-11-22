import Taro from '@tarojs/taro'
import {connect} from '@tarojs/redux'
import {AtTabBar} from 'taro-ui'

@connect(({tabbar}) => ({
  ...tabbar
}), (dispatch) => ({
  handleClick(currentIndex) {
    dispatch({type: 'tabbar/switch', payload: {currentIndex}})
    Taro.switchTab({url: ['/pages/black/index', '/pages/about/index'][currentIndex]})
  }
}))
export default class TabBar extends Taro.Component {
  render() {
    const {currentIndex, handleClick} = this.props
    return (
      <AtTabBar
        fixed
        tabList={[{title: '黑名单', iconType: 'home'}, {title: '关于', iconType: 'tag'}]}
        onClick={handleClick}
        current={currentIndex}
      />
    )
  }
}
