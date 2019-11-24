import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtNoticebar, AtIndexes } from 'taro-ui'
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
    enablePullDownRefresh: true
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
        <AtNoticebar icon='volume-plus'>这里的功能还不太稳定，从这里往下拉可以刷新列表~</AtNoticebar>
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
