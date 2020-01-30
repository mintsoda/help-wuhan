<template>
  <div class="home">
    <div class="list-wrapper">
      <img src="../assets/banner.png" alt="">
      <van-tabs class="tab-list-wrapper" v-model="active" sticky color="#2272FF" title-active-color="#2272FF" title-inactive-color="#838083">
        <van-tab title="物资运输需求">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              :offset="50"
              v-model="isLoading"
              :finished="isFinished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul class="require-list-wrapper">
                <list-item v-for="item in list" itemType="goods" :key="item"></list-item>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="爱心运力池">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              :offset="50"
              v-model="isLoading"
              :finished="isFinished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul class="require-list-wrapper">
                <list-item v-for="item in list" itemType="help" :key="item"></list-item>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <div class="footer">
        <div class="button" @click="enterDemand">我找车，提报需求</div>
        <div class="button" @click="enterSupply">我有车，驰援武汉</div>
        <div class="button" @click="shareShow=true">分享</div>
      </div>
    </div>
    <!--m的分享弹层-->
    <div class="model" v-if="deviceType!=='weixin'&&shareShow" @scroll.stop  @click="shareShow=!shareShow">
      <div class="mask" @scroll.stop @touchmove.prevent></div>
      <div class="share-type-modal">
        <p>请使用浏览器的分享功能</p>
        <div class="share-type"><span>分享到:</span><span class="one"></span><span class="two"></span></div>
      </div>
    </div>
    <!--微信的分享弹层-->
    <div v-if="deviceType==='weixin'&&shareShow" class="wechat-tips" @click="shareShow=!shareShow"></div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem'

export default {
  name: 'home',
  components: {
    ListItem
  },
  data: () => ({
    // 分享蒙层是否展示
    shareShow: false,
    active: 0,
    isLoading: false,
    isFinished: false,
    refreshing: false,
    list: []
  }),
  created () {
    // 微信分享
    this.wxsharePage()
    // app分享
    this.appShareBtn()
  },
  methods: {
    enterDemand () {
      this.$router.push('/demand')
    },
    enterSupply () {
      this.$router.push('/supply')
    },
    share () {

    },
    onLoad () {
      console.log(2222)
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.isLoading = false
        console.log(this.list.length)
        if (this.list.length >= 40) {
          this.isFinished = true
        }
      }, 1000)
    },
    onRefresh () {
      console.log(1111)
      // 清空列表数据
      this.isFinished = false

      // 重新加载数据
      // 将 isLoading 设置为 true，表示处于加载状态
      this.isLoading = true
      this.onLoad()
    }
  }
}
</script>
<style lang="less">
  .list-wrapper {
    background:rgba(248,248,248,1);
    min-height: 100vh;
    img {
      width: 100%;
    }
  }
  .require-list-wrapper{
    background:rgba(248,248,248,1);
  }
  .list-wrapper .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height:50px;
    box-shadow:0px -1px 0px 0px rgba(246,246,246,1);
  }

  .list-wrapper .footer .button {
    color: #fff;
    font-size: 12px;
    line-height: 36px;
    padding: 0 15px;
    margin-right: 10px;
    border-radius: 18px;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    background: #FF4620;
  }
  .list-wrapper .footer .button:first-child {
    background: #2272FF;
  }
  .list-wrapper .footer .button:last-child {
    margin: 0;
    color:rgba(34,114,255,1);
    width: 64px;
    background: rgba(34,114,255,0.1)
  }

  .van-pull-refresh__track {
    min-height: 100vh;
  }
  .van-tabs__line{
    width:30px!important;
  }
  .list-wrapper .tab-list-wrapper{
    margin-bottom: 50px;
  }
  /*分享样式*/
  @font-face {
    font-family: special;
    src: url(//at.alicdn.com/t/font_1112743_17m26hvhwqo.eot);
    src: url(//at.alicdn.com/t/font_1112743_17m26hvhwqo.eot#iefix) format("embedded-opentype"),url(//at.alicdn.com/t/font_1112743_17m26hvhwqo.woff2) format("woff2"),url(//at.alicdn.com/t/font_1112743_17m26hvhwqo.woff) format("woff"),url(//at.alicdn.com/t/font_1112743_17m26hvhwqo.ttf) format("truetype"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E") format("svg")
  }
  .model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }
  .share-type-modal {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 200px;
    height: 82px;
    background: #fff;
    bottom: 40px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 1000;
  }
  .share-type-modal p {
    font-weight: 700;
    color: #17181a;
  }
  .share-type-modal .share-type,.share-type-modal p {
    font-size: 14px;
    text-align: left;
    line-height: 30px;
  }
  .share-type-modal .share-type span {
    font-family: special;
    font-size: 14px;
    float: left;
  }
  .share-type-modal .share-type .one {
    width:30px;
    height: 30px;
    background: #00b700;
    border-radius: 5px;
    text-align: center;
    margin-left: 10px;
  }
  .share-type-modal .share-type .one:after {
    content: "\e600";
    font-size: 24px;
    color: #fff;
  }
  .share-type-modal .share-type .two {
    background: url(https://s.kcimg.cn/m-bigcar/img/wechat.png) no-repeat 50%;
    background-size: 30px;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    font-size: 24px;
  }
  .share-type-modal:after {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    content: "";
    bottom: -8px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 4px solid #fff;
  }
  .wechat-tips{
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8) url(https://s.kcimg.cn/public/images/wechat-share.png) no-repeat 100% 0;
    background-size: 205px 216px;
  }
</style>
