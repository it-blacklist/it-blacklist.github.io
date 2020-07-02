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
    <view class="menu-icon u-padding-10">
      <u-icon name="list" color="#909399" size="60" @click="popupShow=true"></u-icon>
    </view>
    <u-popup v-model="popupShow" width="550" border-radius="30" mode="bottom">
      <view>
        <view class="u-flex user-box u-p-30">
          <view class="u-m-r-10 user-avatar">
            <!-- #ifdef MP-WEIXIN || MP-BAIDU -->
            <open-data type="userAvatarUrl"></open-data>
            <!--#endif -->
            <!-- #ifndef MP-WEIXIN || MP-BAIDU-->
            <image src="https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/logo.jpg" />
            <!-- #endif -->
          </view>
          <view class="u-flex-1">
            <view class="u-font-14 u-tips-color">如果你觉得小程序还不错，分享给你身边的IT从业者，或者请作者喝杯茶。</view>
          </view>
        </view>
        <u-cell-group class="u-m-t-20">
          <navigator url="../create/index">
            <u-cell-item icon="edit-pen-fill" title="贡献一条黑名单"></u-cell-item>
          </navigator>
          <navigator url="../feedback/index">
            <u-cell-item icon="email-fill" title="留言"></u-cell-item>
          </navigator>
          <navigator url="../statement/index">
            <u-cell-item icon="info-circle-fill" title="特别声明"></u-cell-item>
          </navigator>
          <u-cell-item @click="handleOpen()" icon="github-circle-fill" title="GitHub"></u-cell-item>
          <u-cell-item @click="clickImg()" icon="gift-fill" title="打赏"></u-cell-item>
        </u-cell-group>
      </view>
    </u-popup>
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
        loadingStatus: 'loadmore',
        popupShow: false,
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
    onShareAppMessage() {

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
      clickImg() {
        uni.previewImage({
          urls: ['https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/wechat.jpg',
            'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/alipay.jpg'
          ]
        })
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    }
  });
</script>

<style lang="scss">
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

  .user-avatar {
    width: 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    border-radius: 50%;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .menu-icon {
    position: fixed;
    top: 120rpx;
    left: 40rpx;
    z-index: 99;
    background: rgba(225, 225, 225, .7);
    border-radius: 20rpx;
  }
</style>
