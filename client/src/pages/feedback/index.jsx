import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Notify from '../../@vant/notify/notify'
import { AtTextarea, AtButton, AtForm, AtModal } from 'taro-ui'

@connect(({ feedback, loading }) => ({
  ...feedback,
  loading
}), (dispatch) => ({
  handleChange (feedback) {
    dispatch({ type: 'feedback/saveState', payload: { feedback } })
  },
  onSubmit (feedback) {
    if (feedback.length === 0) {
      Notify({ type: 'warning', message: '请输入内容' })
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
    navigationBarTitleText: '留言',
    usingComponents: {
      'van-search': '/@vant/search/index',
      'van-button': '/@vant/button/index',
      'van-cell': '/@vant/cell/index',
      'van-cell-group': '/@vant/cell-group/index',
      'van-divider': '/@vant/divider/index',
      'van-loading': '/@vant/loading/index',
      'van-field': '/@vant/field/index'
    }
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
        <van-notify id='van-notify'/>
        <View className='page-content'>
          <AtForm onSubmit={() => onSubmit(feedback)}>
            <AtTextarea value={feedback} onChange={e => handleChange(e.target.value)} maxLength={200}
                        placeholder='我要留言...'/>
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <AtButton loading={loading.effects['feedback/submit']} type='primary'
                      formType='submit'>提交</AtButton>
          </AtForm>
          <van-cell-group>
            <van-field size='large' maxlength={10} value={feedback} type='textarea' placeholder='我要留言...' autosize/>
          </van-cell-group>
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
