<template>
  <view class="u-padding-30">
    <u-form :model="model" ref="uForm" :errorType="['toast']">
      <u-form-item label-width="0" prop="content">
        <u-input type="textarea" maxlength="2000" border placeholder="我要留言…" v-model="model.content" />
      </u-form-item>
    </u-form>
    <view class="agreement">
      <u-checkbox v-model="check"></u-checkbox>
      <view class="agreement-text">
        勾选代表已阅读并同意
        <navigator url="../statement/index">相关条款</navigator>
      </view>
    </view>
    <u-button type="primary" :loading="loading" @click="submit">提交</u-button>
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
        model: {
          content: ''
        },
        check: false,
        loading: false,
        props: null,
      };
    },
    onReady() {
      this.$refs.uForm.setRules(rules);
    },
    onLoad(props) {
      this.props = props
    },
    methods: {
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            if (!this.check) return this.$u.toast('请勾选协议');
            uni.showModal({
              content: '是否确认提交',
              success: (r) => {
                if (r.confirm) {
                  this.confirmSubmit()
                }
              }
            })
          } else {
            console.log('验证失败');
          }
        });
      },
      async confirmSubmit() {
        const userInfo = await getApp().getUserInfo()
        if (userInfo) {
          this.loading = true
          this.$u.http.post('feedback/update', {
            ...this.model,
            createTime: +new Date(),
            userInfo,
            props: this.props
          }).then(() => {
            uni.showModal({
              content: `提交成功`,
              showCancel: false,
              success: () => {
                uni.navigateBack()
              }
            })
          })
        }
      }
    }
  };
</script>
