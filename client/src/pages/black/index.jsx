import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtLoadMore, AtList, AtListItem, AtSearchBar, AtPagination, AtNoticebar } from 'taro-ui'
import { shareInfo } from '../../utils/utils'

@connect(({ black, loading }) => ({
  ...black,
  loading
}), (dispatch) => ({
  onPageChange (payload) {
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
    dispatch({ type: 'black/fetch', payload })
  },
  onGetCount () {
    dispatch({ type: 'black/getCount' })
  },
  handleClickDetail (detail) {
    dispatch({ type: 'black_detail/saveFetch', payload: { detail } })
    Taro.navigateTo({ url: '/pages/blackDetail/index' })
  },
  onChangeSearch (searchVal) {
    dispatch({ type: 'black/saveSearchVal', payload: { searchVal } })
  },
  onActionClick (name) {
    dispatch({ type: 'black/Search', payload: { name } })
  }
}))
export default class Black extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }
  
  componentDidMount () {
    console.log(this.props)
    this.props.onGetCount()
    this.props.onPageChange({ current: 1 })
  }
  
  onPullDownRefresh () {
    this.props.onChangeSearch('')
    this.props.onGetCount()
    this.props.onPageChange({ current: 1 })
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 500)
  }
  
  onShareAppMessage () {
    return shareInfo()
  }
  
  render () {
    const { searchVal, loading, total, pageSize, currentPage, blackList, onPageChange, handleClickDetail, onChangeSearch, onActionClick } = this.props
    
    return (
      <View className='index'>
        <AtNoticebar close>
          如果你觉得小程序做的还不错，点击右上角的<View className='iconfont icon-more'/>按钮，添加到“我的小程序”，或者分享给你身边的IT从业者
        </AtNoticebar>
        <View>
          <AtSearchBar
            actionName='搜一下'
            placeholder='输入公司名称搜索'
            value={searchVal}
            onChange={onChangeSearch}
            onActionClick={() => onActionClick(searchVal)}
          />
          {(loading.effects['black/fetch'] || loading.effects['black/Search']) && <AtLoadMore status='loading'/>}
          <AtList>
            {blackList.map((item, index) => (
              item.checked && <AtListItem key={item._id} arrow='right' note={item.time} title={item.name}
                                          onClick={() => handleClickDetail(item)}/>
            ))}
          </AtList>
          {(blackList.length === 0) && <AtLoadMore status='noMore'/>}
          <AtPagination className='black-pagination' total={total} pageSize={pageSize}
                        current={currentPage} onPageChange={onPageChange}/>
        </View>
      </View>
    )
  }
}
