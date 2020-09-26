<template>
  <view>
    <u-navbar :is-back="false" title="IT黑企">
      <view class="top-bar">
        <u-icon name="map"></u-icon>
        <view type="select" @click="selectShow = true">{{cityName}}</view>
        <u-select v-model="selectShow" mode="mutil-column-auto" :list="cityList" @confirm="cityConfirm"></u-select>
      </view>
    </u-navbar>
    <navigator v-if="system.show" url="/pages/statement/index" hoverClass="none">
      <u-notice-bar :list="['置顶公告']" more-icon mode="vertical"></u-notice-bar>
    </navigator>
    <view class="u-padding-20">
      <u-search placeholder="输入公司名称搜索…" input-align="center" shape="round" clearabled v-model="searchKey" @search="confirmSearch"
        @custom="confirmSearch"></u-search>
    </view>
    <u-cell-group>
      <navigator v-for="(item) of list" :key="item._id" :url="`../content/index?_id=${item._id}`">
        <u-cell-item :title="item.companyName" use-label-slot>
          <view v-show="system.show" class="u-line-2" slot="label">
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
        <u-alert-tips type="info" :description="`截至目前系统已收录${total}条公司信息`"></u-alert-tips>
        <view class="u-flex user-box u-p-30">
          <view class="u-m-r-10 user-avatar">
            <!-- #ifdef MP-WEIXIN ||MP-QQ -->
            <open-data type="userAvatarUrl"></open-data>
            <!--#endif -->
            <!-- #ifndef MP-WEIXIN ||MP-QQ -->
            <image src="https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/logo.png" />
            <!-- #endif -->
          </view>
          <view class="u-flex-1">
            <view class="u-font-14 u-tips-color">如果您觉得小程序还不错，分享给您身边的IT从业者，或者点击下方的打赏，请作者喝杯肥宅快乐水。</view>
          </view>
        </view>
        <u-cell-group class="u-m-t-20">
          <navigator v-show="system.show" url="../create/index">
            <u-cell-item icon="edit-pen-fill" title="贡献一条黑名单"></u-cell-item>
          </navigator>
          <navigator url="../feedback/index">
            <u-cell-item icon="email-fill" title="留言"></u-cell-item>
          </navigator>
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
        total: 0,
        scrollTop: 0,
        loadingStatus: 'loadmore',
        popupShow: false,
        system: {},
        cityList:[],
        selectShow: false,
        cityName: '石家庄'
      }
    },
    onLoad() {
      this.get()
      getApp().getConfig().then(r => {
        this.system = r
      })
      uniCloud.callFunction({
        name: 'itBlackListCount'
      }).then((res) => {
        this.total = res.result.total
      }).catch((err) => {
        uni.showModal({
          content: `查询失败，错误信息为：${JSON.stringify(err)}`,
          showCancel: false
        })
      })
      uni.request({
        url:'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/cityList.json',
        success:(res)=> {
          if(res.statusCode===200){
            this.cityList = res.data
          }
        }
      })
    },
    onPullDownRefresh() {
      Object.assign(this.$data, { ...this.$options.data(),
        system: getApp().globalData.system,
        cityName: this.$data.cityName,
        total: this.$data.total,
      })
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
            title: '加载中...'
          })
          this.loadingStatus = 'loading'
          uniCloud.callFunction({
            name: 'itBlackListSearch',
            data: {
              companyName: this.searchKey,
              cityName: this.cityName
            }
          }).then((res) => {
            console.log(res)
            uni.hideLoading()
            this.list = res.result.data
            this.loadingStatus = 'nomore'
          }).catch((err) => {
            uni.hideLoading()
            uni.showModal({
              content: `查询失败，错误信息为：${JSON.stringify(err)}`,
              showCancel: false
            })
          })
        } else {
          this.get()
          this.list = []
        }
      },
      get(cityName = this.cityName) {
        uni.showLoading({
          title: '加载中...'
        })
        this.loadingStatus = 'loading'
        uniCloud.callFunction({
          name: 'itBlackList',
          data: {
            current: ++this.current,
            pageSize: 20,
            cityName
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
            content: `查询失败，错误信息为：${JSON.stringify(err)}`,
            showCancel: false
          })
        })
      },
      clickImg() {
        uni.previewImage({
          urls: ['https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/wechat.jpg',
            'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/alipay.jpg'
          ]
        })
      },
      cityConfirm(e) {
        Object.assign(this.$data, { ...this.$options.data(),
          cityName: e[1].value,
          system: getApp().globalData.system,
          total: this.$data.total,
        })
        this.get(e[1].value)
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onShareAppMessage() {},
  });
</script>

<style lang="scss">
  .top-bar {
    font-size: 32rpx;
    display: flex;
    padding: 20rpx;
    color: $u-type-primary;
  }

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
    top: 300rpx;
    left: 40rpx;
    z-index: 99;
    background: rgba(225, 225, 225, .7);
    border-radius: 20rpx;
  }
</style>
