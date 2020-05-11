import React, { useEffect, useState } from 'react'
import { Text, View, Button, Picker } from 'remax/wechat'

interface Pagination {
  current: number;
  total: number;
  pageSize: number;
}

interface PaginationProps {
  pagination: Pagination;
  onPageChange: Function;
}

const getMultiArrOne = (totalPage: number) => {
  const temp = []
  for (let i = 0; i < Math.ceil(totalPage / 10); i++) {
    temp.push(`${i * 10 + 1}-${(i + 1) * 10}页`)
  }
  return temp
}
const getMultiArTwo = (index: number, totalPage: number) => {
  const temp = []
  for (let i = index * 10; i < (index + 1) * 10 && i < totalPage; i++) {
    temp.push(`第${i + 1}页`)
  }
  return temp
}
export default ({ pagination: { current, total, pageSize }, onPageChange }: PaginationProps) => {
  const totalPage = Math.ceil(total / pageSize)
  const [multiArrOne, setMultiArrOne] = useState<Array<string>>([])
  const [multiArrTwo, setMultiArrTwo] = useState<Array<string>>([])
  const [multiIndex, setMultiIndex] = useState<Array<number>>([0, 0])
  useEffect(() => {
    setMultiArrOne(getMultiArrOne(totalPage))
    setMultiArrTwo(getMultiArTwo(0, totalPage))
  }, [totalPage])
  useEffect(() => {
    setMultiArrTwo(getMultiArTwo(multiIndex[0], totalPage))
  }, [multiIndex])
  return (
    <View style={{ margin: '20px 0', display: 'flex' }}>
      <Button type='primary' size='mini' onClick={() => onPageChange(--current)}
              disabled={current === 1}>上一页
      </Button>
      <Picker
        mode="multiSelector"
        onChange={e => onPageChange(e.detail.value[0] * 10 + e.detail.value[1] + 1)}
        onColumnChange={e => {
          const temp = JSON.parse(JSON.stringify(multiIndex))
          temp[e.detail.column] = e.detail.value
          setMultiIndex(temp)
        }}
        value={multiIndex}
        range={[multiArrOne, multiArrTwo]}
      >
        <View className="picker">
          <Text style={{ color: '#1989fa', lineHeight: '30px' }}>{current}</Text>/{totalPage}
        </View>
      </Picker>
      <Button type='primary' size='mini' onClick={() => onPageChange(++current)}
              disabled={current === totalPage}>下一页
      </Button>
    </View>
  )
}
