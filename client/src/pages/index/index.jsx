import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtIndexes } from 'taro-ui'
import { shareInfo } from '../../utils/utils'

@connect(({ home, loading }) => ({
  ...home,
  loading
}), (dispatch) => ({
  handleClickDetail (detail) {
    dispatch({ type: 'black_detail/saveFetch', payload: { detail } })
    Taro.navigateTo({ url: '/pages/blackDetail/index' })
  },
}))
export default class Black extends Component {
  config = {
    navigationBarTitleText: '新体验',
    enablePullDownRefresh: true,
    usingComponents: {
      'van-notice-bar': '/@vant/notice-bar/index'
    }
  }
  
  componentDidMount () {
    const blackList = Taro.getStorageSync('blackList')
    blackList ? this.props.dispatch({
      type: 'home/saveState',
      payload: { blackList }
    }) : this.props.dispatch({ type: 'home/fetch' })
  }
  
  onPullDownRefresh () {
    this.props.dispatch({ type: 'home/fetch' })
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 500)
  }
  
  onShareAppMessage () {
    return shareInfo()
  }
  
  render () {
    const { blackList, loading, handleClickDetail } = this.props
    return (
      <View className='index'>
        <van-notice-bar wrapable left-icon='volume' text='这里的功能还不太稳定，从这里往下拉可以刷新列表~'/>
        <View>
          <View style='height:100vh'>
            {loading.effects['home/fetch'] ?
              <AtActivityIndicator mode='center' content='加载中...'/>
              : <AtIndexes list={blackList} onClick={handleClickDetail}/>}
          </View>
        </View>
      </View>
    )
  }
}
