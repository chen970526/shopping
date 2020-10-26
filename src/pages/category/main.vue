<template>
  <view>
    <searchBox> <icon type="search" size="14" color="#ccc" />搜索 </searchBox>

    <view class="left">
      <view
        class="left_item"
        v-for="(item, index) in categoriesList"
        :key="index"
        >{{ item.cat_name }}</view
      >
    </view>
    <view class="right"> </view>
  </view>
</template>

<script>
import searchBox from '@/components/search'

export default {

  data() {
    return {
      categoriesList: []
    }
  },
  components: {
    searchBox
  },
  onLoad() {
    this.getcategoriesList()
  },
  methods: {
    // 获取分类列表
    getcategoriesList() {
      uni.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
        success: (res) => {
          console.log(res.data);
          this.categoriesList = res.data.message
        }
      });
    }
  }
}
</script>

<style lang='less'>
.left {
  background-color: #f3f3f3;
  width: 182rpx;
  height: 1000rpx;
  overflow: hidden;
  .left_item {
    font-size: 28rpx;
    height: 43rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 0;
  }
}
.right {
}
</style>
