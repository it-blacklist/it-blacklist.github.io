import React, { Component } from 'react'
import { View, Text, Navigator } from 'remax/wechat'
import { connect } from 'remax-dva'
import Notify from '@vant/weapp/dist/notify/notify'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import VanButton from '@vant/weapp/dist/button'
import VanLoading from '@vant/weapp/dist/loading'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDivider from '@vant/weapp/dist/divider'
import VanDialog from '@vant/weapp/dist/dialog'
import VanNotify from '@vant/weapp/dist/notify'
import VanPanel from '@vant/weapp/dist/panel'
import VanField from '@vant/weapp/dist/field'

class BlackDetail extends Component {
  componentDidMount () {
    const { getRateList, detail } = this.props
    getRateList(detail['_id'])
  }

  componentWillUnmount () {
    const { handleChangeRate, clearRateList } = this.props
    handleChangeRate('')
    clearRateList()
  }

  render () {
    const { detail, rateList, rate, handleChangeRate, loading, handleSubmit } = this.props
    return (
      <View className='black-detail'>
        <VanNotify id='van-notify'/>
        <VanDialog id='van-dialog'/>
        <VanPanel title={detail.name} desc={detail.time} use-footer-slot>
          <View className='black-content'>{detail.info}</View>
          <View slot='footer'>
            <VanDivider contentPosition='center' textColor='#1989fa'>网友点评</VanDivider>
            <View>
              {rateList.map(item => (
                <VanCell key={item._id} title={item.content} border={false}/>
              ))}
              {loading.effects['black_detail/getRateList'] &&
              <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
              </View>}
              {rateList.length === 0 && <VanDivider contentPosition='center'>没有更多了</VanDivider>}
            </View>
          </View>
        </VanPanel>
        <View className='page-content'>
          <VanCellGroup>
            <VanField value={rate} type='textarea' placeholder='我要点评...'
                      autosize onchange={e => handleChangeRate(e.detail)}
            />
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <VanButton loading={loading.effects['black_detail/submit']} block type='info'
                       onclick={() => handleSubmit(rate, detail)}
            >提交
            </VanButton>
          </VanCellGroup>
        </View>
      </View>
    )
  }
}

export default connect(({ black_detail, loading }) => ({
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
  },
  clearRateList () {
    dispatch({ type: 'black_detail/saveState', payload: { rateList: [] } })
  }
}))(BlackDetail)
