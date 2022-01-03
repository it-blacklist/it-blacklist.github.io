<template>
  <view class="">
    <u-card :title="content.company" :sub-title="$u.timeFormat(content.createTime, 'yyyy/mm/dd hh:MM')" full>
      <view class="content" slot="body">
        <view class="u-body-item">
          <view class="u-body-item-title">{{content.content}}</view>
          <view class="appeal-wrap"><text @click="appeal">我要纠错</text></view>
        </view>
      </view>
      <view class="" slot="foot" v-show="system.show">
        <view class="rate-wrap">
          <u-button :type="rateConf.up.type" shape="circle" size="medium" @click="updateRate(rateConf.up.rate)"
            style="width:119px">
            <u-icon v-show="rateConf.up.iconShow" name="thumb-up-fill" size="32"></u-icon>
            <text>{{rateConf.up.text}}</text>
          </u-button>
          <u-button :type="rateConf.down.type" shape="circle" size="medium" @click="updateRate(rateConf.down.rate)"
            style="width:119px">
            <u-icon v-show="rateConf.down.iconShow" name="thumb-down-fill" size="32"></u-icon>
            <text>{{rateConf.down.text}}</text>
          </u-button>
        </view>
        <u-icon name="chat-fill" size="34" label="精选评论"></u-icon>
        <u-empty v-if="!discussList.length" text="暂无评论" mode="news"></u-empty>
        <view v-for="(item,index) of discussList" :key="item._id"
          :class="[{'u-border-bottom':(index+1)!==discussList.length},'u-body-item']" style="margin-top: 8px;">
          <view class="u-body-item-title" @click="showTime(item.createTime)">{{item.content}}</view>
        </view>
      </view>
    </u-card>
    <view v-show="system.show" class="u-padding-30">
      <u-form :model="model" ref="uForm" :errorType="['toast']">
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
      <u-button :loading="loading" type="primary" @click="submit">提交</u-button>
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
        discussList: [],
        model: {
          content: ''
        },
        check: false,
        loading: false,
        system: {},
        userInfo: {}
      };
    },
    onReady() {
      this.$refs.uForm.setRules(rules);
    },
    async onLoad(props) {
      const system = await getApp().getConfig()
      const userInfo = await getApp().getUserInfo(true)
      if (userInfo) {
        this.userInfo = userInfo
      }
      this.system = system
      this.$u.http.post('list/get', props).then(res => {
        this.content = res[0]
        if (system.show) {
          this.getDiscussList(res[0].company)
        }
      })
    },
    onShareAppMessage() {
      return {
        title: this.content.company,
        path: `/pages/content/index?_id=${this.content._id}`
      }
    },
    methods: {
      showTime(time) {
        uni.showToast({
          icon: 'none',
          title: `发表时间:${this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss')}`
        })
      },
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
          this.userInfo = userInfo
          this.loading = true
          this.$u.http.post('discuss/update', {
            ...this.model,
            company: this.content.company,
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
      getDiscussList(company) {
        this.loadingStatus = 'loading'
        this.$u.http.post('discuss/get', {
            company,
            current: 1,
            pageSize: 100
          })
          .then(res => {
            this.discussList = res
          })
      },
      async updateRate(type) {
        const userInfo = await getApp().getUserInfo()
        if (userInfo) {
          this.userInfo = userInfo
          this.$u.http.post('list/update', {
            _id: this.content._id,
            rate: {
              type,
              userInfo
            }
          }).then(res => {
            this.$u.http.post('list/get', {
              _id: this.content._id
            }).then(res => {
              this.content = res[0]
              uni.showToast({
                icon: 'success',
                title: '打分成功！',
                duration: 2000
              })
            })
          })
        }
      },
      appeal() {
        uni.showModal({
          title: '温馨提示',
          content: '如果内容有误，可以点此纠错，请具体到哪家公司、哪条评论',
          success: (r) => {
            if (r.confirm) {
              uni.navigateTo({
                url: `../feedback/index?id=${this.content._id}&company=${this.content.company}`
              })
            }
          }
        })
      }
    },
    computed: {
      rateConf() {
        const openid = this.userInfo.openid || ''
        const rate = this.content.rate || []
        const rateUp = rate.filter(item => item.type === 1)
        const rateDown = rate.filter(item => item.type === -1)
        const isRate = [...rateUp, ...rateDown].findIndex(item => item.userInfo.openid === openid) !== -1
        return {
          up: {
            type: isRate ? 'success' : 'default',
            rate: isRate ? 0 : 1,
            text: isRate ? rateUp.length : '有价值',
            iconShow: isRate ? true : false
          },
          down: {
            type: isRate ? 'error' : 'default',
            rate: isRate ? 0 : -1,
            text: isRate ? rateDown.length : '无价值',
            iconShow: isRate ? true : false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'style'
</style>
