<template>
  <view>
    <searchBox> <icon type="search" size="14" color="#ccc" />搜索 </searchBox>
    <view class="swiper">
      <swiper :indicator-dots="true" :circular="true" :autoplay="true">
        <swiper-item v-for="(item, index) in swiperdata" :key="index">
          <image mode="widthFix" :src="item.image_src"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="nvabox">
      <navigator
        class="nav"
        v-for="(item, index) in navList"
        :key="index"
        :open-type="item.open_type"
        :url="item.navigator_url"
      >
        <image mode="widthFix" :src="item.image_src"></image>
      </navigator>
    </view>
    <!-- 楼层 -->
    <view class="floorbox">
      <view class="floor" v-for="(item, index) in floorList" :key="index">
        <view class="floor_title">
          <image mode="heightFix" :src="item.floor_title.image_src"></image>
        </view>
        <view class="floor_item">
          <view class="floor_item_image">
            <navigator
              v-for="(v, i) in item.product_list"
              :key="i"
              :url="v.navigator_url"
              :open-type="v.open_type"
              :style="'width:' + v.image_width + 'rpx'"
              ><image
                :src="v.image_src"
                :style="'width:' + v.image_width + 'rpx'"
                :alt="v.name"
            /></navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchBox from '@/components/search'
export default {
  data() {
    return {
      swiperdata: [],
      navList: [],
      floorList: []
    }
  },
  components: {
    searchBox
  },
  onLoad() {
    this.getswiperdata()
    this.getnavList()
    this.getfloorList()
  },
  methods: {
    getswiperdata() {
      uni.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success: (res) => {
          // console.log(res.data)
          this.swiperdata = res.data.message;
        }
      });
    },
    getnavList() {
      // 导航图标
      uni.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        success: (res) => {
          // console.log(res.data)
          this.navList = res.data.message
        }
      });
    },
    getfloorList() {
      // 楼层
      uni.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
        success: (res) => {
          console.log(res.data)
          this.floorList = res.data.message
        }
      });
    }

  }
}
</script>

<style lang='less'>
swiper {
  height: 340rpx;

  swiper-item {
    image {
      width: 750rpx;
    }
  }
}

.nvabox {
  display: flex;
  justify-content: space-evenly;
  padding: 12rpx 0rpx;

  .nav {
    image {
      width: 128rpx;
    }
  }
}
.floorbox {
  padding-top: 43rpx;
  .floor {
    .floor_title {
      image {
        height: 60rpx;
        width: 750rpx;
      }
    }
    .floor_item {
      .floor_item_image {
        // height: 386rpx;
        width: 100%;
        float: left;
        padding: 10rpx 0 10rpx 12rpx;
        navigator {
          // box-sizing: border-box;
          // padding-right: 15rpx;
          margin-right: 15rpx;
          &:nth-child(1) {
            image {
              height: 386rpx;
            }
          }
          float: left;
          image {
            height: 188rpx;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
