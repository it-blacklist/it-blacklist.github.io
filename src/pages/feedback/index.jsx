import React, { Component } from 'react'
import { View, Text, Navigator } from 'remax/wechat'
import { connect } from 'remax-dva'
import Notify from '@vant/weapp/dist/notify/notify'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import VanButton from '@vant/weapp/dist/button'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanDialog from '@vant/weapp/dist/dialog'
import VanNotify from '@vant/weapp/dist/notify'
import VanField from '@vant/weapp/dist/field'

class Feedback extends Component {
  componentWillUnmount () {
    this.props.clearForm()
  }

  render () {
    const { feedback, handleChange, loading, handleSubmit } = this.props
    return (
      <View>
        <VanNotify id='van-notify'/>
        <VanDialog id='van-dialog'/>
        <View className='page-content'>
          <VanCellGroup>
            <VanField value={feedback} type='textarea' placeholder='我要留言...'
                      autosize onchange={e => handleChange(e.detail)}/>
            <View className='tip'>
              <View><Text className='red'>*特别提示</Text>
                <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
              </View>
            </View>
            <VanButton loading={loading.effects['feedback/submit']} block type='info'
                       onclick={() => handleSubmit(feedback)}>提交
            </VanButton>
          </VanCellGroup>
        </View>
      </View>
    )
  }
}

export default connect(({ feedback, loading }) => ({
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
  clearForm () {
    dispatch({ type: 'feedback/saveState', payload: { feedback: '' } })
  }
}))(Feedback)
