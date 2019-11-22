import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTimeline} from 'taro-ui'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

  render() {
    const items = [
      {title: '苟利国家生死以', icon: 'check-circle'},
      {title: '岂因福祸避趋之', icon: 'check-circle'},
      {title: '后期有时间会重构这个小程序', icon: 'check-circle'},
      {title: 'taro、remax、vant……陷入了选择困难症', icon: 'check-circle'},
    ]
    return (
      <View className='index'>
        <View className='page-content'>
          <AtTimeline pending items={items}/>
        </View>
      </View>
    )
  }
}
