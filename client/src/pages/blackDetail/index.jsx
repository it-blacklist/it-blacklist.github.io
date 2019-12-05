import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtDivider, AtTimeline, AtLoadMore, AtCard, AtTextarea, AtButton, AtForm, AtMessage, AtModal, } from 'taro-ui'

@connect(({ black_detail, loading }) => ({
  ...black_detail,
  loading
}), (dispatch) => ({
  handleChangeRate (rate) {
    dispatch({ type: 'black_detail/saveRate', payload: { rate } })
  },
  onSubmit (rate) {
    if (rate.length === 0) {
      Taro.atMessage({ message: '请补全信息后再提交', type: 'warning' })
    } else {
      dispatch({ type: 'black_detail/saveAction', payload: { actionShow: true } })
    }
  },
  handleSubmit (rate, { _id }) {
    dispatch({ type: 'black_detail/submit', payload: { father: _id, content: rate } })
  },
  handleClose () {
    dispatch({ type: 'black_detail/saveAction', payload: { actionShow: false } })
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
      'van-divider': '/@vant/divider/index',
      'van-field': '/@vant/field/index',
      'van-notify': '/@vant/notify/index',
      'van-dialog': '/@vant/dialog/index',
      "van-panel": "/@vant/panel/index"
    }
  }
  
  componentDidMount () {
    const { getRateList, detail } = this.props
    getRateList(detail['_id'])
  }
  
  componentWillUnmount () {
    const { handleChangeRate, handleClose, dispatch } = this.props
    handleChangeRate('')
    handleClose()
    dispatch({ type: 'black_detail/saveState', payload: { rateList: [] } })
  }
  
  render () {
    const { detail, rateList, rate, handleChangeRate, loading, onSubmit, actionShow, handleClose, handleSubmit } = this.props
    return (
      <View>
        <AtMessage/>
        <AtCard note={detail.time} title={detail.name}>
          {detail.info}
        </AtCard>
        <van-panel title={detail.name} desc={detail.time} use-footer-slot>
          <view>{detail.info}</view>
          <view slot="footer">
            <van-button size="small">按钮</van-button>
            <van-button size="small" type="danger">按钮</van-button>
          </view>
        </van-panel>
        <View className='page-content'>
          <AtDivider content='网友点评'/>
          <View>
            {rateList.map((item, index) => (
              <AtTimeline key={index} items={[{ title: item.content }]}/>
            ))}
            {loading.effects['black_detail/getRateList'] && <AtLoadMore status='loading'/>}
            {rateList.length === 0 && <AtLoadMore status='noMore'/>}
          </View>
          <AtForm onSubmit={() => onSubmit(rate)}>
            <AtTextarea
              value={rate}
              onChange={(e) => handleChangeRate(e.target.value)}
              maxLength={200}
              placeholder='我要点评...'
            />
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <AtButton loading={loading.effects['black_detail/submit']} type='primary'
                      formType='submit'>提交</AtButton>
          </AtForm>
          <AtModal title='提示'
                   content='是否确认提交？'
                   isOpened={actionShow} cancelText='取消'
                   onClose={handleClose}
                   onCancel={handleClose}
                   onConfirm={() => handleSubmit(rate, detail)}
                   confirmText='确认'/>
        </View>
      </View>
    )
  }
}
