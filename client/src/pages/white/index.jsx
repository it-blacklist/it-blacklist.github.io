import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabBar from '../../components/tabbar'
import { connect } from '@tarojs/redux'
import { AtNoticebar, AtIndexes } from 'taro-ui'

@connect(({ black }) => ({
  ...black
}), (dispatch) => ({}))
export default class White extends Component {
  
  config = {
    navigationBarTitleText: '白名单'
  }
  
  render () {
    const list = [{
      title: 'A',
      key: 'A',
      items: [
        { 'name': '阿坝' },
        { 'name': '阿拉善' }]
    },
      {
        title: 'B',
        key: 'B',
        items: [
          { 'name': '北京' },
          { 'name': '保定' }]
      }
    ]
    return (
      <View className='index'>
        <AtNoticebar icon='volume-plus'>正在开发中</AtNoticebar>
        <AtIndexes list={list}>
          <View>城市列表</View>
        </AtIndexes>
        <TabBar/>
      </View>
    )
  }
}
