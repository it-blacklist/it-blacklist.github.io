<template>
  <view class="u-padding-30">
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="['toast']">
      <u-form-item label-width="0" prop="content">
        <u-input type="textarea" border placeholder="我要留言…" v-model="model.content" />
      </u-form-item>
    </u-form>
    <view class="agreement">
      <u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
      <view class="agreement-text">
        勾选代表已阅读并同意
        <navigator url="../statement/index">相关条款</navigator>
      </view>
    </view>
    <u-button :loading="loading" @click="submit">提交</u-button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          content: ''
        },
        rules: {
          content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          }],
        },
        check: false,
        loading: false
      };
    },
    onLoad() {

    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
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
                title: '处理中...'
              })
              uniCloud.callFunction({
                name: 'feedback',
                data: { ...this.model,
                  createTime: new Date().getTime()
                }
              }).then((res) => {
                uni.hideLoading()
                uni.showModal({
                  content: `提交成功`,
                  showCancel: false,
                  success: () => {
                    uni.navigateBack()
                  }
                })
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
      checkboxChange(e) {
        this.check = e.value;
      },
    }
  };
</script>

<style>
  
</style>
