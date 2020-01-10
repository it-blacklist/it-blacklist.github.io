import React from 'react'
import { Text, View } from 'remax/wechat'
import VanButton from '@vant/weapp/dist/button'

export default function ({ pagination: { current, total, pageSize }, onPageChange }) {
  const totalPage = Math.ceil(total / pageSize)
  return (
    <View style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <VanButton type='info' size='small' onclick={() => onPageChange(current - 1)}
                 disabled={current === 1}>上一页
      </VanButton>
      <View>
        <Text style={{ color: '#1989fa' }}>{current}</Text>/{totalPage}
      </View>
      <VanButton type='info' size='small' onclick={() => onPageChange(current + 1)}
                 disabled={current === totalPage}>下一页
      </VanButton>
    </View>
  )
}
