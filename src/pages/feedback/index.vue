<template>
  <view class="u-padding-30">
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="['toast']">
      <u-form-item label-width="0" prop="feedback">
        <u-input type="textarea" border placeholder="我要留言…" v-model="model.feedback" />
      </u-form-item>
    </u-form>
    <view class="agreement">
      <u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
      <view class="agreement-text">
        勾选代表同意
        <navigator url="../statement/index">相关条款</navigator>
      </view>
    </view>
    <u-button :loading="loading" @click="submit">提交</u-button>
  </view>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        model: {
          feedback: ''
        },
        rules: {
          feedback: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          }, ],
        },
        check: false,
        loading:false
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
            this.loading=true
          } else {
            console.log('验证失败');
          }
        });
      },
      checkboxChange(e) {
        this.check = e.value;
      },
    }
  };
</script>

<style scoped lang="scss">
  .agreement {
    display: flex;
    align-items: center;
    margin: 40rpx 0;

    .agreement-text {
      display: flex;
      padding-left: 8rpx;
      color: $u-tips-color;
      navigator{
        color: $u-type-primary;
      }
    }
  }
</style>
