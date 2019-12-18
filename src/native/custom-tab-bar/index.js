const tabList = [
  { title: '黑名单', icon: 'wap-home-o', url: '/pages/black/index' },
  { title: '新体验', icon: 'bulb-o', url: '/pages/index/index' },
  { title: '关于', icon: 'apps-o', url: '/pages/about/index' },
]
Component({
  data: {
    tabList,
    currentIndex: 0
  },
  methods: {
    handleClick ({ detail }) {
      wx.switchTab({ url: tabList[detail]['url'] })
      this.setData({ currentIndex: detail })
    }
  },
})

