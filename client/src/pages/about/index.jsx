import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline } from 'taro-ui'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }
  
  render () {
    const items = [
      { title: '黑名单', content: ['分页功能正常', '搜索功能正常', '增加数据正常','点评正常'], icon: 'check-circle' },
      { title: '正在开发的有', content: ['发现栏目'], icon: 'clock' },
      { title: '准备开发的有', content: ['小程序数据统计', '小程序信息', '特别鸣谢', '代码压缩打包',], icon: 'clock' },
      { title: '暂不开发但遥远的未来想做', content: ['白名单', '面试系统', '……'], icon: 'clock' },
      { title: '求大佬赞助一个服务器', content: ['目前数据库在微信云开发', 'CRUD功能不太完善…'], icon: 'clock' },
      { title: '未来', content: ['走出石家庄', '走向全国', '冲出亚洲', '迈向全球', '(〃\'▽\'〃)'], icon: 'clock' },
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
