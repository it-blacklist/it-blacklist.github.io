import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import './app.scss'
import dva from './utils/dva'
import models from './models'

const dvaApp = dva.createApp({
  initialState: {},
  models,
})
const store = dvaApp.getStore()

class App extends Component {
  
  config = {
    pages: [
      'pages/black/index',
      'pages/about/index',
      'pages/blackDetail/index',
      'pages/blackNew/index',
      'pages/statement/index',
      'pages/feedback/index',
      'pages/index/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    cloud: true,
    tabBar: {
      custom: true,
      list: [
        {
          pagePath: 'pages/black/index',
          text: '黑名单',
        },
        {
          pagePath: 'pages/about/index',
          text: '关于',
        },
        {
          pagePath: 'pages/index/index',
          text: '新体验',
        },
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  }
  
  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }
  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>=
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
