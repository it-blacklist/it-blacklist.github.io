<template>
  <view class="">
    <u-card :title="content.companyName" :sub-title="$u.timeFormat(content.createTime, 'yyyy/mm/dd hh:MM')" full>
      <view class="" slot="body">
        <view class="u-body-item">
          <view class="u-body-item-title">{{content.content}}</view>
        </view>
      </view>
      <view class="" slot="foot" v-show="system.show">
        <u-icon name="chat-fill" size="34" label="精选评论"></u-icon>
        <u-empty v-if="!commentList.length" text="暂无评论" mode="news"></u-empty>
        <view v-for="(item,index) of commentList" :key="item._id" :class="[{'u-border-bottom':(index+1)!==commentList.length},'u-body-item']">
          <view class="u-body-item-title">{{item.content}}</view>
        </view>
      </view>
    </u-card>
    <view v-show="system.show" class="u-padding-30">
      <u-form :model="model" :rules="rules" ref="uForm" :errorType="['toast']">
        <u-form-item label-width="0" prop="content">
          <u-input type="textarea" maxlength="2000" border placeholder="我要评论…" v-model="model.content" />
        </u-form-item>
      </u-form>
      <view class="agreement">
        <u-checkbox v-model="check"></u-checkbox>
        <view class="agreement-text">
          勾选代表已阅读并同意
          <navigator url="../statement/index">相关条款</navigator>
        </view>
      </view>
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
        commentList: [],
        model: {
          content: ''
        },
        rules,
        check: false,
        loading: false,
        system: {}
      };
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    async onLoad(props) {
      uni.showLoading({
        title: '加载中...'
      })
      const system = await getApp().getConfig()
      this.system = system
      uniCloud.callFunction({
        name: 'itBlackGetById',
        data: props
      }).then((res) => {
        if (res.result.data[0]) this.content = res.result.data[0]
        if (system.show) {
          this.getCommentList(res.result.data[0].companyName)
        } else {
          uni.hideLoading()
        }
      }).catch((err) => {
        uni.showModal({
          content: `加载失败，错误信息为：${JSON.stringify(err)}`,
          showCancel: false
        })
      })
    },
    onShareAppMessage() {
      return {
        title: this.content.companyName,
        path: `/pages/content/index?_id=${this.content._id}`
      }
    },
    methods: {
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            if (!this.check) return this.$u.toast('请勾选协议');
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
    }
  }
</script>

<style scoped>
  .u-card-wrap {
    background-color: $u-bg-color;
    padding: 1px;
  }

  .u-body-item {
    font-size: 32rpx;
    color: #333;
    padding: 20rpx 10rpx;
  }
</style>
