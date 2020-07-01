<template>
  <view class="u-padding-40">
    <view class="u-main-color u-font-19">
      特别声明
    </view>
    <view class="u-content-color u-margin-top-10">
      Dear
      <open-data type="userNickName" />, 请勿提交任何违反微信小程序内容安全要求规范的内容，网络不是法外之地。
    </view>
    <view class="u-content-color u-margin-top-10">
      所有操作均为匿名，未记录任何个人信息，提交的内容审核通过后才会发布~
    </view>
    <view class="u-content-color u-margin-top-10">
      对小程序有什么意见和建议，可以留言给我~
    </view>
    <view class="u-content-color u-margin-top-10">
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
