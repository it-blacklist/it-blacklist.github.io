import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import TabBar from '../../components/tabbar'
import { AtButton, AtList, AtListItem, AtSearchBar, AtPagination } from 'taro-ui'

@connect(({ black }) => ({
  ...black
}), (dispatch) => ({
  onPageChange (payload) {
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
    dispatch({ type: 'black/fetch', payload })
  },
  getCount () {
    dispatch({ type: 'black/getCount' })
  }
}))
export default class Black extends Component {
  
  config = {
    navigationBarTitleText: '首页'
  }
  
  componentDidMount () {
    this.props.getCount()
    this.props.onPageChange({ current: 1 })
  }
  
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  
  onChange (value) {
    this.setState({
      value: value
    })
  }
  
  onActionClick () {
    console.log('开始搜索')
  }
  
  render () {
    const { total, pageSize, currentPage, blackList, onPageChange } = this.props
    return (
      <View className='index'>
        <div>
          <AtSearchBar
            actionName='搜一下'
            placeholder='搜索功能暂未实现'
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <AtList>
            {blackList.map((item) => (
              <AtListItem key={item._id} arrow='right' note={item.time} title={item.name}/>
            ))}
          </AtList>
          <AtPagination total={total} pageSize={pageSize}
                        current={currentPage} onPageChange={onPageChange}/>
        </div>
        <TabBar/>
      </View>
    )
  }
}
