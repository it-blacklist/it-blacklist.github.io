import React, { useContext } from 'react'
import { View, previewImage, setClipboardData, showModal, useShareAppMessage, Navigator, Image } from 'remax/wechat'
import { shareInfo } from '@/utils/utils'
import { GlobalContext, } from '@/app'
import { GlobalContextTypes } from '@/app'

const iconfont = [
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/%E6%AF%94%E5%BF%83.svg?sign=379605b4d7fcc21118bf1df4fa3a8904&t=1581571755',
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/%E9%BB%91%E5%90%8D%E5%8D%95.svg?sign=66961065048983a86c29c6d9e0255556&t=1581571793',
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/%E7%95%99%E8%A8%80.svg?sign=10df97935a822b7cad13cdbbf6692206&t=1581572439',
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/%E8%AD%A6%E5%91%8A.svg?sign=97ae54a3adebeba06843ca21e0892ae2&t=1581571856',
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/github.svg?sign=62f85cdaacd81d374b2cd385269075ed&t=1581571878',
  'https://6974-itblacklist-1257941888.tcb.qcloud.la/iconfont/%E6%8D%90%E8%B5%A0.svg?sign=631961fff9646e88094a2075a09daddd&t=1581572266',
]
const clickImg = () => {
  previewImage({
    urls: ['https://6974-itblacklist-1257941888.tcb.qcloud.la/qrcode.jpg?sign=a8a70c8edfa00f789149be669dce239f&t=1576917029',
      'https://6974-itblacklist-1257941888.tcb.qcloud.la/wx.jpg?sign=00f84fae613588571776b4a3570f63f1&t=1576917059']
  })
}
const handleOpen = () => {
  showModal({
    title: '提示',
    content: 'Github:"https://github.com/liujiayii/" 点击确认按钮复制链接到浏览器中查看'
  }).then((r) => {
    if (r.confirm) {
      setClipboardData({ data: 'https://github.com/liujiayii/' })
    }
  })
}

export default () => {
  
  const { globalShow }: GlobalContextTypes = useContext(GlobalContext)
  useShareAppMessage(() => {
    return shareInfo
  })
  
  return (
    <View className='page__bd' style={{ background: '#ededed', paddingBottom: '0' }}>
      <View className="weui-panel weui-panel_access">
        <View className="weui-panel__bd">
          <View className="weui-media-box weui-media-box_appmsg">
            <View className="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <View className="weui-media-box__thumb ">
                <Image src={iconfont[0]} style={{ width: '100px', height: '100px' }}/>
              </View>
            </View>
            <View className="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <View className="weui-media-box__title"
                    style={{ whiteSpace: 'normal' }}>如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: '20px' }}>
        <View className="weui-cells weui-cells_after-title">
          {globalShow && <Navigator url="/pages/BlackNew/index" className="weui-cell weui-cell_example weui-cell_access"
                                    hover-class="weui-cell_active">
            <View className="weui-cell__hd">
              <Image src={iconfont[1]} className='about-icon'/>
            </View>
            <View className="weui-cell__bd">贡献一条黑名单</View>
            <View className="weui-cell__ft weui-cell__ft_in-access"/>
          </Navigator>}
          <Navigator url="/pages/Feedback/index" className="weui-cell weui-cell_example weui-cell_access"
                     hover-class="weui-cell_active">
            <View className="weui-cell__hd">
              <Image src={iconfont[2]} className='about-icon'/>
            </View>
            <View className="weui-cell__bd">留言</View>
            <View className="weui-cell__ft weui-cell__ft_in-access"/>
          </Navigator>
          <Navigator url="/pages/Statement/index" className="weui-cell weui-cell_example weui-cell_access"
                     hover-class="weui-cell_active">
            <View className="weui-cell__hd">
              <Image src={iconfont[3]} className='about-icon'/>
            </View>
            <View className="weui-cell__bd">特别声明</View>
            <View className="weui-cell__ft weui-cell__ft_in-access"/>
          </Navigator>
          <View className="weui-cell weui-cell_example weui-cell_access" onClick={() => handleOpen()}>
            <View className="weui-cell__hd">
              <Image src={iconfont[4]} className='about-icon'/>
            </View>
            <View className="weui-cell__bd">GitHub</View>
            <View className="weui-cell__ft weui-cell__ft_in-access"/>
          </View>
          <View className="weui-cell weui-cell_example weui-cell_access" onClick={() => clickImg()}>
            <View className="weui-cell__hd">
              <Image src={iconfont[5]} className='about-icon'/>
            </View>
            <View className="weui-cell__bd">打赏</View>
            <View className="weui-cell__ft weui-cell__ft_in-access"/>
          </View>
        </View>
      </View>
    </View>
  )
}
