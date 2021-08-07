<template>
  <view>
    <u-navbar :is-back="false" title="IT黑企">
      <view class="top-bar">
        <u-icon name="map"></u-icon>
        <view type="select" @click="selectShow = true">{{city}}</view>
        <u-select v-model="selectShow" mode="mutil-column-auto" :list="cityList" @confirm="cityConfirm"></u-select>
      </view>
    </u-navbar>
    <view class="u-padding-20">
      <u-search placeholder="输入公司名称搜索…" input-align="center" shape="round" clearabled v-model="searchKey"
        @search="confirmSearch" @custom="confirmSearch"></u-search>
    </view>
    <navigator v-if="system.show" url="/pages/statement/index" hoverClass="none">
      <u-notice-bar :list="['置顶公告']" more-icon mode="vertical"></u-notice-bar>
    </navigator>
    <u-cell-group>
      <navigator v-for="(item) of list" :key="item._id" :url="`../content/index?_id=${item._id}`">
        <u-cell-item :title="item.company" use-label-slot>
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
            <open-data type="userAvatarUrl"></open-data>
          </view>
          <view class="u-flex-1">
            <view class="u-font-14 u-tips-color">如果您觉得小程序还不错，分享给您身边的IT从业者，或者点击下方的打赏，请作者喝杯茶。</view>
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
        cityList: [],
        selectShow: false,
        city: '石家庄'
      }
    },
    onLoad() {
      this.getList()
      getApp().getConfig().then(r => {
        this.system = r
      })
      this.$u.http.post('list/count').then(r => {
        this.total = r.total
      })
      getApp().getCityList().then(r => {
        this.cityList = r
      })
    },
    onPullDownRefresh() {
      this.resetData()
      this.getList()
    },
    onReachBottom() {
      console.log('到底了')
      this.loadingStatus !== 'nomore' && this.getList()
    },
    methods: {
      confirmSearch() {
        this.current = 0
        this.list = []
        this.getList()
      },
      getList(city = this.city, company = this.searchKey) {
        this.loadingStatus = 'loading'
        this.$u.http.post('list/get', {
          current: ++this.current,
          pageSize: 20,
          city,
          company
        }).then(res => {
          uni.stopPullDownRefresh()
          if (res?.length) {
            this.loadingStatus = 'loadmore'
            this.list = [...this.list, ...res]
          } else {
            this.loadingStatus = 'nomore'
          }
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
        this.resetData({
          city: e[1].value
        })
        this.getList(e[1].value)
      },
      resetData(params) {
        Object.assign(this.$data, {
          ...this.$options.data(),
          system: getApp().globalData.system,
          total: this.$data.total,
          city: this.$data.city,
          ...params,
        })
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onShareAppMessage() {},
  });
</script>

<style lang="scss">
  @import './style.scss'
</style>
