<template>
  <view class="search_bar">
    <view class="text">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less">
.search_bar {
  background-color: #eb4450;
  height: 100rpx;
  width: 750rpx;
  padding: 10rpx 25rpx;
  box-sizing: border-box;

  .text {
    width: 700rpx;
    height: 80rpx;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #767676;
    border-radius: 8rpx;  
  }
}
</style>