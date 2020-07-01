<template>
  <view>
    <view class="u-padding-20">
      <u-search placeholder="输入公司名称搜索…" input-align="center" shape="round" clearabled v-model="searchKey" @search="confirmSearch"
        @custom="confirmSearch"></u-search>
    </view>
    <u-cell-group>
      <navigator v-for="(item) of list" :key="item._id" :url="`../content/index?content=${JSON.stringify(item)}`">
        <u-cell-item :title="item.companyName" use-label-slot>
          <view class="u-line-2" slot="label">
            {{item.content}}
          </view>
        </u-cell-item>
      </navigator>
    </u-cell-group>
    <view class="u-padding-20">
      <u-loadmore :status="loadingStatus" icon-type="iconType" />
    </view>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        searchKey: '',
        current: 0,
        list: [],
        scrollTop: 0,
        loadingStatus: 'loadmore'
      }
    },
    onLoad() {
      this.get()
    },
    onPullDownRefresh() {
      this.current = 0
      this.list = []
      this.searchKey = ''
      this.loadingStatus = 'loadmore'
      this.get()
      uni.stopPullDownRefresh()
    },
    onReachBottom() {
      console.log('到底了')
      this.loadingStatus !== 'nomore' && this.get()
    },
    methods: {
      confirmSearch() {
        this.current = 0
        if (this.searchKey) {
          uni.showLoading({
            title: '处理中...'
          })
          this.loadingStatus = 'loading'
          uniCloud.callFunction({
            name: 'itBlackListSearch',
            data: {
              companyName: this.searchKey,
              cityName: '石家庄'
            }
          }).then((res) => {
            console.log(res)
            uni.hideLoading()
            this.list = res.result.data
            this.loadingStatus = 'nomore'
          }).catch((err) => {
            uni.hideLoading()
            uni.showModal({
              content: `查询失败，错误信息为：${err.message}`,
              showCancel: false
            })
          })
        } else {
          this.get()
          this.list = []
        }
      },
      get() {
        uni.showLoading({
          title: '处理中...'
        })
        this.loadingStatus = 'loading'
        uniCloud.callFunction({
          name: 'itBlackList',
          data: {
            current: ++this.current,
            pageSize: 10,
            cityName: '石家庄'
          }
        }).then((res) => {
          console.log(res)
          uni.hideLoading()
          if (res.result.data && res.result.data.length) {
            this.loadingStatus = 'loadmore'
            this.list = [...this.list, ...res.result.data]
          } else {
            this.loadingStatus = 'nomore'
          }
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
