import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import TabBar from '../../components/tabbar'
import { AtLoadMore, AtList, AtListItem, AtSearchBar, AtPagination } from 'taro-ui'

@connect(({ black, loading }) => ({
  ...black,
  loading
}), (dispatch) => ({
  onPageChange (payload) {
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
    dispatch({ type: 'black/fetch', payload })
  },
  getCount () {
    dispatch({ type: 'black/getCount' })
  },
  handleClickDetail (payload) {
    dispatch({ type: 'black_detail/fetch', payload })
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
    this.props.getCount()
    this.props.onPageChange({ current: 1 })
  }
  
  onPullDownRefresh () {
    this.props.getCount()
    this.props.onPageChange({ current: 1 })
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 500)
  }
  
  render () {
    const { searchVal, loading, total, pageSize, currentPage, blackList, onPageChange, handleClickDetail, onChangeSearch, onActionClick } = this.props
    return (
      <View className='index'>
        <View>
          <AtSearchBar
            actionName='搜一下'
            placeholder='目前仅支持全名搜索'
            value={searchVal}
            onChange={onChangeSearch}
            onActionClick={() => onActionClick(searchVal)}
          />
          {(loading.effects['black/fetch'] || loading.effects['black/Search']) && <AtLoadMore status='loading'/>}
          <AtList>
            {blackList.map((item) => (
              <AtListItem key={item._id} arrow='right' note={item.time} title={item.name}
                          onClick={() => handleClickDetail(item)}/>
            ))}
          </AtList>
          {(blackList.length === 0) && <AtLoadMore status='noMore'/>}
          <AtPagination className='black-pagination' total={total} pageSize={pageSize}
                        current={currentPage} onPageChange={onPageChange}/>
        </View>
        <TabBar/>
      </View>
    )
  }
}
