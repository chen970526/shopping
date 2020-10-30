<template>
  <view class="goods_list">
    <view class="goods_item" v-for="(item, index) in goodsList" :key="index">
      <navigator
        :url="'/pages/goods_detail/main?goods_id=' + item.goods_id"
        hover-class="none"
      >
        <view class="goods_item_left"
          ><image :src="item.goods_small_logo || '/static/empty.png'" mode=""
        /></view>
      </navigator>
      <view class="goods_item_right">
        <text class="goods_item_text">{{ item.goods_name }}</text>
        <text class="goods_item_price">{{ item.goods_price || '非卖品' }}</text>
        <view class="counter_box" v-if="item.amount">
          <view
            @tap="changcount(index, -1)"
            class="subtract iconfont icon-minus-circle"
          ></view>
          <view class="counter">{{ item.amount }}</view>
          <view
            @tap="changcount(index, 1)"
            class="add iconfont icon-add-circle"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ['goodsList'],
  mounted() {
    // console.log(123);
    console.log(this.goodsList);
  },
  methods: {
    changcount(index, count) {
      console.log(index);
    }
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
      position: relative;
      display: flex;
      flex: 1;
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
      .counter_box {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 30rpx;
        bottom: 30rpx;
        color: #8a8a8a;
        font-size: 40rpx;
        .subtract,
        .add {
        }
        .counter {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 60rpx;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>