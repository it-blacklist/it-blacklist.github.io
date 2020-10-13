<script>
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    globalData: {
      system: {}
    },
    onLaunch() {
      this.updateVersion()
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
        });
      },
      getConfig() {
        return new Promise((resolve, reject) => {
          // #ifdef MP-WEIXIN 
          const plat = 'weixin'
          // #endif
          // #ifdef MP-QQ
          const plat = 'qq'
          // #endif
          if(typeof this.globalData.system.show === 'boolean'){
            resolve(this.globalData.system)
          }else {
            uniCloud.callFunction({
              name: 'itBlackSystem'
            }).then((res) => {
              const system = {
                show: res.result.data[0][plat],
                ad:res.result.data[0].ad
              }
              this.globalData.system = system
              resolve(system)
            }).catch((err) => {
              uni.showModal({
                content: `查询失败，错误信息为：${JSON.stringify(err)}`,
                showCancel: false
              })
            })
          }
        })
      }
    }
  });
</script>

<style lang="scss">
  @import "uview-ui/index.scss";
  /*每个页面公共css */
</style>
