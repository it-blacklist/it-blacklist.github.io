import React, { Component } from 'react'
import { View, previewImage, setClipboardData, getClipboardData, showToast } from 'remax/wechat'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import { shareInfo } from '@/utils/utils'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDialog from '@vant/weapp/dist/dialog'
import CustomTabBar from '@/custom-tab-bar'
import qrCode from '@/assets/qrcode.jpg'

export default class About extends Component {
  clickImg () {
    previewImage({
      urls: [qrCode], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    })
  }

  handleOpen () {
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

  onShareAppMessage () {
    return shareInfo
  }

  render () {
    return (
      <View className='index about'>
        <View className='top'>
          <View className='logo'>
            <View className='iconfont icon-bixin' style={{ color: '#f00', fontSize: '40px' }}/>
          </View>
          <View className='info'>如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</View>
        </View>
        <View style={{ marginTop: '10px' }}>
          <VanDialog id='van-dialog'/>
          <VanCellGroup>
            <VanCell title='贡献一条黑名单' is-link url='/pages/blackNew/index'>
              <View slot='icon' className='iconfont icon-ziyuan'/>
            </VanCell>
            <VanCell title='留言' is-link url='/pages/feedback/index'>
              <View slot='icon' className='iconfont icon-fankui-tianchong'/>
            </VanCell>
            <VanCell title='特别声明' is-link url='/pages/statement/index'>
              <View slot='icon' className='iconfont icon-jinggao'/>
            </VanCell>
            <VanCell title='GitHub' is-link onclick={() => this.handleOpen()}>
              <View slot='icon' className='iconfont icon-github'/>
            </VanCell>
            <VanCell title='打赏' is-link onclick={() => this.clickImg()}>
              <View slot='icon' className='iconfont icon-juanzeng'/>
            </VanCell>
          </VanCellGroup>
        </View>
        <CustomTabBar/>
      </View>
    )
  }
}
