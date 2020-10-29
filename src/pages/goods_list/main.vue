<template>
  <view
    ><searchBox> <icon type="search" size="14" color="#ccc" />搜索 </searchBox>
    <TabsBox :TabsBoxData="TabsBoxData" />
    <!-- #ifdef H5 -->
    <scroll-view
      class="goods_box"
      @scrolltolower="upgoodsListdata"
      scroll-y
      :refresher-enabled="H5isShow"
      :refresher-triggered="isShow"
      @refresherrefresh="initData"
      @scroll="logtop"
    >
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <scroll-view
      class="goods_box"
      @scrolltolower="upgoodsListdata"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="isShow"
      @refresherrefresh="initData"
    >
    <!-- #endif -->
      <GoodsItem
        :goodsList="goodsList"
        v-if="goodsList.length !== 0"
      />
      <text class="tips" :class="{ active: !keep }">我也是有底线的。。。</text>
    </scroll-view>
  </view>
</template>

<script>
import searchBox from '@/components/search/main'
import TabsBox from '@/components/tabs/main'
import GoodsItem from '@/components/goods_item/main'

export default {
  data() {
    return {
      TabsBoxData: [
        { id: 1, name: '综合' },
        { id: 2, name: '销量' },
        { id: 3, name: '价格' }
      ],
      pagenum: 1,
      pagesize: 10,
      cid: '',
      goodsList: [],
      keep: true,
      H5isShow: true,
      isShow: false,
      top: 0
    }
  },
  components: {
    GoodsItem,
    TabsBox,
    searchBox
  },
  onLoad(data) {
    // console.log(data.cid);
    this.cid = data.cid
    this.getgoodsListData()
  },
  methods: {
    // 获取列表信息
    async getgoodsListData() {
      this.$https({
        url: '/goods/search',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          cid: this.cid
        }
      }).then(res => {
        // console.log(res.goods);
        if (res.goods.length < this.pagesize) { this.keep = false }
        this.goodsList.push(...res.goods)
      })
    },
    // 上拉加载
    upgoodsListdata() {
      if (this.keep) {
        this.pagenum++
        this.getgoodsListData()
      } else {
        uni.showToast({
          title: "没有数据了。。。",
          duration: 2000
        });
      }
    },
    // 下拉刷新
    async initData(e) {
      this.isShow = true
      this.keep = true
      this.pagenum = 1
      this.goodsList.length = 0
      await this.getgoodsListData()
      uni.showToast({
        title: "已更新。。。",
        duration: 1000
      });
      // }
      this.isShow = false;
    },

    //#ifdef H5
    logtop(e) {
      // console.log(e.detail.scrollTop);
      this.top = e.detail.scrollTop
      if (this.top > 50) {
        // console.log('关闭下拉刷新');
        this.H5isShow = false
      } else {
        this.H5isShow = true
      }
    }
    //#endif
  }
}
</script>

<style lang='less'>
.goods_box {
  height: calc(100vh - 100rpx - 80rpx);
  /* #ifdef H5 */
  height: calc(100vh - 100rpx - 80rpx - 44px);
  /* endif */
  .tips {
    justify-content: center;
    align-items: center;
    height: 100rpx;
    border-top: 1rpx dashed #ccc;
    display: none;
  }
  .active {
    display: flex;
  }
}
</style>
