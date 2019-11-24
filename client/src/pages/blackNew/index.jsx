import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtTextarea, AtModal, AtMessage } from 'taro-ui'

@connect(({ black_new, loading }) => ({
  ...black_new,
  loading
}), (dispatch) => ({
  onSubmit (name, info) {
    if (name.length === 0 || info.length === 0) {
      Taro.atMessage({ message: '请补全信息后再提交', type: 'warning' })
    } else {
      dispatch({ type: 'black_new/saveAction', payload: { actionShow: true } })
    }
  },
  handleChangeName (name) {
    dispatch({ type: 'black_new/saveName', payload: { name } })
  },
  handleChangeInfo (info) {
    dispatch({ type: 'black_new/saveInfo', payload: { info } })
  },
  handleClose () {
    dispatch({ type: 'black_new/saveAction', payload: { actionShow: false } })
  },
  handleSubmit (name, info) {
    dispatch({ type: 'black_new/submit', payload: { name, info } })
  }
}))
export default class BlackNew extends Component {
  
  config = {
    navigationBarTitleText: '添加黑名单'
  }
  
  componentWillUnmount () {
    this.props.handleClose()
    this.props.handleChangeName('')
    this.props.handleChangeInfo('')
  }
  
  render () {
    const { loading, name, info, actionShow, onSubmit, handleChangeName, handleChangeInfo, handleClose, handleSubmit } = this.props
    return (
      <View className='page-content'>
        <AtMessage/>
        <AtForm onSubmit={() => onSubmit(name, info)}>
          <AtInput name='name' title='公司名称:' placeholder='请输入公司名称...' type='text' value={name}
                   onChange={handleChangeName}/>
          <View style={{ padding: '6px' }}/>
          <AtTextarea value={info} onChange={(e) => handleChangeInfo(e.target.value)}
                      maxLength={200}
                      placeholder='该公司不合理的地方...'/>
          <View className='tip'>
            <View>
              <Text className='red'>*特别提示</Text>
              <Navigator className='navigator' url='/pages/statement/index'>请先阅读特别声明</Navigator></View>
          </View>
          <AtButton loading={loading.effects['black/submit']} type='primary' formType='submit'>提交</AtButton>
        </AtForm>
        <AtModal title='提示'
                 content='是否确认提交？'
                 isOpened={actionShow} cancelText='取消'
                 onClose={handleClose}
                 onCancel={handleClose}
                 onConfirm={() => handleSubmit(name, info)}
                 confirmText='确认'/>
      </View>
    )
  }
}
