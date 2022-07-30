<template>
  <view v-show="system.show">
    <view class="u-padding-40">
      <view class="u-main-color u-font-19">
        {{(system.notice||{}).title}}
      </view>
      <view v-for="(item,index) of (system.notice||{}).content" :key="index" class="u-content-color u-margin-top-20">
        {{item}}
      </view>
      <view class="u-body-item">
        <u-empty v-if="!discussList.length" text="暂无评论" mode="news"></u-empty>
        <view v-for="(item,index) of discussList" :key="item._id" :class="[{'u-border-bottom':(index+1)!==item.length},'u-body-item']">
          <view class="u-body-item-title" @click="showTime(item.createTime)">{{item.content}}</view>
        </view>
      </view>
    </view>
    <view v-show="system.show" class="u-padding-30">
      <u-form :model="model" :rules="rules" ref="uForm" :errorType="['toast']">
        <u-form-item label-width="0" prop="content">
          <u-input type="textarea" maxlength="2000" border placeholder="我要评论…" v-model="model.content" />
        </u-form-item>
      </u-form>
      <u-button type="primary" :loading="loading" @click="submit">提交</u-button>
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
        system: {},
        discussList: [],
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
      showTime(time) {
        uni.showToast({
          icon: 'none',
          title: `发表时间:${this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss')}`
        })
      },
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
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
      getCommentList(company) {
        this.loadingStatus = 'loading'
        this.$u.http.post('discuss/get',{company,current:1,pageSize:100})
        .then(res=>{
      
            this.discussList = res
       
          console.log(res,this.discussList)
          
        })
      }
    },
    async onLoad(props) {
      const system = await getApp().getConfig()
      this.system = system
      console.log(system)
      if(system.show){
        this.getCommentList('置顶公告')
      }
    },
  }
</script>

<style lang="scss" scoped>
@import 'style'
</style>
