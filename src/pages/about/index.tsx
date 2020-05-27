import React from 'react'
import { View, previewImage, setClipboardData, showModal, Image, OpenData } from 'remax/wechat'
import Cell from 'weui-miniprogram/miniprogram_dist/cell/cell'
import Cells from 'weui-miniprogram/miniprogram_dist/cells/cells'

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
    title: 'https://github.com/liujiayii/',
    content: '点击确认按钮复制链接到浏览器中查看'
  }).then((r) => {
    if (r.confirm) {
      setClipboardData({ data: 'https://github.com/liujiayii/' })
    }
  })
}

export default () => {
  return (
    <View style={{ background: '#ededed' }} data-weui-theme="light">
      <Cells>
        <Cell value="如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。">
          <View slot="title" style={{ width: '60px', height: '60px', marginRight: '10px' }}>
            <OpenData type="userAvatarUrl"/>
          </View>
        </Cell>
      </Cells>
      <Cells title=' '>
        <Cell link hover url="/pages/black-new/index" value="贡献一条黑名单">
          <View slot="title"><Image src={iconfont[1]} className='about-icon'/></View>
        </Cell>
        <Cell link hover url="/pages/feedback/index" value="留言">
          <View slot="title"><Image src={iconfont[2]} className='about-icon'/></View>
        </Cell>
        <Cell link hover url="/pages/statement/index" value="特别声明">
          <View slot="title"><Image src={iconfont[3]} className='about-icon'/></View>
        </Cell>
        <Cell link value="GitHub" bindtap={() => handleOpen()}>
          <View slot="title"><Image src={iconfont[4]} className='about-icon'/></View>
        </Cell>
        <Cell link value="打赏" bindtap={() => clickImg()}>
          <View slot="title"><Image src={iconfont[5]} className='about-icon'/></View>
        </Cell>
      </Cells>
    </View>
  )
}
