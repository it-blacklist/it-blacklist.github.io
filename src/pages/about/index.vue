<template>
  <view>
    <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10" :style=" {width: '60px', height: '60px', marginRight: '10px' }">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="u-flex-1">
        <!-- <view class="u-font-18 u-p-b-20">IT民工</view> -->
        <view class="u-font-14 u-tips-color">如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</view>
      </view>
    </view>
    <u-gap></u-gap>
    <u-cell-group class="u-m-t-20">
      <navigator url="../create/index">
        <u-cell-item icon="edit-pen-fill" title="贡献一条黑名单"></u-cell-item>
      </navigator>
      <navigator url="../feedback/index">
        <u-cell-item icon="email-fill" title="留言"></u-cell-item>
      </navigator>
      <navigator url="../statement/index">
        <u-cell-item icon="info-circle-fill" title="特别声明"></u-cell-item>
      </navigator>
      <u-cell-item @click="handleOpen()" icon="github-circle-fill" title="GitHub"></u-cell-item>
      <u-cell-item @click="clickImg()" icon="gift-fill" title="打赏"></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleOpen() {
        uni.showModal({
          title: 'https://github.com/liujiayii/',
          content: '点击确认按钮复制链接到浏览器中查看',
          showCancel:false,
          success: (r) => {
            if (r.confirm) {
              uni.setClipboardData({
                data: 'https://github.com/liujiayii/'
              })
            }
          }
        })
      },
      clickImg  ()  {
        uni.previewImage({
          urls: ['https://6974-itblacklist-1257941888.tcb.qcloud.la/qrcode.jpg?sign=a8a70c8edfa00f789149be669dce239f&t=1576917029',
            'https://6974-itblacklist-1257941888.tcb.qcloud.la/wx.jpg?sign=00f84fae613588571776b4a3570f63f1&t=1576917059']
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ededed;
    min-height: 100vh;
  }

  .user-box {
    background-color: #fff;
  }
</style>
