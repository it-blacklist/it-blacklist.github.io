<script>
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    globalData:{
      system:{}
    },
    onLaunch() {
      console.log('App Launch')
      uniCloud.callFunction({
        name: 'itBlackSystem'
      }).then((res) => {
        this.globalData.system = res.result.data[0]
      }).catch((err) => {
        uni.showModal({
          content: `查询失败，错误信息为：${err.message}`,
          showCancel: false
        })
      })
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
