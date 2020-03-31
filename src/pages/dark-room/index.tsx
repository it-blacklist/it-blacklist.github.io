import React, { useEffect } from 'react'
import { View, Button, showToast, hideHomeButton } from 'remax/wechat'
import Msg from 'weui-miniprogram/miniprogram_dist/msg/msg'

export default () => {
  useEffect(() => {
    hideHomeButton()
  }, [])
  const bindGetUserInfo = () => {
    showToast({
      icon: 'success',
      title: '申诉成功！'
    })
  }
  return (<Msg type="warn" title="小黑屋">
    <View slot="desc">您可能因滥用小程序被加入了黑名单，如有误封，请点击下方按钮申诉！
      <Button style={{ marginTop: 40 }} open-type="getUserInfo" onGetUserInfo={bindGetUserInfo}>申诉</Button>
    </View>
    <View slot="footer">
      <View className="weui-footer__text">Copyright © liujiayii@foxmail.com</View>
    </View>
  </Msg>)
}
