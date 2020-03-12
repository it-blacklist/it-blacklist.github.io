import { AppConfig } from 'remax/wechat'

const config: AppConfig = {
  pages: [
    'pages/index/index',
    'pages/about/index',
    'pages/black-detail/index',
    'pages/black-new/index',
    'pages/statement/index',
    'pages/feedback/index'
  ],
  window: {
    navigationBarTitleText: '石家庄IT黑企'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabBar/home.png',
        selectedIconPath: './assets/tabBar/home-active.png'
      },
      {
        pagePath: 'pages/about/index',
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
