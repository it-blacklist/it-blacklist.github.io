import React from 'react'
import { OpenData, View } from 'remax/wechat'

export default () => (
  <View className="page__bd">
    <View className="weui-article">
      <View className="weui-article__h1">特别声明</View>
      <View className="weui-article__section">
        <View className="weui-article__section">
          <View className="weui-article__p">
            Dear <OpenData type="userNickName"/>, 请勿提交任何违反微信小程序内容安全要求规范的内容，网络不是法外之地。
          </View>
        </View>
        <View className="weui-article__section">
          <View className="weui-article__p">
            所有操作均为匿名，未记录任何个人信息，提交的内容审核通过后才会发布~
          </View>
        </View>
        <View className="weui-article__section">
          <View className="weui-article__p">
            目前的数据存储在腾讯云（微信云开发），在迁出之前不会加入大的功能更新。
          </View>
        </View>
        <View className="weui-article__section">
          <View className="weui-article__p">
            对小程序有什么意见和建议，可以留言给我~
          </View>
        </View>
        <View className="weui-article__section">
          <View className="weui-article__p">
            小程序的源码发布在GitHub，求star！求pr！求issue！
          </View>
        </View>
      </View>
    </View>
    <view className="weui-footer weui-footer_fixed-bottom">
      <view className="weui-footer__text">Copyright © liujiayii@foxmail.com</view>
    </view>
  </View>
)
