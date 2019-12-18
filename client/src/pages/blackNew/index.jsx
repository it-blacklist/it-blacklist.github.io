import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Notify from '../../@vant/notify/notify'
import Dialog from '../../@vant/dialog/dialog'

@connect(({ black_new, loading }) => ({
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
      }).catch(() => {
        // on cancel
      })
    }
  },
  handleChange (value, label) {
    dispatch({ type: 'black_new/saveState', payload: { [label]: value } })
  },
}))
export default class BlackNew extends Component {
  
  config = {
    navigationBarTitleText: '添加黑名单',
    usingComponents: {
      'van-button': '/@vant/button/index',
      'van-cell': '/@vant/cell/index',
      'van-cell-group': '/@vant/cell-group/index',
      'van-divider': '/@vant/divider/index',
      'van-loading': '/@vant/loading/index',
      'van-field': '/@vant/field/index',
      'van-notify': '/@vant/notify/index',
      'van-dialog': '/@vant/dialog/index'
    }
  }
  
  componentWillUnmount () {
    this.props.dispatch({ type: 'black_new/saveState', payload: { name: '' } })
    this.props.dispatch({ type: 'black_new/saveState', payload: { info: '' } })
  }
  
  render () {
    const { loading, name, info, handleChange, handleSubmit } = this.props
    return (
      <View className='page-content'>
        <van-notify id='van-notify'/>
        <van-dialog id='van-dialog'/>
        <van-cell-group>
          <van-field label='公司名称' value={name} type='text' placeholder='请输入公司名称...'
                     onChange={e => handleChange(e.detail, 'name')}/>
          <van-field value={info} type='textarea' placeholder='该公司不合理的地方...' autosize
                     onChange={e => handleChange(e.detail, 'info')}/>
          <View className='tip'>
            <View><Text className='red'>*特别提示</Text>
              <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator>
            </View>
          </View>
          <van-button loading={loading.effects['black/submit']} block type='info'
                      onclick={() => handleSubmit(name, info)}>提交
          </van-button>
        </van-cell-group>
      </View>
    )
  }
}
