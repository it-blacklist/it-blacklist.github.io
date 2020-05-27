import React, { useEffect } from 'react'
import { View, Button, showToast, hideHomeButton } from 'remax/wechat'
import Msg from 'weui-miniprogram/miniprogram_dist/msg/msg'

const bindGetUserInfo = () => {
  showToast({
    icon: 'success',
    title: '授权成功！'
  })
}

export default () => {
  useEffect(() => {
    hideHomeButton()
  }, [])
  return (<View data-weui-theme="light"><Msg type="warn" title="授权">
    <View slot="desc">请先授权小程序使用您的个人信息，以继续使用。
      <Button type='primary' style={{ marginTop: 40 }} open-type="getUserInfo" onGetUserInfo={()=>bindGetUserInfo()}>授权</Button>
    </View>
    <View slot="footer">
      <View className="weui-footer__text">Copyright © liujiayii@foxmail.com</View>
    </View>
  </Msg></View>)
}
