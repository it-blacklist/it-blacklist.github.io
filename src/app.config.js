module.exports = {
  pages: [
    'pages/black/index',
    'pages/about/index',
    'pages/black-detail/index',
    'pages/black-new/index',
    'pages/statement/index',
    'pages/feedback/index',
    'pages/index/index'
  ],
  window: {
    navigationBarTitleText: 'Remax'
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
        pagePath: 'pages/index/index',
        text: '新体验',
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
      },
    ],
    color: '#333',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
  }
}
