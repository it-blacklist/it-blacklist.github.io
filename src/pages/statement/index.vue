<template>
  <view v-show="content.companyName">
    <view class="u-padding-40">
      <view class="u-main-color u-font-19">
        {{content.companyName}}
      </view>
      <view v-for="(item,index) of content.content" :key="index" class="u-content-color u-margin-top-20">
        {{item}}
      </view>
      <view v-show="content.github" class="u-content-color u-margin-top-20" style="color: #2979ff;" @click="handleOpen">
        {{content.github}}
      </view>
      <view class="u-body-item">
        <u-empty v-if="!commentList.length" text="暂无评论" mode="news"></u-empty>
        <view v-for="(item,index) of commentList" :key="item._id" :class="[{'u-border-bottom':(index+1)!==commentList.length},'u-body-item']">
          <view class="u-body-item-title">{{item.content}}</view>
        </view>
      </view>
    </view>
    <view v-show="system.show" class="u-padding-30">
      <u-form :model="model" :rules="rules" ref="uForm" :errorType="['toast']">
        <u-form-item label-width="0" prop="content">
          <u-input type="textarea" maxlength="2000" border placeholder="我要评论…" v-model="model.content" />
        </u-form-item>
      </u-form>
      <u-button :loading="loading" @click="submit">提交</u-button>
    </view>
  </view>
</template>

<script>
  const rules = {
    content: [{
      required: true,
      message: '请输入内容',
      trigger: 'blur',
    }],
  }
  export default {

    data() {
      return {
        content: {},
        system: {},
        commentList: [],
        model: {
          content: ''
        },
        rules,
        loading: false,
      };
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      handleOpen() {
        uni.showModal({
          title: 'https://github.com/liujiayii/',
          content: '点击确认按钮复制链接到浏览器中查看',
          showCancel: false,
          success: (r) => {
            if (r.confirm) {
              uni.setClipboardData({
                data: 'https://github.com/liujiayii/'
              })
            }
          }
        })
      },
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            this.confirmSubmit()
          } else {
            console.log('验证失败');
          }
        });
      },
      confirmSubmit() {
        uni.showModal({
          content: '是否确认提交',
          success: (r) => {
            if (r.confirm) {
              this.loading = true
              uni.showLoading({
                title: '提交中...'
              })
              uniCloud.callFunction({
                name: 'itBlackCreateComment',
                data: { ...this.model,
                  companyName: this.content.companyName
                }
              }).then((res) => {
                uni.hideLoading()
                this.loading = false
                if (!res.result) {
                  uni.showToast({
                    icon: 'none',
                    title: '内容可能含有违法违规内容'
                  })
                } else {
                  uni.showModal({
                    content: '提交成功',
                    showCancel: false,
                    success: () => {
                      uni.navigateBack()
                    }
                  })
                }
              }).catch((err) => {
                uni.hideLoading()
                uni.showModal({
                  content: `提交失败`,
                  showCancel: false
                })
                this.loading = false
              })
            }
          }
        })
      },
      getCommentList(companyName) {
        this.loadingStatus = 'loading'
        uniCloud.callFunction({
          name: 'itBlackListComment',
          data: {
            companyName
          }
        }).then((res) => {
          uni.hideLoading()
          this.commentList = res.result.data
        }).catch((err) => {
          uni.hideLoading()
          uni.showModal({
            content: `加载失败，错误信息为：${JSON.stringify(err)}`,
            showCancel: false
          })
        })
      }
    },
    async onLoad(props) {
      const system = await getApp().getConfig()
      this.system = system
      if (system.show) {
        uni.showLoading({
          title: '加载中...'
        })
        uniCloud.callFunction({
          name: 'itBlackGetById',
          data: {
            _id: "ea18d7cf5f06bd3000018a223dc4c418"
          }
        }).then((res) => {
          if (res.result.data[0]) this.content = res.result.data[0]
          this.getCommentList(res.result.data[0].companyName)
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

    .footer {
      position: absolute;
      bottom: 40rpx;
    }
  }

  .u-body-item {
    font-size: 32rpx;
    color: #333;
    padding: 20rpx 10rpx;
  }
</style>
