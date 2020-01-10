import React from 'react'
import { View } from 'remax/wechat'
import VanButton from '@vant/weapp/dist/button'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanDialog from '@vant/weapp/dist/dialog'
import VanNotify from '@vant/weapp/dist/notify'
import VanField from '@vant/weapp/dist/field'
import SpecialTip from '@/components/special-tip'
import hooks from './hooks'

export default function () {
  const [state, setState, loading, submit] = hooks()
  const changeState = newState => {
    setState({ ...state, ...newState })
  }
  return (
    <View>
      <VanNotify id='van-notify'/>
      <VanDialog id='van-dialog'/>
      <View className='page-content'>
        <VanCellGroup>
          <VanField value={state.feedback} type='textarea' placeholder='我要留言...'
                    onchange={e => changeState({ feedback: e.value })}/>
          <SpecialTip url={'/pages/statement/index'}/>
          <VanButton loading={loading.submit} block type='info' onclick={submit}>提交</VanButton>
        </VanCellGroup>
      </View>
    </View>
  )
}
