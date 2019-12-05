import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Notify from '../../@vant/notify/notify'
import Dialog from '../../@vant/dialog/dialog'

@connect(({ feedback, loading }) => ({
  ...feedback,
  loading
}), (dispatch) => ({
  handleChange (feedback) {
    dispatch({ type: 'feedback/saveState', payload: { feedback } })
  },
  handleSubmit (feedback) {
    if (!feedback) {
      Notify({ type: 'warning', message: '请输入内容' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        dispatch({ type: 'feedback/submit', payload: { feedback } })
      }).catch(() => {
        // on cancel
      })
    }
  },
}))
export default class Feedback extends Component {
  
  config = {
    navigationBarTitleText: '留言',
    usingComponents: {
      'van-button': '/@vant/button/index',
      'van-cell-group': '/@vant/cell-group/index',
      'van-divider': '/@vant/divider/index',
      'van-field': '/@vant/field/index',
      'van-notify': '/@vant/notify/index',
      'van-dialog': '/@vant/dialog/index'
    }
  }
  
  componentWillUnmount () {
    this.props.dispatch({ type: 'feedback/saveState', payload: { feedback: '' } })
  }
  
  render () {
    const { feedback, handleChange, loading, handleSubmit } = this.props
    return (
      <View>
        <van-notify id='van-notify'/>
        <van-dialog id='van-dialog' />
        <View className='page-content'>
          <van-cell-group>
            <van-field value={feedback} type='textarea' placeholder='我要留言...'
                       autosize onChange={e => handleChange(e.detail)}/>
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <van-button loading={loading.effects['feedback/submit']} block type='info'
                        onclick={() => handleSubmit(feedback)}>提交
            </van-button>
          </van-cell-group>
        </View>
      </View>
    )
  }
}
