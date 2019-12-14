import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { shareInfo } from '../../utils/utils'

@connect(({ black, loading }) => ({
  ...black,
  loading
}), (dispatch) => ({
  onPageChange (current = 1) {
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
    dispatch({ type: 'black/fetch', payload: { current } })
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
  onActionClick () {
    dispatch({ type: 'black/Search' })
  }
}))
export default class Black extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    usingComponents: {
      'van-notice-bar': '@vant/weapp/dist/notice-bar/index',
      'van-search': '@vant/weapp/dist/search/index',
      'van-button': '@vant/weapp/dist/button/index',
      'van-cell': '@vant/weapp/dist/cell/index',
      'van-cell-group': '@vant/weapp/dist/cell-group/index',
      'van-divider': '@vant/weapp/dist/divider/index',
      'van-loading': '@vant/weapp/dist/loading/index'
    }
  }

  componentDidMount () {
    this.props.onGetCount()
    this.props.onPageChange()
  }

  onPullDownRefresh () {
    this.props.onChangeSearch('')
    this.props.onGetCount()
    this.props.onPageChange()
  }

  onShareAppMessage () {
    return shareInfo
  }

  render () {
    const { searchVal, loading, total, pageSize, currentPage, blackList, onPageChange, handleClickDetail, onChangeSearch, onActionClick } = this.props

    return (
      <View className='index'>
        <van-notice-bar
          mode='closeable'
          text='如果你觉得小程序做的还不错，点击右上角的按钮，添加到“我的小程序”，或者分享给你身边的IT从业者'
        />
        <View>
          <van-search
            value={searchVal}
            placeholder='输入公司名称搜索'
            use-action-slot
            onChange={e => onChangeSearch(e.detail)}
            onSearch={() => onActionClick()}
          >
            <View slot='action' ontap={() => onActionClick()}>
              <van-button type='info' size='small'>搜索</van-button>
            </View>
          </van-search>
          {(loading.effects['black/fetch'] || loading.effects['black/Search']) &&
          <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <van-loading size='24px' color='#1989fa'>加载中...</van-loading>
          </View>
          }
          <van-cell-group>
            {blackList.map(item => (
              item.checked && <van-cell key={item._id} title={item.name} is-link label={item.time}
                                        onClick={() => handleClickDetail(item)}/>
            ))}
          </van-cell-group>
          {(blackList.length === 0) && <van-divider contentPosition='center'>没有更多了</van-divider>}
          <View style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <van-button type='info' size='small' onclick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}>上一页
            </van-button>
            <View><Text style={{ color: '#1989fa' }}>{currentPage}</Text>/{Math.ceil(total / pageSize)}</View>
            <van-button type='info' size='small' onclick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(total / pageSize)}>下一页
            </van-button>
          </View>
        </View>
      </View>
    )
  }
}
