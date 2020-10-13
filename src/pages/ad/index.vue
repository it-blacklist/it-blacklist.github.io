<template>
  <view v-if="system.ad">
    <view v-show="content.companyName">
      <view class="u-padding-40">
        <view v-for="(item,index) of content.content" :key="index" class="u-main-color u-margin-top-20">
          {{item}}
        </view>
        <view class="u-body-item">
          <official-account></official-account>
          <image @click="showImage" src="https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/quan.jpg" mode="widthFix"></image>
        </view>
      </view>
    </view>
  </view>
  <view v-else>
    <u-empty mode="page"></u-empty>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: {},
        system: {}
      };
    },
    methods: {
      showImage() {
        uni.previewImage({
          urls: ['https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/quan.jpg'],
        });
      }
    },
    async onLoad(props) {
      const system = await getApp().getConfig()
      this.system = system
      if (system.ad) {
        uni.showLoading({
          title: '加载中...'
        })
        uniCloud.callFunction({
          name: 'itBlackGetById',
          data: {
            _id: "8e5be7055f816602018d85b737d534e3"
          }
        }).then((res) => {
          if (res.result.data[0]) this.content = res.result.data[0]
          uni.hideLoading()
        }).catch((err) => {
          uni.showModal({
            content: `加载失败，错误信息为：${JSON.stringify(err)}`,
            showCancel: false
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  page {
    min-height: 100vh;
    position: relative;
  }

  .u-body-item {
    font-size: 32rpx;
    color: #333;
    padding: 20rpx 10rpx;
  }
</style>
