import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Notify from '../../@vant/notify/notify'
import Dialog from '../../@vant/dialog/dialog'

@connect(({ black_detail, loading }) => ({
  ...black_detail,
  loading
}), (dispatch) => ({
  handleChangeRate (rate) {
    dispatch({ type: 'black_detail/saveRate', payload: { rate } })
  },
  handleSubmit (rate, { _id }) {
    if (rate.length === 0) {
      Notify({ type: 'warning', message: '请输入内容' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        dispatch({ type: 'black_detail/submit', payload: { father: _id, content: rate } })
      }).catch(() => {
        // on cancel
      })
    }
  },
  getRateList (_id) {
    dispatch({ type: 'black_detail/getRateList', payload: { _id } })
  }
}))
export default class BlackDetail extends Component {

  config = {
    navigationBarTitleText: '详细信息',
    usingComponents: {
      'van-button': '/@vant/button/index',
      'van-cell-group': '/@vant/cell-group/index',
      'van-cell': '/@vant/cell/index',
      'van-divider': '/@vant/divider/index',
      'van-field': '/@vant/field/index',
      'van-notify': '/@vant/notify/index',
      'van-dialog': '/@vant/dialog/index',
      'van-panel': '/@vant/panel/index',
    }
  }

  componentDidMount () {
    const { getRateList, detail } = this.props
    getRateList(detail['_id'])
  }

  componentWillUnmount () {
    const { handleChangeRate, dispatch } = this.props
    handleChangeRate('')
    dispatch({ type: 'black_detail/saveState', payload: { rateList: [] } })
  }

  render () {
    const { detail, rateList, rate, handleChangeRate, loading, handleSubmit } = this.props
    return (
      <View className='black-detail'>
        <van-notify id='van-notify' />
        <van-dialog id='van-dialog' />
        <van-panel title={detail.name} desc={detail.time} use-footer-slot>
          <View className='black-content'>{detail.info}</View>
          <view slot='footer'>
            <van-divider contentPosition='center' textColor='#1989fa'>网友点评</van-divider>
            <View>
              {rateList.map(item => (
                <van-cell key={item._id} title={item.content} border={false} />
              ))}
              {loading.effects['black_detail/getRateList'] &&
              <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <van-loading size='24px' color='#1989fa'>加载中...</van-loading>
              </View>}
              {rateList.length === 0 && <van-divider contentPosition='center'>没有更多了</van-divider>}
            </View>
          </view>
        </van-panel>
        <View className='page-content'>
          <van-cell-group>
            <van-field value={rate} type='textarea' placeholder='我要点评...'
              autosize onChange={e => handleChangeRate(e.detail)}
            />
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <van-button loading={loading.effects['black_detail/submit']} block type='info'
              onclick={() => handleSubmit(rate, detail)}
            >提交
            </van-button>
          </van-cell-group>
        </View>
      </View>
    )
  }
}
