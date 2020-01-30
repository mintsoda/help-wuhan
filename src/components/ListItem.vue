<template>
  <li class="require-list">
    <div class="item-header" v-if="itemType==='goods'">
      <h4>赤湾东方物</h4>
      <div class="time">01-30 17:21</div>
    </div>
    <div class="item-place">
      <h3>昆山市</h3>
      <img src="../assets/fangwang.png" alt="发往"/>
      <div class="heart-send">
        <i class="heart"></i>
        武汉市
      </div>
    </div>
    <div class="require-footer">
      <ul class="item-content" v-if="itemType==='goods'">
        <li><label>运输物资：</label><span>食品食品32吨食品32吨食品32吨食品32吨食品32吨食品32吨32吨</span></li>
        <li><label>车辆需求：</label><span>13米高栏</span></li>
        <li><label>用车时间：</label><span>1月31日</span></li>
        <li><label>备注说明：</label><span>1月31日</span></li>
      </ul>
      <ul class="item-content" v-else>
        <li><label>运力信息：</label><span>食品食品32吨食品32吨食品32吨食品32吨食品32吨食品32吨32吨</span></li>
        <li><label>爱心使者：</label><span>13米高栏</span></li>
        <li><label>备注说明：</label><span>1月31日</span></li>
      </ul>
      <div class="item-phone" style="justify-content: flex-end;">
        <a href="tel://15312672772"><i class="call"></i><span>联系人: 刘航</span></a></div>
    </div>
  </li>
</template>
<script>
export default {
  props: ['itemType'],
  data () {
    return {}
  },
  created () {

  },
  methods: {}
}
</script>
<style lang="less" scoped>
  .require-list {
    margin: 12px;
    padding: 9px 12px 12px 12px;
    background: #fff;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 12px 0px rgba(22, 24, 27, 0.02);
    border-radius: 4px;

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 9px 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin: 0;
        flex: 1;
      }

      .time {
        width: 100px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
        line-height: 12px;
        text-align: right;
      }
    }

    .item-place {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 10px;
      padding: 12px 0;

      h3 {
        width: 137px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        text-align: center;
      }

      img {
        width: 54px;
        margin-top: 6px;
      }

      div {
        color: #FF4620;
        font-weight: 600;
        font-size: 20px;
      }

      div i {
        margin-right: 4px;
      }
      .heart-send{
        padding-left: 20px;
        flex: 1;
        text-align: center;
      }
      .heart{
        position: relative;
      }
      .heart::before{
        background: url("../assets/heart.png");
        background-size: cover;
        width: 20px;
        height: 20px;
        content: '';
        position: absolute;
        left: -20px;
        top: 1px;
      }
    }
    .require-footer{
      display: flex;
    }
    .item-content {
      flex: 1;
      font-size: 12px;
      color:rgba(0,0,0,1);
    }
    .item-phone {
      width: 106px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
    }
    .item-phone a {
      display: block;
      width: 106px;
      padding: 0 5px 0 16px;
      box-sizing: border-box;
      line-height: 28px;
      height:28px;
      background:rgba(34,114,255,1);
      font-size: 12px;
      border-radius:14px;
      text-align: center;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .call{
        position: relative;
      }
      .call::before{
        background: url("../assets/call.png");
        background-size: cover;
        width: 11px;
        height: 12px;
        content: '';
        position: absolute;
        left: -11px;
        top: 1px;
      }
    }
  }
</style>
