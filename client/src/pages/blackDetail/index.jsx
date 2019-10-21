import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtDivider, AtTimeline, AtLoadMore, AtCard, AtTextarea, AtButton, AtForm, AtMessage, AtModal, } from 'taro-ui'

@connect(({ black,black_detail,loading }) => ({
  ...black,
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
  handleSubmit (rate,{_id},currentPage) {
    dispatch({ type: 'black_detail/submit', payload: { rate,_id,currentPage } })
  },
  handleClose () {
    dispatch({ type: 'black_detail/saveAction', payload: { actionShow: false } })
  },
}))
export default class BlackDetail extends Component {

  config = {
    navigationBarTitleText: '详细信息'
  }

  componentDidShow () {
    this.props.handleChangeRate('')
    this.props.handleClose()
  }

  render () {
    const {blackList,blackIndex,currentPage, rate,handleChangeRate,loading,onSubmit,actionShow,handleClose,handleSubmit } = this.props
    const detail = blackList[blackIndex]||{rate:[]}
    return (
      <View>
        <AtMessage/>
        <AtCard note={detail.time} title={detail.name}>
          {detail.info}
        </AtCard>
        <View className='page-content'>
          <AtDivider content='网友点评' />
          <View>
            {detail.rate.map((item, index) => (
              <AtTimeline key={index} items={[{title: item}]}/>
            ))}
            {detail.rate.length===0&&<AtLoadMore status='noMore'/>}
          </View>
          <AtForm onSubmit={() => onSubmit(rate)}>
            <AtTextarea
              value={rate}
              onChange={(e) => handleChangeRate(e.target.value)}
              maxLength={200}
              placeholder='我要点评...'
            />
            <AtButton className='submit-btn' loading={loading.effects['black_detail/submit']} type='primary' formType='submit'>提交</AtButton>
          </AtForm>
          <AtModal title='提示'
                   content='是否确认提交？'
                   isOpened={actionShow} cancelText='取消'
                   onClose={handleClose}
                   onCancel={handleClose}
                   onConfirm={() => handleSubmit(rate,detail,currentPage)}
                   confirmText='确认'/>
        </View>
      </View>
    )
  }
}
