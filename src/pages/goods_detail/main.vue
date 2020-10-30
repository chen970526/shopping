<template>
  <view class="content">
    <navigator
      open-type="navigateBack"
      hover-class="none"
      class="back iconfont icon-arrow-down"
    ></navigator>
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
          <image
            @tap="lookBigImg(index)"
            :src="item.pics_big"
            mode="heightFix"
          />
        </swiper-item>
      </swiper>
      <view class="goods_data">
        <view class="goods_data_top">
          <view class="price">{{ price }}</view>
          <view class="start">
            <view class="fenxiang iconfont icon-fenxiang">
              <button class="btn" open-type="share">分享</button>
            </view>
            <view class="favorite iconfont icon-favorite"></view>
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
      <view class="kefu iconfont icon-kefu">
        <button class="kefu_btn" open-type="contact">联系客服</button>
        联系客服</view
      >
      <navigator
        open-type="switchTab"
        url="/pages/cart/main"
        hover-class="none"
        class="car iconfont icon-gouwuche"
        >购物车</navigator
      >
      <view class="addcar addcar_color" @tap="addcartList">加入购物车</view>
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
    // 加入购物车
    addcartList() {
      let cartList = uni.getStorageSync('cartList') || []
      console.log(cartList);
      console.log(this.goodsData.goods_id);
      const index = cartList.findIndex(item => { return +item.goods_id === +this.goodsData.goods_id })
      if (index !== -1) {
        cartList[index].amount += 1
      } else {
        const addData = {
          goods_id: this.goodsData.goods_id,
          goods_name: this.goodsData.goods_name,
          goods_price: this.goodsData.goods_price,
          goods_small_logo: this.goodsData.goods_small_logo,
          state: false,
          amount: 1
        }
        cartList.push(addData)
      }
      uni.setStorageSync('cartList', cartList)
      uni.showToast({
        title: '添加成功',
        duration: 1000,
        mask: true
      });
    },
    // 点击查看大图
    lookBigImg(current) {

      uni.previewImage({
        urls: this.swiperList.map(item => {
          return item.pics_big
        }),
        current,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    },
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
    position: relative;
    .back {
      position: absolute;
      top: 48rpx;
      left: 25rpx;
      width: 70rpx;
      height: 70rpx;
      border-radius: 35rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.2);
      &::before {
        color: #fff;
        transform: rotate(90deg);
      }
    }
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
            .fenxiang,
            .favorite {
              font-size: 44rpx;
              padding-right: 20rpx;
            }
            .fenxiang {
              position: relative;

              .btn {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
              }
            }
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
      margin-bottom: 100rpx;
      font-size: 0;
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
      .kefu {
        position: relative;

        .kefu_btn {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
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
