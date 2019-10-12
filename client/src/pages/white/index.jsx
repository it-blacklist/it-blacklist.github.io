import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import TabBar from '../../components/tabbar'

export default class White extends Component {
  
  config = {
    navigationBarTitleText: '白名单'
  }
  
  render () {
    return (
      <View className='index'>
        <AtDivider content='正在开发中'/>
        <TabBar/>
      </View>
    )
  }
}
