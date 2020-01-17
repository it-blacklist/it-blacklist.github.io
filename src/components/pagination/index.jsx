import React from 'react'
import { Text, View, Picker } from 'remax/wechat'
import VanButton from '@vant/weapp/dist/button'

export default function ({ pagination: { current, total, pageSize }, onPageChange }) {
  const totalPage = Math.ceil(total / pageSize)

  const multiArray = [[], []]
  const multiIndex = [0, 0]
  for (let i = 0; i < Math.ceil(totalPage / 10); i++) {
    multiArray[0].push(`${i * 10 + 1}-${(i + 1) * 10}页`)
  }
  const pushSecondArray = index => {
    for (let i = 0; i < totalPage - (index * 10); i++) {
      multiArray[1].push(`第${index * 10 + i + 1}页`)
    }
  }
  pushSecondArray(0)
  const pickerChange = (e) => {
    multiIndex[e.detail.column] = e.detail.value
    pushSecondArray(e.detail.column)
  }
  const pickerConfirm = e => {
    onPageChange(e.detail.value[0] * 10 + e.detail.value[1] + 1)
  }

  return (
    <View style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <VanButton type='info' size='small' onclick={() => onPageChange(--current)}
                 disabled={current === 1}>上一页
      </VanButton>
      <Picker mode="multiSelector" bindchange={pickerConfirm} bindcolumnchange={pickerChange}
              value={multiIndex} range={multiArray}>
        <View className="picker">
          <Text style={{ color: '#1989fa', lineHeight: '60px' }}>{current}</Text>/{totalPage}
        </View>
      </Picker>
      <VanButton type='info' size='small' onclick={() => onPageChange(++current)}
                 disabled={current === totalPage}>下一页
      </VanButton>
    </View>
  )
}
