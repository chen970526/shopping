<template>
  <view class="goods_list">
    <navigator
      class="goods_item"
      v-for="(item, index) in goodsList"
      :key="index"
      :url="'/pages/goods_detail/main?goods_id=' + item.goods_id"
      hover-class="none"  
    >
      <view class="goods_item_left"
        ><image :src="item.goods_small_logo || '/static/empty.png'" mode=""
      /></view>
      <view class="goods_item_right">
        <text class="goods_item_text">{{ item.goods_name }}</text>
        <text class="goods_item_price">{{ item.goods_price || '非卖品' }}</text>
      </view>
    </navigator>
  </view>
</template>

<script>
export default {
  props: ['goodsList'],
  // onLoad() {
  //   console.log(123);
  //   console.log(this.goodsList);
  // },
  mounted() {
    // console.log(123);
    console.log(this.goodsList);
  }
}
</script>

<style lang='less'>
.goods_list {
  .goods_item {
    display: flex;
    padding: 0 26rpx;
    .goods_item_left {
      padding-right: 20rpx;
      image {
        width: 191rpx;
        height: 191rpx;
      }
    }
    .goods_item_right {
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .goods_item_text {
        color: #434343;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .goods_item_price {
        color: #ea4350;
        display: block;
        &::before {
          content: '￥';
        }
      }
    }
  }
}
</style>