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
                <list-item v-for="item in list" :key="item"></list-item>
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
                <list-item v-for="item in list" :key="item"></list-item>
              </ul>
            </van-list>
          </van-pull-refresh>

        </van-tab>
      </van-tabs>
      <div class="footer">
        <div class="button" @click="enterDemand">我找车，提报需求</div>
        <div class="button" @click="enterSupply">我有车，驰援武汉</div>
        <div class="button" @click="share">分享</div>
      </div>
    </div>
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
    active: 0,
    isLoading: false,
    isFinished: false,
    refreshing: false,
    list: []
  }),
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
</style>
