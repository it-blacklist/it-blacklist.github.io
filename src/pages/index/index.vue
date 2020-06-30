<template>
  <view>
    <view style="padding: 20rpx;">
      <u-search placeholder="日照香炉生紫烟" input-align="center" shape="round" :clearabled="true" v-model="searchKey"></u-search>
    </view>
    <u-cell-group>
      <navigator v-for="(item) of list" :key="item._id" :url="`../content/index?content=${JSON.stringify(item)}`">
        <u-cell-item :title="item.companyName+$u.timeFormat(item.createTime, 'yyyy/mm/dd/ hh:MM:ss')" use-label-slot>
          <view class="u-line-2" slot="label">
            {{item.content}}
          </view>
        </u-cell-item>
      </navigator>
    </u-cell-group>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        searchKey: '',
        list: [],
        scrollTop: 0
      }
    },
    onLoad() {
      this.get()
    },
    methods: {
      get() {
        uni.showLoading({
          title: '处理中...'
        })
        uniCloud.callFunction({
          name: 'itBlackList',
          data: {
            current: 1,
            pageSize: 20,
            cityName: '石家庄'
          }
        }).then((res) => {
          uni.hideLoading()
          console.log(res)
          this.list = res.result.data
        }).catch((err) => {
          uni.hideLoading()
          uni.showModal({
            content: `查询失败，错误信息为：${err.message}`,
            showCancel: false
          })
        })
      },
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    }
  });
</script>

<style>
  .content {
    text-align: center;
    height: 400upx;
  }

  .logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }

  .title {
    font-size: 36upx;
    color: #8f8f94;
  }
</style>
