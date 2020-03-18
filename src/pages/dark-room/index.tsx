import React, { useEffect } from 'react'
import { View } from 'remax/wechat'
import Msg from 'weui-miniprogram/miniprogram_dist/msg/msg'

export default () => {
  useEffect(() => {
    wx.hideHomeButton()
  }, [])
  return (<Msg type="warn" title="小黑屋">
    <View slot="desc">您可能因滥用小程序被加入了黑名单，如有误封，请联系我！</View>
    <View slot="footer">
      <View className="weui-footer__text">Copyright © liujiayii@foxmail.com</View>
    </View>
  </Msg>)
}