import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline } from 'taro-ui'
import TabBar from '../../components/tabbar'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }
  
  render () {
    const items = [
      { title: '黑名单', content: ['分页功能正常', '搜索功能正常'], icon: 'check-circle' },
      { title: '正在开发的有', content: ['增加数据', '增加回复', '底部导航路由的优化(求大佬指导，目前切换路由会闪一下)'], icon: 'clock' },
      { title: '白名单', content: ['暂未开发'], icon: 'clock' },
      { title: '关于', content: ['准备开发的有', '小程序数据统计', '小程序信息', '特别鸣谢'], icon: 'clock' },
      { title: '求大佬赞助一个服务器', content: ['目前数据库在微信云开发', '感觉不太方便', '功能也不完善', '模糊搜索、去重等等功能都没有'], icon: 'clock' },
      { title: '未来', content: ['走出石家庄', '走向全国', '冲出亚洲', '迈向全球', '赢取白富美', '走向人生巅峰'], icon: 'clock' },
    ]
    return (
      <View className='index'>
        <View className='about-content'>
          <AtTimeline pending items={items}/>
        </View>
        <TabBar/>
      </View>
    )
  }
}
