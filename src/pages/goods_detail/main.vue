<template>
  <view class="content">
    <view class="content_top">
      <swiper
        class="swiper_box"
        :indicator-dots="true"
        indicator-color="#93928f"
        indicator-active-color="#eb4450"
        :circular="true"
      >
        <swiper-item
          class="swiper_item"
          v-for="(item, index) in swiperList"
          :key="index"
        >
          <image :src="item.pics_big" mode="heightFix" />
        </swiper-item>
      </swiper>
      <view class="goods_data">
        <view class="goods_data_top">
          <view class="price">{{ price }}</view>
          <view class="start">
            <view>分享</view>
            <view>收藏</view>
          </view>
        </view>
        <view class="goods_data_buttom">
          <text class="goods_detail">{{ titel }}</text>
        </view>
      </view>
    </view>
    <view class="content_buttom">
      <rich-text :nodes="content"></rich-text>
    </view>
    <view class="car_box">
      <view class="kefu iconfont icon-kefu">联系客服</view>
      <view class="car iconfont icon-gouwuche">购物车</view>
      <view class="addcar addcar_color">加入购物车</view>
      <view class="play play_color">立即购买</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsId: '',
      goodsData: {},
      swiperList: [],
      price: '',
      titel: '',
      content: ''
    }
  },
  onLoad(data) {
    console.log(data);
    this.goodsId = data.goods_id
    this.getGoodsDetail()
  },
  methods: {
    // 获取商品详情
    getGoodsDetail() {
      this.$https({
        url: '/goods/detail',
        params: {
          goods_id: this.goodsId
        }
      }).then(res => {
        console.log(res);
        this.goodsData = res
        let { pics, goods_price, goods_name, goods_introduce } = res

        this.swiperList = pics
        this.price = goods_price
        this.titel = goods_name
        goods_introduce = goods_introduce.replace(/<img/g, '<img class="rich_image"');
        const { system } = uni.getSystemInfoSync();
        console.log(system);
        if (system.includes('iOS')) {
          goods_introduce = goods_introduce.replace(/webp/g, 'jpg');
        };
        this.content = goods_introduce
      })
    }
  }
}
</script>

<style lang='less'>
.rich_image {
  vertical-align: middle;
}
page {
  .content {
    background-color: #f9f9f9;
    .content_top {
      background-color: #fff;
      padding: 0 35rpx;
      margin-bottom: 19rpx;
      .swiper_box {
        width: 497rpx;
        height: 497rpx;
        margin: 0 auto;
        .swiper_item {
          width: 100%;
          height: 100%;
        }
      }
      .goods_data {
        .goods_data_top {
          display: flex;
          justify-content: space-between;
          padding-bottom: 19rpx;
          .start {
            display: flex;
          }
        }
        .goods_data_buttom {
          .goods_detail {
            font-size: 30rpx;
          }
        }
      }
    }
    .content_buttom {
      background-color: #fff;
      height: 1000rpx;
    }
    .car_box {
      display: flex;
      align-items: center;
      position: fixed;
      height: 94rpx;
      width: 100%;
      bottom: 0;
      background-color: #fff;
      border-top: 1px solid #ccc;
      display: flex;
      .kefu,
      .car {
        display: flex;
        font-size: 20rpx;
        flex: 1;
        flex-direction: column;
        align-items: center;
        &::before {
          font-size: 40rpx;
        }
      }

      .addcar,
      .play {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30rpx;
        width: 196rpx;
        height: 60rpx;
        font-size: 26rpx;
        color: #fff;
      }
      .addcar_color {
        background-color: #fcaa23;
        margin-right: 22rpx;
      }
      .play_color {
        background-color: #ea4350;
        margin-right: 30rpx;
      }
    }
  }
}
</style>
