<script lang="ts">
  export default {
    onLaunch() {
      console.log("App Launch")
      this.updateVersion()
      uni.login({
        success: (r) => {
          if (r.code) {
            this.$app.config.globalProperties.$u.post('/login', r).then(res => {
              const userInfo = uni.getStorageSync('userInfo');
              uni.setStorage({
                key: 'userInfo',
                data: {
                  ...userInfo,
                  ...res
                }
              })
            });
          }
        }
      })
    },
    onShow() {
      console.log("App Show", this)
    },
    onHide() {
      console.log("App Hide");
    },
    globalData: {
      system: null
    },
    methods: {
      updateVersion() {
        const updateManager = uni.getUpdateManager();
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
      },

      getConfig() {
        return new Promise((resolve, reject) => {
          if (typeof this.globalData.system?.show === 'boolean') {
            resolve(this.globalData.system)
          } else {
             this.$vm.$app.config.globalProperties.$u.post('system/get').then(res => {
              const plat = process.env.VUE_APP_PLATFORM
              const system = {
                show: res[0][plat],
                notice: res[0].notice
              }
              this.globalData.system = system
              resolve(system)
            });
          }
        })
      },

      getUserInfo(need = false) {
        return new Promise(async (resolve, reject) => {
          const userInfo = uni.getStorageSync('userInfo');
          if (userInfo.nickName || need) {
            resolve(userInfo)
          } else {
            uni.showModal({
              title: '温馨提示',
              content: '请先授权以体验小程序完整功能',
              success: (r) => {
                if (r.confirm) {
                  uni.getUserProfile({
                    desc: '用于完善会员资料',
                    success: (res) => {
                      uni.setStorage({
                        key: 'userInfo',
                        data: {
                          ...userInfo,
                          ...res.userInfo,
                        }
                      })
                      resolve({
                        ...userInfo,
                        ...res.userInfo,
                      })
                    }
                  })
                } else {
                  resolve(null)
                }
              }
            })
          }
        })
      },

      getCityList() {
        return new Promise(async (resolve, reject) => {
          const cityList = uni.getStorageSync('cityList');
          if (cityList) {
            resolve(cityList)
          } else {
            this.$vm.$app.config.globalProperties.$u.http.get('https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/cityList.json')
              .then(
                r => {
                  this.cityList = r
                  uni.setStorage({
                    key: 'cityList',
                    data: r
                  })
                  resolve(r)
                })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "uview-ui/theme.scss";
  @import "uview-ui/index.scss";
  .agreement {
      display: flex;
      align-items: center;
      margin: 40rpx 0;
  
      .agreement-text {
        display: flex;
        color: $u-tips-color;
  
        navigator {
          color: $u-type-primary;
        }
      }
    }
</style>
