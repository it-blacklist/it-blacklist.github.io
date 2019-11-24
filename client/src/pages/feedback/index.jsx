import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTextarea, AtButton, AtForm, AtMessage, AtModal } from 'taro-ui'

@connect(({ feedback, loading }) => ({
  ...feedback,
  loading
}), (dispatch) => ({
  handleChange (feedback) {
    dispatch({ type: 'feedback/saveState', payload: { feedback } })
  },
  onSubmit (feedback) {
    if (feedback.length === 0) {
      Taro.atMessage({ message: '请输入内容', type: 'warning' })
    } else {
      dispatch({ type: 'feedback/saveState', payload: { actionShow: true } })
    }
  },
  handleSubmit (feedback) {
    dispatch({ type: 'feedback/submit', payload: { feedback } })
  },
  handleClose () {
    dispatch({ type: 'feedback/saveState', payload: { actionShow: false } })
  },
}))
export default class Feedback extends Component {
  
  config = {
    navigationBarTitleText: '留言'
  }
  
  componentWillUnmount () {
    const { handleChange, handleClose } = this.props
    handleChange('')
    handleClose()
  }
  
  render () {
    const { feedback, handleChange, loading, onSubmit, actionShow, handleClose, handleSubmit } = this.props
    return (
      <View>
        <AtMessage/>
        <View className='page-content'>
          <AtForm onSubmit={() => onSubmit(feedback)}>
            <AtTextarea value={feedback} onChange={e => handleChange(e.target.value)} maxLength={200} placeholder='我要留言...'/>
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <AtButton loading={loading.effects['feedback/submit']} type='primary'
                      formType='submit'>提交</AtButton>
          </AtForm>
          <AtModal title='提示'
                   content='是否确认提交？'
                   isOpened={actionShow} cancelText='取消'
                   onClose={handleClose}
                   onCancel={handleClose}
                   onConfirm={() => handleSubmit(feedback)}
                   confirmText='确认'/>
        </View>
      </View>
    )
  }
}
