<template>
  <view class="index">
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
    async getswiperdata() {
      this.swiperdata = await this.$https({
        url: '/home/swiperdata'
      })
    },
    async getnavList() {
      this.navList = await this.$https({
        url: '/home/catitems'
      })

    },
    async getfloorList() {
      this.floorList = await this.$https({
        url: '/home/floordata'
      })
    }

  }
}
</script>

<style lang='less'>
.index {
  padding-bottom: 30rxp;
}
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
      height: 386rpx;

      .floor_item_image {
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
