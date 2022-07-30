<template>
  <view class="">
    <view v-show="!system.show" class="u-padding-40">
      <u-empty text="该功能目前已下线" mode="permission"></u-empty>
    </view>
    <view v-show="system.show" class="u-padding-30">
      <u-form :model="model" ref="uForm" :errorType="['toast']">
        <u-form-item label="公司名称" label-width="130" prop="company">
          <u-input border placeholder="公司名称" v-model="model.company" />
        </u-form-item>
        <u-form-item label="所在城市" label-width="130" prop="city">
          <u-input type="select" :select-open="selectShow" v-model="model.city" placeholder="请选择所在城市"
            @click="selectShow = true"></u-input>
          <u-select v-model="selectShow" mode="mutil-column-auto" :list="cityList" @confirm="selectConfirm"></u-select>
        </u-form-item>
        <u-form-item label-width="0" prop="content">
          <u-input type="textarea" maxlength="5000" border placeholder="该公司不合理的地方…" v-model="model.content" />
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
  </view>
</template>

<script>
  const rules = {
    company: [{
      required: true,
      message: '请输入公司名称',
      trigger: 'blur',
    }],
    city: [{
      required: true,
      message: '请选择城市',
      trigger: 'blur',
    }],
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
          company: '',
          content: '',
          city: '',
        },
        check: false,
        loading: false,
        selectShow: false,
        cityList: [],
        system: {}
      };
    },
    async onLoad() {
      this.system = await getApp().getConfig()
      getApp().getCityList().then(r => {
        this.cityList = r
      })
    },
    onReady() {
      this.$refs.uForm.setRules(rules);
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
          this.$u.http.post('list/update', {
            ...this.model,
            userInfo
          }).then(res => {
            console.log(res)
            if (res.errcode) {
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
          }).finally(() => {
            this.loading = false
          })
        }
      },
      selectConfirm(e) {
        if (e && e.length) {
          this.model.city = e[e.length - 1].value
        }
      },
    }
  };
</script>

<style lang="scss">
  @import 'style'
</style>
