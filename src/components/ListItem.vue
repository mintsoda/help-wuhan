<template>
  <li class="require-list">
    <div class="item-header"><h4>赤湾东方物流有限公司</h4><span
    >01-30 17:21</span></div>
    <div class="item-place"><h3>昆山市益海嘉里</h3>
      <div><i class="heart">&#xe636;</i>
        武汉市
      </div>
    </div>
    <ul class="item-content">
      <li><label>运输物资</label><span>食品32吨</span></li>
      <li><label>车辆需求</label><span>13米高栏</span></li>
      <li><label>用车时间</label><span>1月31日</span></li>
    </ul>
    <div class="item-phone" style="justify-content: flex-end;">
      <a href="tel://15312672772"><i class="call">&#xe60b;</i><span>联系人: 刘航</span></a></div>
  </li>
</template>
<script>
export default {
  props: [],
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
    background: #fff;
    padding-top: 12px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(22,24,27,0.02);
    border-radius:4px;
  }

  .require-list .item-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 0 12px;
  }

  .require-list .item-header h4 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  .require-list .item-header span {
    font-size: 12px;
    color: #8a8a8a;
  }

  .require-list .item-place {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 12px;
  }

  .require-list .item-place h3 {
    font-size: 16px;
    max-width: 35%;
  }

  .require-list .item-place img {
    width: 70px;
  }

  .require-list .item-place div {
    color: #ed2f2f;
    font-weight: 700;
  }

  .require-list .item-place div i {
    margin-right: 4px;
  }

  .require-list .item-content {
    font-size: 16px;
    padding: 0 12px;
  }

  .require-list .item-content li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .require-list .item-content li label {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 9px;
    color: #3c3c3c;
  }

  .contact-wrapper {
    text-align: center;
    height: 140px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    color: #39394d;
  }
  .item-phone {
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #f4f4f4;
    margin-top: 10px;
    padding: 0 12px;
  }
  .item-phone .item-source {
    color: #bbb;
    font-size: 12px;
    -webkit-transform: scale(.95);
    transform: scale(.95);
  }
  .item-phone a {
    display: block;
    width: 150px;
    padding: 0 10px;
    line-height: 32px;
    font-size: 14px;
    background: #369c17;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-phone a i {
    font-size: 18px;
    vertical-align: middle;
  }

  .heart, .call {
    font-family: 'wuhan';
    font-size: 16px;
    color: red;
  }

  .call {
    font-size: 14px;
    color: white;
    margin-right: 10px;
    line-height: 7px;
  }
</style>
