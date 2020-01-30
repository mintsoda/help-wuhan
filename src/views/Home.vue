<template>
  <div class="home">
    <div class="list-wrapper">
      <img src="../assets/banner.png" alt="">
      <van-tabs v-model="active" sticky color="#2272FF" title-active-color="#2272FF" title-inactive-color="#838083">
        <van-tab title="物资运输需求">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :offset="50">
            <van-list
              v-model="isLoading"
              :isFinished="isFinished"
              isFinished-text="没有更多了"
              @load="onLoad"
            >
              <ul class="require-list-wrapper">
                <list-item v-for="item in list" :key="item"></list-item>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="爱心运力池">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :offset="50">
              <van-list
                v-model="isLoading"
                :isFinished="isFinished"
                isFinished-text="没有更多了"
                @load="onLoad"
              >
                <ul class="require-list-wrapper">
                  <list-item v-for="item in list" :key="item"></list-item>
                </ul>
              </van-list>
            </van-pull-refresh>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <div class="footer">
        <a href="/app/ntocc/wuhan/demand" class="" style="background: #2272FF;">我找车，提报需求</a>
        <a href="/app/ntocc/wuhan/supply" class="" style="background: #FF4620;">我有车，驰援武汉</a>
        <a href="javascript:;"  style="background: rgba(34,114,255,0.1);">分享</a>
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
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.isLoading = false

        if (this.list.length >= 40) {
          this.isFinished = true
        }
      }, 1000)
    },
    onRefresh () {
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

  .list-wrapper .footer a {
    color: #fff;
    font-size: 12px;
    line-height: 36px;
    padding: 0 15px;
    margin-right: 10px;
    border-radius: 18px;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
  }

  .list-wrapper .footer a:last-child {
    margin: 0;
    color:rgba(34,114,255,1);
    width: 64px;
  }

  .van-pull-refresh__track {
    min-height: 100vh;
  }
  .van-tabs__line{
    width:30px!important;
  }
</style>
