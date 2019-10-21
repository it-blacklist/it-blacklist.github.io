import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider,AtTabs, AtTabsPane, } from 'taro-ui'

export default class Find extends Component {
  
  config = {
    navigationBarTitleText: '发现'
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  
  render (){
    return (
      <View className='index'>
        <View className='page-content'>
          <AtTabs current={this.state.current} tabList={[{ title: '我要求职' }, { title: '我要招聘' }]} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >我要求职的内容</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>我要招聘的内容</View>
            </AtTabsPane>
          </AtTabs>
          <AtDivider content='正在开发中'/>
        </View>
      </View>
    )
  }
}
