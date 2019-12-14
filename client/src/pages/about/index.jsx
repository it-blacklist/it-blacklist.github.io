import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import { shareInfo } from '../../utils/utils'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
    usingComponents: {
      'van-cell': '@vant/weapp/dist/cell/index',
      'van-cell-group': '@vant/weapp/dist/cell-group/index',
      'van-dialog': '@vant/weapp/dist/dialog/index'
    }
  }

  clickImg () {
    Taro.previewImage({
      urls: ['/assets/qrcode.jpg'], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    })
  }

  handleOpen () {
    Dialog.confirm({
      title: '提示',
      message: 'Github:"https://github.com/liujiayii/" 点击确认按钮复制链接到浏览器中查看'
    }).then(() => {
      Taro.setClipboardData({
        data: 'https://github.com/liujiayii/',
        success: () => {
          Taro.getClipboardData({
            success: () => {
              Taro.showToast({ title: '复制成功' })
            }
          })
        }
      })
    }).catch(() => {
      // on cancel
    })
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
          <van-dialog id='van-dialog'/>
          <van-cell-group>
            <van-cell title='贡献一条黑名单' is-link url='/pages/blackNew/index'>
              <View slot='icon' className='iconfont icon-ziyuan'/>
            </van-cell>
            <van-cell title='留言' is-link url='/pages/feedback/index'>
              <View slot='icon' className='iconfont icon-fankui-tianchong'/>
            </van-cell>
            <van-cell title='特别声明' is-link url='/pages/statement/index'>
              <View slot='icon' className='iconfont icon-jinggao'/>
            </van-cell>
            <van-cell title='GitHub' is-link onClick={() => this.handleOpen()}>
              <View slot='icon' className='iconfont icon-github'/>
            </van-cell>
            <van-cell title='打赏' is-link onClick={() => this.clickImg()}>
              <View slot='icon' className='iconfont icon-juanzeng'/>
            </van-cell>
          </van-cell-group>
        </View>
      </View>
    )
  }
}
