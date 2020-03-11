import React from 'react'
import { Navigator, View } from 'remax/wechat'

export default () => (
  <View className="weui-form__tips-area">
    <View className="weui-form__tips">
      点击提交即表示
      <Navigator url='/pages/Statement/index'>阅读并同意用户协议</Navigator>
    </View>
  </View>
)
