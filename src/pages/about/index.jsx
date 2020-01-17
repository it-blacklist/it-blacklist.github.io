import React from 'react'
import { View, previewImage, setClipboardData, getClipboardData, showToast, useShareAppMessage } from 'remax/wechat'
import { shareInfo } from '@/utils/utils'
import { CustomTabBar } from '@/components'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDialog from '@vant/weapp/dist/dialog'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import clsx from 'clsx'
import styles from './index.module.css'

export default function About () {
  const clickImg = () => {
    previewImage({
      urls: ['https://6974-itblacklist-1257941888.tcb.qcloud.la/qrcode.jpg?sign=a8a70c8edfa00f789149be669dce239f&t=1576917029',
        'https://6974-itblacklist-1257941888.tcb.qcloud.la/wx.jpg?sign=00f84fae613588571776b4a3570f63f1&t=1576917059'], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    })
  }

  const handleOpen = () => {
    Dialog.confirm({
      title: '提示',
      message: 'Github:"https://github.com/liujiayii/" 点击确认按钮复制链接到浏览器中查看'
    }).then(() => {
      setClipboardData({
        data: 'https://github.com/liujiayii/'
      }).then(r => getClipboardData({
        success: () => {
          showToast({ title: '复制成功' })
        }
      }))
    }).catch(() => {})
  }

  useShareAppMessage(() => {
    return shareInfo
  })

  return (
    <View className={clsx('has-custom', styles.about)}>
      <View className={styles.top}>
        <View className={styles.logo}>
          <View className='iconfont icon-bixin' style={{ color: '#f00', fontSize: '60px' }}/>
        </View>
        <View className={styles.info}>如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</View>
      </View>
      <View style={{ marginTop: '10px' }}>
        <VanDialog id='van-dialog'/>
        <VanCellGroup>
          <VanCell title='贡献一条黑名单' is-link url='/pages/black-new/index'>
            <View slot='icon' className={clsx('iconfont icon-ziyuan', styles.iconfont)}/>
          </VanCell>
          <VanCell title='留言' is-link url='/pages/feedback/index'>
            <View slot='icon' className={clsx('iconfont icon-fankui-tianchong', styles.iconfont)}/>
          </VanCell>
          <VanCell title='特别声明' is-link url='/pages/statement/index'>
            <View slot='icon' className={clsx('iconfont icon-jinggao', styles.iconfont)}/>
          </VanCell>
          <VanCell title='GitHub' is-link onclick={() => handleOpen()}>
            <View slot='icon' className={clsx('iconfont icon-github', styles.iconfont)}/>
          </VanCell>
          <VanCell title='打赏' is-link onclick={() => clickImg()}>
            <View slot='icon' className={clsx('iconfont icon-juanzeng', styles.iconfont)}/>
          </VanCell>
        </VanCellGroup>
      </View>
      <CustomTabBar/>
    </View>
  )
}
