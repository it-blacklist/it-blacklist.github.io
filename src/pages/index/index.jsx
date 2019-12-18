import React, { Component } from 'react'
import { connect } from 'remax-dva'
import { View, navigateTo, getStorageSync } from 'remax/wechat'
import { shareInfo } from '@/utils/utils'
import VanNoticeBar from '@vant/weapp/dist/notice-bar'
import VanLoading from '@vant/weapp/dist/loading'
import VanCell from '@vant/weapp/dist/cell'
import VanIndexBar from '@vant/weapp/dist/index-bar'
import VanIndexAnchor from '@vant/weapp/dist/index-anchor'
import CustomTabBar from '@/custom-tab-bar'

class Index extends Component {
  constructor (props) {
    super(props)
    this.handleClickDetail = this.handleClickDetail.bind(this)
  }
  
  componentDidMount () {
    const blackList = getStorageSync('blackList')
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
    const { blackList, loading, scrollTop } = this.props
    return (
      <View className='index'>
        <VanNoticeBar wrapable left-icon='volume' text='这里的功能还不太稳定，从这里往下拉可以刷新列表~'/>
        <View>
          {loading.effects['home/fetch'] ?
            <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
              <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
            </View>
            : <VanIndexBar scroll-top={scrollTop} index-list={[]}>
              {blackList.map(item => (
                <View key={item.key}>
                  <VanIndexAnchor index={item.title}/>
                  {item.items.map(_item => (
                    <VanCell title={_item.name} key={_item._id} onclick={() => this.handleClickDetail(_item)}/>
                  ))}
                </View>
              ))}
            </VanIndexBar>}
        </View>
        <CustomTabBar/>
      </View>
    )
  }
  
  handleClickDetail (detail) {
    const { dispatch } = this.props
    dispatch({ type: 'black_detail/saveFetch', payload: { detail } })
    navigateTo({ url: '/pages/blackDetail/index' })
  }
}

export default connect(({ home, loading }) => ({
  ...home,
  loading
}), null, null, { forwardRef: true })(Index)
