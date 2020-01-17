import React from 'react'
import { View } from 'remax/wechat'
import {
  SpecialTip,
  VanDialog,
  VanNotify,
  VanCellGroup,
  VanButton,
  VanField
} from '@/components'

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
          <VanField label='公司名称' value={state.name} type='text' placeholder='请输入公司名称...'
                    onchange={e => changeState({ name: e.detail })}/>
          <VanField value={state.info} type='textarea' placeholder='该公司不合理的地方...' autosize
                    onchange={e => changeState({ info: e.detail })}/>
          <SpecialTip url={'/pages/statement/index'}/>
          <VanButton loading={loading.submit} block type='info' onclick={submit}>提交</VanButton>
        </VanCellGroup>
      </View>
    </View>
  )
}
