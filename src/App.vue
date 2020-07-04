<script>
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    globalData: {
      system: {}
    },
    onLaunch() {
      console.log('App Launch')
      const updateManager = uni.getUpdateManager();
      updateManager.onUpdateReady((res) => {
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
    onShow() {
      console.log('App Show')
    },
    onHide() {
      console.log('App Hide')
    }
  });
</script>

<style lang="scss">
  @import "uview-ui/index.scss";
  /*每个页面公共css */
</style>
