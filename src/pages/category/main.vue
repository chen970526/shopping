<template>
  <view>
    <searchBox> <icon type="search" size="14" color="#ccc" />搜索 </searchBox>
    <view class="index">
      <view class="left">
        <scroll-view class="scroll_left" :scroll-y="true">
          <view
            @tap="changindex(index)"
            class="left_item"
            :class="{ active: activeIndex === index }"
            v-for="(item, index) in categories_left_List"
            :key="index"
            >{{ item.cat_name }}</view
          >
        </scroll-view>
      </view>

      <view class="right">
        <scroll-view class="scroll_right" :scroll-y="true">
          <view v-for="(item, index) in categories_right_List" :key="index">
            <view class="right_title" v-if="item.children">{{
              item.cat_name
            }}</view>
            <view class="box" v-if="item.children">
              <view v-for="(v, i) in item.children" :key="i" class="right_item">
                <view class="right_item_image">
                  <navigator
                    :url="'/pages/goods_list/main?cid=' + v.cat_id"
                    hover-class="none"
                  >
                    <image :src="v.cat_icon" mode="" />
                  </navigator>
                </view>
                <view class="right_item_title">{{ v.cat_name }}</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import searchBox from '@/components/search/main'

let categoriesAll = []
export default {

  data() {
    return {
      activeIndex: 0,
      categories_left_List: [],
      categories_right_List: []
    }
  },
  components: {
    searchBox
  },
  onLoad() {
    // console.log(uni.getStorageSync('categoriesAll'));
    if (uni.getStorageSync('categoriesAll')) {
      console.log(uni.getStorageSync('outtime') + 10 * 60 * 1000);
      console.log(+new Date());
      if (uni.getStorageSync('outtime') + 10 * 60 * 1000 < +new Date()) {
        this.getcategoriesList()

      } else {
        categoriesAll = uni.getStorageSync('categoriesAll');
        this.categories_left_List = categoriesAll.map(item => {
          return {
            cat_id: item.cat_id,
            cat_name: item.cat_name
          }
        });
        this.categories_right_List = [...categoriesAll[0].children]
      }

    } else {
      this.getcategoriesList()
    }
  },
  methods: {
    // 获取分类列表
    async getcategoriesList() {
      categoriesAll = await this.$https({
        url: '/categories'
      });
      // console.log(categoriesAll);
      this.categories_left_List = categoriesAll.map(item => {
        return {
          cat_id: item.cat_id,
          cat_name: item.cat_name
        }
      });
      this.categories_right_List = [...categoriesAll[0].children]
      uni.setStorageSync('categoriesAll', categoriesAll)
      uni.setStorageSync('outtime', +new Date())
      // console.log(this.categories_left_List);
      // console.log(this.categories_right_List);
    },

    // 切换列表
    changindex(index) {
      this.activeIndex = index
      this.categories_right_List.length = []
      // console.log(categoriesAll);
      setTimeout(() => {
        this.categories_right_List = [...categoriesAll[index].children]
      }, 50);

    }
  }
}
</script>

<style lang='less'>
.index {
  display: flex;
  .left {
    background-color: #f3f3f3;
    width: 182rpx;
    height: calc(100vh - 100rpx);

    /* #ifdef H5 */
    height: calc(100vh - 100rpx - 44px - 50px);
    /* #endif */
    overflow: hidden;
    .scroll_left {
      height: 100%;
      .left_item {
        position: relative;
        font-size: 28rpx;
        height: 43rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20rpx 0;
      }
      .active {
        color: #eb4450;
        background-color: #fff;
        &::before {
          position: absolute;
          content: '';
          left: 0;
          width: 4rpx;
          height: 28rpx;
          background-color: #eb4450;
        }
      }
    }
  }
  .right {
    flex: 1;
    height: calc(100vh - 100rpx);

    /* #ifdef H5 */
    height: calc(100vh - 100rpx - 44px - 50px);
    /* #endif */
    overflow: hidden;
    .scroll_right {
      height: 100%;
    }
    .right_title {
      font-size: 26rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18rpx 0;
      &::before,
      &::after {
        content: '/';
        padding: 0 8rpx;
        color: #9c9c9c;
      }
    }
    .box {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20rpx;
      .right_item {
        width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .right_item_image {
          image {
            width: 120rpx;
            height: 120rpx;
          }
        }
        .right_item_title {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
