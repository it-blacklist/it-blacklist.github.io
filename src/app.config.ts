import { AppConfig } from 'remax/wechat'

const config: AppConfig = {
  pages: [
    'pages/Index/index',
    'pages/About/index',
    'pages/BlackDetail/index',
    'pages/BlackNew/index',
    'pages/Statement/index',
    'pages/Feedback/index'
  ],
  window: {
    navigationBarTitleText: '石家庄IT黑企'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/Index/index',
        text: '首页',
        iconPath: './assets/tabBar/home.png',
        selectedIconPath: './assets/tabBar/home-active.png'
      },
      {
        pagePath: 'pages/About/index',
        text: '关于',
        iconPath: './assets/tabBar/app.png',
        selectedIconPath: './assets/tabBar/app-active.png'
      },
    ],
    color: '#333',
    selectedColor: '#07c160',
    backgroundColor: '#fff',
    borderStyle: 'white',
  }
}
export default config
