<template>
  <view class="content">
    <view class="goods_List">
      <view class="redio_box">
        <radio
          v-for="(item, index) in cartListData"
          :key="index"
          :checked="item.state"
          color="#eb4450"
          @tap="handlestate(index)"
        ></radio>
      </view>
      <GoodsItem v-if="cartListData" :goodsList="cartListData" />
    </view>
    <view class="count_black">
      <view class="checked_all">
        <label>
          <radio
            @tap="hendlecheckedAll"
            :checked="checkedAll"
            color="eb4450"
          ></radio>
          <text>全选</text>
        </label>
      </view>
      <view class="total">
        <text class="heji">合计：</text>
        <text class="price">{{ totalPrices }}</text>
      </view>
      <view class="pay">去结算(0)</view>
    </view>
  </view>
</template>

<script>
import GoodsItem from '@/components/goods_item/main'

export default {
  data() {
    return {
      cartListData: []
    }
  },
  components: {
    GoodsItem
  },
  onLoad() {
    // console.log(uni.getStorageSync('cartList'));

  },
  onShow() {
    this.cartListData = uni.getStorageSync('cartList')
  },
  methods: {
    // 处理全选
    hendlecheckedAll() {
      const ischecked = !this.checkedAll
      this.cartListData.forEach(item => {
        item.state = ischecked
      })
      this.storageData()
    },
    // 处理单选
    handlestate(index) {
      this.cartListData[index].state = !this.cartListData[index].state
      this.storageData()
    },
    //存储数据
    storageData() {
      console.log('我存储了');
      uni.setStorageSync('cartList', this.cartListData)
    }
  },
  computed: {
    //计算价格
    totalPrices() {
      let count = 0
      this.cartListData.forEach(item => {
        if (item.state) {
          count += item.goods_price * item.amount
        }
      })
      return count
    },
    //判断是否全选状态
    checkedAll() {
      if (this.cartListData.length === 0) { return false }
      if (this.cartListData.every(item => {
        return item.state
      })) {
        return true
      } else {
        return false
      }

    }
  }
}
</script>

<style lang='less'>
.content {
  padding-top: 30rpx;
  position: relative;

  .goods_List {
    display: flex;
    .redio_box {
      display: flex;
      flex-direction: column;
      radio {
        padding: 75rpx 0 75rpx 20rpx;
      }
    }
  }
  .count_black {
    position: fixed;
    /* #ifdef H5 */
    bottom: 50px !important;
    /* #endif */
    /* #ifdef MP-WEIXIN */
    bottom: 0;
    /* #endif */
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;
    height: 83rpx;
    .checked_all {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      radio {
        padding: 0 24rpx;
      }
      text {
        font-size: 21rpx;
        color: #8a8a8a;
        font-weight: 700;
      }
    }
    .total {
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        font-size: 28rpx;
      }
      .heji {
        padding: 0 10rpx 0 30rpx;
        font-size: 26rpx;
        font-weight: 700;
      }
    }
    .pay {
      position: absolute;
      right: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150rpx;
      height: 52rpx;
      background-color: #eb4450;
      color: #fff;
      font-size: 21rpx;
      border-radius: 26rpx;
    }
  }
}
</style>
