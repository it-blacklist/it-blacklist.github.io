import React from 'react'
import { View } from 'remax/wechat'
import Loading from 'weui-miniprogram/miniprogram_dist/loading/loading'

export default ({ type }: { type: 'loading' | 'noMore' }) => {
  switch (type) {
    case 'loading':
      return <Loading type='circle'/>
    case 'noMore':
      return <View className="weui-loadmore weui-loadmore_line">
        <View className="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</View>
      </View>
    default:
      return <Loading type='circle'/>
  }
}

