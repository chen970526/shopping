<template>
  <view class="TabsBox">
    <view
      class="TabsBox_item"
      :class="{ active: TabsBoxIndex === index }"
      v-for="(item, index) in TabsBoxData"
      :key="index"
      @tap="changIndex(index)"
      >{{ item.name }}</view
    >
  </view>
</template>

<script>
export default {
  props: ['TabsBoxData'],
  data() {
    return {
      TabsBoxIndex: 0
    }
  },
  methods: {
    changIndex(index) {
      this.TabsBoxIndex = index
    }
  }
}
</script>

<style lang="less">
.TabsBox {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .TabsBox_item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 184rpx;
    height: 88rpx;
    font-size: 30rpx;
  }
  .active {
    font-weight: 900;
    border-bottom: 3px solid #ea4350;
  }
}
</style>