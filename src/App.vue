<script>
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    globalData:{
      system:{}
    },
    onLaunch() {
      console.log('App Launch')
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
