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

class BlackNew extends Component {
  componentWillUnmount () {
    this.props.clearForm()
  }

  render () {
    const { loading, name, info, handleChange, handleSubmit } = this.props
    return (
      <View className='page-content'>
        <VanNotify id='van-notify'/>
        <VanDialog id='van-dialog'/>
        <VanCellGroup>
          <VanField label='公司名称' value={name} type='text' placeholder='请输入公司名称...'
                    onchange={e => handleChange(e.detail, 'name')}/>
          <VanField value={info} type='textarea' placeholder='该公司不合理的地方...' autosize
                    onchange={e => handleChange(e.detail, 'info')}/>
          <View className='tip'>
            <View><Text className='red'>*特别提示</Text>
              <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
            </View>
          </View>
          <VanButton loading={loading.effects['black_new/submit']} block type='info'
                     onclick={() => handleSubmit(name, info)}>提交
          </VanButton>
        </VanCellGroup>
      </View>
    )
  }
}

export default connect(({ black_new, loading }) => ({
  ...black_new,
  loading
}), (dispatch) => ({
  handleSubmit (name, info) {
    if (!name || !info) {
      Notify({ type: 'warning', message: '请补全信息后再提交' })
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否确认提交？'
      }).then(() => {
        dispatch({ type: 'black_new/submit', payload: { name, info } })
      }).catch(() => {})
    }
  },
  handleChange (value, label) {
    dispatch({ type: 'black_new/saveState', payload: { [label]: value } })
  },
  clearForm () {
    dispatch({ type: 'black_new/saveState', payload: { name: '', info: '' } })
  }
}))(BlackNew)
