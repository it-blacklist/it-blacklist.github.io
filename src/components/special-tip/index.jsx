import React from 'react'
import { Navigator, Text, View } from 'remax/wechat'
import styles from './index.module.css'

export default function (props) {
  return (
    <View className={styles.tip}>
      <View><Text className={styles.red}>*特别提示</Text>
        <Navigator className={styles.navigator} url={props.url}>请先阅读特别声明</Navigator>
      </View>
    </View>
  )
}
