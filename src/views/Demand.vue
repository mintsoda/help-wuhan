<template>
  <div class="demand">
    <figure>
      <img src="../../public/demand.png" />
    </figure>
    <p class="demand-des">
      请根据提示填写运力需求，我们收到后会第一时间安排发布和匹配司机运力，快速建立意愿司机与需求企业的绿色通道！爱心热线：<a
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
        label="公司名称"
        placeholder="请输入公司名称"
        :error-message="!hideErrorText.companyname ? '公司名称不能为空' : ''"
      />
      <van-field
        v-model="submitData.contactname"
        required
        label="联系人"
        placeholder="请输入联系人"
        @input="inputField('contactname')"
        :error-message="!hideErrorText.contactname ? '联系人不能为空' : ''"
      />
      <van-field
        v-model="submitData.phone"
        required
        label="联系电话"
        placeholder="请输入联系电话"
        @input="inputField('phone')"
        :error-message="!hideErrorText.phone ? '联系电话不能为空' : ''"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="submitData.goodsType"
        required
        label="货物类型"
        readonly
        clickable
        placeholder="请选择货物类型"
        is-link
        @click="selectField('goodsType')"
        @input="inputField('goodsType')"
        :error-message="!hideErrorText.goodsType ? '货物类型不能为空' : ''"
      />
      <van-field
        v-model="submitData.goodsTotal"
        required
        label="货物数量"
        placeholder="请输入货物数量"
        @input="inputField('goodsTotal')"
        :error-message="!hideErrorText.goodsTotal ? '货物数量不能为空' : ''"
      >
        <div slot="button" class="unit" @click="selectField('unit')">
          <span>{{ submitData.unit }}</span>
          <van-icon name="arrow"></van-icon>
        </div>
      </van-field>
      <van-field
        v-model="submitData.fromPlace"
        required
        rows="2"
        label="运发地"
        type="textarea"
        maxlength="50"
        autosize
        placeholder="发运起始地（可填多个）例如：济南、潍坊、淄博"
        @input="inputField('fromPlace')"
        :error-message="!hideErrorText.fromPlace ? '运发地不能为空' : ''"
      />
      <van-field
        v-model="submitData.toPlace"
        required
        label="目的地"
        readonly
        clickable
        placeholder="请选择目的地"
        is-link
        @click="selectField('toPlace')"
        @input="inputField('toPlace')"
        :error-message="!hideErrorText.toPlace ? '目的地不能为空' : ''"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="submitData.carNeeds"
        required
        rows="2"
        label="车辆需求"
        type="textarea"
        maxlength="50"
        autosize
        placeholder="需要的车长、车型、数量等 例如：9.6米冷藏车3辆"
        @input="inputField('carNeeds')"
        :error-message="!hideErrorText.carNeeds ? '车辆需求不能为空' : ''"
      />
      <van-field
        v-model="submitData.carNeedTime"
        label="用车时间"
        placeholder="例如1月28日至2月8日"
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
    <!-- 选择货物类型 -->
    <van-popup position="bottom" v-model="showGoods"
      ><van-checkbox-group v-model="goodsTypeArr">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="item"
            @click="toggle(index)"
          >
            <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group> </van-checkbox-group
    ></van-popup>
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
    goodsTypeArr (n, o) {
      this.$set(this.hideErrorText, 'goodsType', !!n.length)
      this.submitData.goodsType = n.join(',')
    },
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
      'goodsType',
      'goodsTotal',
      'fromPlace',
      'toPlace',
      'carNeeds'
    ],
    list: ['生活用品', '药品', '食品', '医疗用品', '医疗器械', '其他用品'],
    hideErrorText: {},
    unitColumns: ['吨', '方', '件', '千克'],
    cityColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    submitData: {
      companyname: '',
      contactname: '',
      phone: '',
      unit: '吨',
      goodsType: '',
      goodsTotal: '',
      fromPlace: '',
      toPlace: '',
      carNeeds: '',
      carNeedTime: '',
      remark: ''
    },
    goodsTypeArr: []
  }),
  created () {
    for (let i = 0; i < this.requiredData.length; i++) {
      let item = this.requiredData[i]
      this.hideErrorText[item] = true
    }
    // 微信分享
    this.wxsharePage()
    // app分享
    this.appShareBtn()
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
    selectField (type) {
      if (type === 'toPlace' || type === 'unit') {
        this.pickerType = type
        this.showPicker = true
      }
      if (type === 'goodsType') {
        this.showGoods = true
      }
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    // picker 事件
    onCancel () {
      this.showPicker = false
    },
    onConfirm (value, index) {
      this.submitData[this.pickerType] = value
      this.showPicker = false
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.demand {
  background: #f2f2f2;
  figure {
    img {
      width: 100%;
    }
  }
  .demand-des {
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
