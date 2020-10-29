<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="less">
@import '/src/styles/icon.less';
.price {
  color: #eb4450;
  font-size: 36rpx;
  &::before {
    font-size: 30rpx;
    content: '￥';
  }
}
/*每个页面公共css */
</style>
