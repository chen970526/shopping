<template>
  <view
    ><searchBox> <icon type="search" size="14" color="#ccc" />搜索 </searchBox>
    <TabsBox :TabsBoxData="TabsBoxData" />
    <scroll-view class="goods_box" @scrolltolower="upgoodsListdata" scroll-y>
      <GoodsItem :goodsList="goodsList" v-if="goodsList.length !== 0" />
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
      goodsList: []
    }
  },
  components: {
    GoodsItem,
    TabsBox,
    searchBox
  },
  onLoad(data) {
    console.log(data.cid);
    this.cid = data.cid
    this.getgoodsListData()
  },
  methods: {
    // 获取列表信息
    getgoodsListData() {
      this.$https({
        url: '/goods/search',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          cid: this.cid
        }
      }).then(res => {
        // console.log(res.goods);
        this.goodsList.push(...res.goods)
      })
    },
    upgoodsListdata() {
      // console.log(123);
      this.pagenum++
      this.getgoodsListData()
    }
  }
}
</script>

<style lang='less'>
.goods_box {
  height: calc(100vh - 100rpx - 80rpx);
  /* #ifdef H5 */
  height: calc(100vh - 100rpx - 80rpx - 44rpx);
  /* endif */
}
</style>
