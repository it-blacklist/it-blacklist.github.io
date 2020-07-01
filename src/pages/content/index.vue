<template>
  <u-card :title="content.companyName" :sub-title="$u.timeFormat(content.createTime, 'yyyy/mm/dd hh:MM')" full>
    <view class="" slot="body">
      <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
        <view class="u-body-item-title">{{content.content}}</view>
      </view>
    </view>
    <view class="" slot="foot">
      <u-icon name="chat-fill" size="34" color="" label="网友评论"></u-icon>
    </view>
  </u-card>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        content: {}
      };
    },
    onLoad({
      content
    }) {
      if (content) {
        console.log(content)
        this.content = JSON.parse(content)
      }
    }
  }
</script>

<style scoped>
  .u-card-wrap {
    background-color: $u-bg-color;
    padding: 1px;
  }

  .u-body-item {
    font-size: 32rpx;
    color: #333;
    padding: 20rpx 10rpx;
  }
</style>
