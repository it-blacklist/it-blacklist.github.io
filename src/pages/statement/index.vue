<template>
  <view class="u-padding-40">
    <view class="u-main-color u-font-19">
      特别声明
    </view>
    <view class="u-content-color u-margin-top-20">
      对小程序有什么意见和建议，可以留言给我~
    </view>
    <view class="u-content-color u-margin-top-20">
      小程序的源码发布在GitHub，求star！求pr！求issue！
    </view>
    <u-divider class="footer" half-width="100">Copyright © liujiayii@foxmail.com</u-divider>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss" scoped>
  page {
    min-height: 100vh;
    position: relative;

    .footer {
      position: absolute;
      bottom: 40rpx;
    }
  }
</style>
