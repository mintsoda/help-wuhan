<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    if (this.deviceType === 'weixin') {
      // 微信注册微信信息
      this.wxConfig()
    }
  },
  mounted () {
    this.connectWebViewJavascriptBridge(bridge => {
      bridge.init((message, responseCallback) => {})
    })
    this.callNativeMethod('onChangeWebTitle', {
      'changeWebTitle': this.shareLink.title
    })
  }
}
</script>
<style lang="less">
  @import './mixin/public.css';
  @font-face {
    font-family: 'wuhan';  /* project id 1623582 */
    src: url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.eot');
    src: url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.woff') format('woff'),
    url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1623582_k92gr7qfm8s.svg#wuhan') format('svg');
  }
.van-cell-group {
  margin-bottom: 10px;
}
</style>
