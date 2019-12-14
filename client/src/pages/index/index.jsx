import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
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
      'van-notice-bar': '@vant/weapp/dist/notice-bar/index',
      'van-index-bar': '@vant/weapp/dist/index-bar/index',
      'van-index-anchor': '@vant/weapp/dist/index-anchor/index',
      'van-cell': '@vant/weapp/dist/cell/index',
      'van-loading': '@vant/weapp/dist/loading/index'
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
  }

  onShareAppMessage () {
    return shareInfo
  }

  onPageScroll (event) {
    this.props.dispatch({
      type: 'home/saveState', payload: { scrollTop: event.scrollTop }
    })
  }

  render () {
    const { blackList, loading, handleClickDetail, scrollTop } = this.props
    return (
      <View className='index'>
        <van-notice-bar wrapable left-icon='volume' text='这里的功能还不太稳定，从这里往下拉可以刷新列表~'/>
        <View>
          {loading.effects['home/fetch'] ?
            <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
              <van-loading size='24px' color='#1989fa'>加载中...</van-loading>
            </View>
            : <van-index-bar scroll-top={scrollTop} index-list={[]}>
              {blackList.map(item => (
                <view key={item.key}>
                  <van-index-anchor index={item.title}/>
                  {item.items.map(_item => (
                    <van-cell title={_item.name} key={_item._id} onclick={() => handleClickDetail(_item)}/>
                  ))}
                </view>
              ))}
            </van-index-bar>}
        </View>
      </View>
    )
  }
}
