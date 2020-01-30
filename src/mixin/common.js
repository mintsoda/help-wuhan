import XHR from '@/api'
export default {
  data: () => ({
    // 设备类型
    deviceType: '',
    topicUrl: 'https://topic.360che.com/m/2020010801/'
  }),
  created () {
    this.deviceType = this.getType()
  },
  computed: {},
  methods: {
    // 判断是什么端
    getType () {
      let uaCase = navigator.userAgent
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        return 'weixin'
      } else if (uaCase.toLowerCase().indexOf('360che') >= 0) {
        return 'app'
      } else if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
        return 'm'
      } else {
        return 'pc'
      }
    },
    // ios微信失去焦点问题
    onBlur () {
      let timer = setTimeout(() => {
        const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        timer && clearTimeout(timer)
      }, 100)
    },
    showErrorInfo (msg) {
      this.$showToast.show({
        text: msg,
        type: 'error',
        time: 1500
      })
    },
    // 微信注册
    wxConfig () {
      let wx = window.wx
      let json = {
        url: escape(window.location.href.split('#')[0])
      }
      XHR.getWechatJsSdk(json).then(res => {
        // 注册微信信息
        let data = res.data
        try {
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              // 分享操作接口
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ]
          })
        } catch (e) {}
      })
    },
    // 分享页面
    wxsharePage () {
      console.log(window.shareLink.desc)
      if (this.deviceType === 'weixin') {
        let wx = window.wx
        let shareUrl = window.location.href.split('#')[0]
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: window.shareLink.title, // 分享标题
            desc: window.shareLink.desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: window.shareLink.imgUrl, // 分享图标
            success: () => {
            }
          })
          wx.onMenuShareAppMessage({
            title: window.shareLink.title, // 分享标题
            desc: window.shareLink.desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: window.shareLink.imgUrl, // 分享图标
            success: () => {
            }
          })
        })
      }
    },
    appShareBtn () {
      if (this.deviceType === 'app') {
        let shareUrl = window.location.href.split('#')[0]
        this.callNativeMethod('onShowShareButton', {
          'isShow': true,
          title: window.shareLink.title, // 分享标题
          desc: window.shareLink.desc, // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: window.shareLink.imgUrl // 分享图标
        })
      }
    },
    callNativeMethod (method, param, callback) {
      let time = setInterval(function () {
        if (window.WebViewJavascriptBridge) {
          window.WebViewJavascriptBridge.callHandler(method, param, callback)
          clearInterval(time)
        };
      }, 50)
    },
    // 监听app回调
    connectWebViewJavascriptBridge (callback) {
      if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            callback(window.WebViewJavascriptBridge)
          },
          false
        )
      }
    },
    sendAnalytics (c, a, l) {
      setTimeout(() => {
        try {
          // eslint-disable-next-line
          ga('send', 'event', c, a, l)
        } catch (e) {}
      }, 0)
    }
  }
}
