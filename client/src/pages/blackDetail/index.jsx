import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
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
  handleSubmit (rate,{_id}) {
    dispatch({ type: 'black_detail/submit', payload:{father:_id,content:rate} })
  },
  handleClose () {
    dispatch({ type: 'black_detail/saveAction', payload: { actionShow: false } })
  },
  getRateList(_id){
    dispatch({ type: 'black_detail/getRateList', payload: { _id } })
  }
}))
export default class BlackDetail extends Component {

  config = {
    navigationBarTitleText: '详细信息'
  }

  componentDidMount () {
    const {getRateList,blackList,blackIndex}=this.props
    getRateList(blackList[blackIndex]['_id'])
  }

  componentWillUnmount () {
    const {handleChangeRate,handleClose,dispatch} = this.props
    handleChangeRate('')
    handleClose()
    dispatch({type:'black_detail/saveState',payload:{rateList:[]}})
  }

  render () {
    const {blackList,blackIndex,rateList, rate,handleChangeRate,loading,onSubmit,actionShow,handleClose,handleSubmit } = this.props
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
            {rateList.map((item, index) => (
              <AtTimeline key={index} items={[{title: item.content}]}/>
            ))}
            {loading.effects['black_detail/getRateList']&&<AtLoadMore status='loading'/>}
            {rateList.length===0&&<AtLoadMore status='noMore'/>}
          </View>
          <AtForm onSubmit={() => onSubmit(rate)}>
            <AtTextarea
              value={rate}
              onChange={(e) => handleChangeRate(e.target.value)}
              maxLength={200}
              placeholder='我要点评...'
            />
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>所有操作均为匿名，未记录任何个人信息，源码公布在GitHub，请放心提交。</View>
              <View>请勿发表任何违反<Text className='red'>微信小程序内容安全要求规范</Text>的内容</View>
              <View>稍后会由人工审核通过后发布~</View>
            </View>
            <AtButton className='submit-btn' loading={loading.effects['black_detail/submit']} type='primary' formType='submit'>提交</AtButton>
          </AtForm>
          <AtModal title='提示'
                   content='是否确认提交？'
                   isOpened={actionShow} cancelText='取消'
                   onClose={handleClose}
                   onCancel={handleClose}
                   onConfirm={() => handleSubmit(rate,detail)}
                   confirmText='确认'/>
        </View>
      </View>
    )
  }
}
