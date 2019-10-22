import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtLoadMore, AtList, AtListItem, AtSearchBar, AtPagination, AtButton } from 'taro-ui'

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
  handleClickDetail (blackIndex) {
    dispatch({ type: 'black_detail/saveFetch', payload:{blackIndex} })
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
    this.props.onChangeSearch('')
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
            placeholder='输入公司名称搜索'
            value={searchVal}
            onChange={onChangeSearch}
            onActionClick={() => onActionClick(searchVal)}
          />
          {(loading.effects['black/fetch'] || loading.effects['black/Search']) && <AtLoadMore status='loading'/>}
          <AtList>
            {blackList.map((item,index) => (
              item.checked&&<AtListItem key={item._id} arrow='right' note={item.time} title={item.name}
                          onClick={() => handleClickDetail(index)}/>
            ))}
          </AtList>
          {(blackList.length === 0) && <AtLoadMore status='noMore'/>}
          <AtPagination className='black-pagination' total={total} pageSize={pageSize}
                        current={currentPage} onPageChange={onPageChange}/>
          <AtButton circle type='primary'
                    onClick={() => Taro.navigateTo({ url: '/pages/blackNew/index' })}>贡献一条黑名单数据</AtButton>
        </View>
      </View>
    )
  }
}
