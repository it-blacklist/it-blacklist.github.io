import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTimeline } from 'taro-ui'

@connect(({ black_detail }) => ({
  ...black_detail
}), (dispatch) => ({}))
export default class BlackDetail extends Component {
  
  config = {
    navigationBarTitleText: '详细信息'
  }
  
  render () {
    const { detail } = this.props
    return (
      <View className='at-article'>
        <View className='at-article__h1'>{detail.name}</View>
        <View className='at-article__info'>{detail.time}</View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            <View className='at-article__p'>{detail.info}</View>
          </View>
          {/*<View className='at-article__h3'>网友评论</View>
          {detail.rate.map((item, index) => (
            <View className='at-article__p' key={index}>{item.msg}</View>
          ))}*/}
        </View>
      </View>
    )
  }
}
