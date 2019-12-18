import React, { Component } from 'react'
import { connect } from 'remax-dva'
import { View, Text, pageScrollTo, navigateTo } from 'remax/wechat'
import { shareInfo } from '../../utils/utils'
import VanNoticeBar from '@vant/weapp/dist/notice-bar'
import VanSearch from '@vant/weapp/dist/search'
import VanButton from '@vant/weapp/dist/button'
import VanLoading from '@vant/weapp/dist/loading'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDivider from '@vant/weapp/dist/divider'
class Black extends Component {
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
        <VanNoticeBar
          mode='closeable'
          text='如果你觉得小程序做的还不错，点击右上角的按钮，添加到“我的小程序”，或者分享给你身边的IT从业者'
        />
        <View>
          <VanSearch
            value={searchVal}
            placeholder='输入公司名称搜索'
            use-action-slot
            onchange={e => onChangeSearch(e.detail)}
            onsearch={() => onActionClick()}
          >
            <View slot='action' ontap={() => onActionClick()}>
              <VanButton type='info' size='small'>搜索</VanButton>
            </View>
          </VanSearch>
          {(loading.effects['black/fetch'] || loading.effects['black/Search']) &&
          <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
          </View>
          }
          <VanCellGroup>
            {blackList.map(item => (
              item.checked && <VanCell key={item._id} title={item.name} is-link label={item.time}
                                       onclick={() => handleClickDetail(item)}/>
            ))}
          </VanCellGroup>
          {(blackList.length === 0) && <VanDivider contentPosition='center'>没有更多了</VanDivider>}
          <View style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <VanButton type='info' size='small' onclick={() => onPageChange(currentPage - 1)}
                       disabled={currentPage === 1}>上一页
            </VanButton>
            <View><Text style={{ color: '#1989fa' }}>{currentPage}</Text>/{Math.ceil(total / pageSize)}</View>
            <VanButton type='info' size='small' onclick={() => onPageChange(currentPage + 1)}
                       disabled={currentPage === Math.ceil(total / pageSize)}>下一页
            </VanButton>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(({ black, loading }) => ({
  ...black,
  loading
}), (dispatch) => ({
  onPageChange (current = 1) {
    pageScrollTo({ scrollTop: 0, duration: 300 })
    dispatch({ type: 'black/fetch', payload: { current } })
  },
  onGetCount () {
    dispatch({ type: 'black/getCount' })
  },
  handleClickDetail (detail) {
    dispatch({ type: 'black_detail/saveFetch', payload: { detail } })
    navigateTo({ url: '/pages/blackDetail/index' })
  },
  onChangeSearch (searchVal) {
    dispatch({ type: 'black/saveSearchVal', payload: { searchVal } })
  },
  onActionClick () {
    dispatch({ type: 'black/Search' })
  }
}), null, { forwardRef: true })(Black)
