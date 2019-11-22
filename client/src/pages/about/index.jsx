import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList,AtListItem, AtIcon} from 'taro-ui'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  }

  render() {
    return (
      <View className='index about'>
        <View className='top'>
          <View className='icon'>
            <AtIcon value='heart-2'color='#F00'/>
          </View>
          <View className="info">如果你觉得不错，可以请作者喝杯茶。</View>
        </View>
        <AtList>
          <AtListItem
            title='标题文字'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='标题文字'
            arrow='right'
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
          <AtListItem
            title='标题文字'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
        </AtList>
      </View>
    )
  }
}
