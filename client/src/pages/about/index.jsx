import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { shareInfo } from '../../utils/utils'

@connect(({ about, loading }) => ({
  ...about,
  loading
}), (dispatch) => ({
  handleOpen () {
    dispatch({ type: 'about/switch', payload: { active: true } })
  },
  handleClose () {
    dispatch({ type: 'about/switch', payload: { active: false } })
  },
  handleConfirm () {
    Taro.setClipboardData({
      data: 'https://github.com/liujiayii/',
      success: (res) => {
        Taro.getClipboardData({
          success: (res) => {
            Taro.showToast({ title: '复制成功' })
            dispatch({ type: 'about/switch', payload: { active: false } })
          }
        })
      }
    })
  }
}))
export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  }
  
  clickImg () {
    Taro.previewImage({
      urls: ['/assets/qrcode.jpg'], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    })
  }
  onShareAppMessage () {
    return shareInfo()
  }
  
  render () {
    const { handleClose, active, handleOpen, handleConfirm } = this.props
    return (
      <View className='index about'>
        <View className='top'>
          <View className='logo'>
            <AtIcon className='iconfont' prefixClass='icon' value='bixin' color='#F00' size="40"/>
          </View>
          <View className='info'>如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</View>
        </View>
        <View style={{ marginTop: '10px' }}>
          <AtList>
            <AtListItem
              title='贡献一条黑名单'
              arrow='right'
              iconInfo={{ value: 'ziyuan', prefixClass: 'icon', className: 'iconfont' }}
              onClick={() => Taro.navigateTo({ url: '/pages/blackNew/index' })}
            />
            <AtListItem
              title='留言'
              arrow='right'
              iconInfo={{ value: 'fankui-tianchong', prefixClass: 'icon', className: 'iconfont' }}
              onClick={() => Taro.navigateTo({ url: '/pages/feedback/index' })}
            />
            <AtListItem
              title='特别声明'
              arrow='right'
              iconInfo={{ value: 'jinggao', prefixClass: 'icon', className: 'iconfont' }}
              onClick={() => Taro.navigateTo({ url: '/pages/statement/index' })}
            />
            <AtListItem
              title='GitHub'
              arrow='right'
              iconInfo={{ value: 'github', prefixClass: 'icon', className: 'iconfont' }}
              onClick={handleOpen}
            />
            <AtListItem
              title='打赏'
              arrow='right'
              iconInfo={{ value: 'juanzeng', prefixClass: 'icon', className: 'iconfont' }}
              onClick={this.clickImg}
            />
          </AtList>
          <AtModal
            isOpened={active}
            cancelText='取消'
            confirmText='确认'
            onClose={handleClose}
            onCancel={handleClose}
            onConfirm={handleConfirm}
            content={'Github:"https://github.com/liujiayii/" 点击确认按钮复制链接到浏览器中查看'}
          />
        </View>
      </View>
    )
  }
}
