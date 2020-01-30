<template>
  <div class="supply">
    <figure>
      <img src="../../public/supply.png" />
    </figure>
    <p class="supply-des">
      请根据提示填写车源信息，我们收到后会第一时间安排发布和提供给需求方，快速建立需求企业的绿色通道！感谢您对疫区的支持和付出！爱心热线：<a
        href="tel:01056592180"
        >010-56592180</a
      >
      <br />微信号：13811408397(卡家客服-小玲)
    </p>
    <van-cell-group>
      <van-field
        v-model="submitData.companyname"
        required
        @input="inputField('companyname')"
        label="名称"
        placeholder="公司名称或个人姓名"
        :error-message="!hideErrorText.companyname ? '名称不能为空' : ''"
      />
      <van-field
        v-model="submitData.contactname"
        required
        label="联系人"
        placeholder="联系人姓名"
        @input="inputField('contactname')"
        :error-message="!hideErrorText.contactname ? '联系人不能为空' : ''"
      />
      <van-field
        v-model="submitData.phone"
        required
        label="联系电话"
        placeholder="联系人手机号"
        @input="inputField('phone')"
        :error-message="!hideErrorText.phone ? '联系电话不能为空' : ''"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="submitData.carInfo"
        required
        rows="2"
        label="车源信息"
        type="textarea"
        maxlength="50"
        autosize
        placeholder="提供的车长、车型、数量等 例如：9.6米冷藏车3辆"
        @input="inputField('carInfo')"
        :error-message="!hideErrorText.carInfo ? '车源信息不能为空' : ''"
      />
      <van-field
        v-model="submitData.fromPlace"
        required
        rows="2"
        label="[线路]发车地"
        type="textarea"
        maxlength="50"
        autosize
        placeholder="车辆当前所在地(可填多个) 例如：济南、潍坊、淄博"
        @input="inputField('fromPlace')"
        :error-message="!hideErrorText.fromPlace ? '发车地不能为空' : ''"
      />
      <van-field
        v-model="submitData.toPlace"
        required
        label="[线路]目的地"
        readonly
        clickable
        placeholder="请选择目的地"
        is-link
        @click="selectField('toPlace')"
        @input="inputField('toPlace')"
        :error-message="!hideErrorText.toPlace ? '目的地不能为空' : ''"
      />
      <van-field
        v-model="submitData.remark"
        label="备注说明"
        placeholder="其他需求说明"
      />
    </van-cell-group>
    <!-- 提交按钮 -->
    <div class="btn-area">
      <van-button
        :class="!required ? 'disabled' : ''"
        type="info"
        class="btn"
        @click="submit"
        >提交</van-button
      >
    </div>
    <!-- 选择目的地 -->
    <van-popup position="bottom" v-model="showPicker"
      ><van-picker
        show-toolbar
        :title="pickerType === 'unit' ? '货物单位' : '目的地'"
        :columns="pickerType === 'unit' ? unitColumns : cityColumns"
        @cancel="onCancel"
        @confirm="onConfirm"
    /></van-popup>
  </div>
</template>

<script>
export default {
  name: 'Demand',
  components: {},
  computed: {
    required () {
      let flag = true
      for (let i = 0; i < this.requiredData.length; i++) {
        let item = this.requiredData[i]
        if (!this.submitData[item]) {
          flag = false
          break
        }
      }
      return flag
    }
  },
  watch: {
    showPicker (n, o) {
      if (!n) {
        this.$set(this.hideErrorText, 'toPlace', !!this.submitData.toPlace)
      }
    }
  },
  data: () => ({
    showPicker: false,
    showGoods: false,
    pickerType: null,
    requiredData: [
      'companyname',
      'contactname',
      'phone',
      'carInfo',
      'fromPlace',
      'toPlace'
    ],
    list: ['生活用品', '药品', '食品', '医疗用品', '医疗器械', '其他用品'],
    hideErrorText: {},
    unitColumns: ['吨', '方', '件', '千克'],
    cityColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    submitData: {
      companyname: '',
      contactname: '',
      phone: '',
      carInfo: '',
      fromPlace: '',
      toPlace: '',
      remark: ''
    }
  }),
  created () {
    for (let i = 0; i < this.requiredData.length; i++) {
      let item = this.requiredData[i]
      this.hideErrorText[item] = true
    }
  },
  methods: {
    // 提交
    submit () {
      let obj = {}
      for (let item in this.hideErrorText) {
        obj[item] = !!this.submitData[item]
      }
      this.hideErrorText = obj
      console.log(this.hideErrorText)
      console.log('提交')
    },
    // 失去焦点
    inputField (key) {
      console.log(key)
      this.hideErrorText[key] = !!this.submitData[key]
    },
    // 选择类型
    selectField () {
      this.showPicker = true
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    // picker 事件
    onCancel () {
      this.showPicker = false
    },
    onConfirm (value, index) {
      this.submitData.toPlace = value
      this.showPicker = false
    }
  }
}
</script>

<style lang="less" scoped>
.supply {
  background: #f2f2f2;
  figure {
    img {
      width: 100%;
    }
  }
  .supply-des {
    padding: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #666;
    a {
      color: #000;
    }
  }
  .unit {
    display: flex;
    flex-direction: row;
    align-items: center;
    & > span {
      color: #000;
      white-space: nowrap;
      margin-right: 4px;
    }
  }
  .btn-area {
    margin-top: 10px;
    padding: 8px 12px;
    background: #fff;
    text-align: center;
    .btn {
      width: 100%;
      border-radius: 20px;
      background: #2272ff;
      border-color: #2272ff;
      &.disabled {
        opacity: 0.5;
      }
    }
  }
}
</style>
