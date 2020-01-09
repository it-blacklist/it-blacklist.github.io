import React from 'react'
import { View } from 'remax/wechat'
import styles from './index.module.css'

export default function Statement () {
  return (
    <View className={'page-content'}>
      <View className={styles.article}>
        <View className={styles.article_h1}>这里是标题</View>
        <View className={styles.article_p}>
          一、请勿提交任何违反微信小程序内容安全要求规范的内容，网络不是法外之地
        </View>
        <View className={styles.article_p}>
          二、所有操作均为匿名，未记录任何个人信息，提交的内容审核通过后才会发布~</View>
        <View className={styles.article_p}>
          三、目前的数据存储在腾讯云（微信云开发），在迁出之前不会加入大的功能更新</View>
        <View className={styles.article_p}>
          四、对小程序有什么意见和建议，可以留言给我~</View>
        <View className={styles.article_p}>
          五、小程序的源码发布在GitHub，求star！求pr！求issue！</View>
      </View>
    </View>
  )
}
