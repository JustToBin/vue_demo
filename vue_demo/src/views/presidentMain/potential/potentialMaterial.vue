<style lang="less" scoped>
@import "~@/styles/definitions.less";
.chart-info-container {
  margin-bottom: 10px;
  height: ~'calc(100% - 294px - 10px - 10px)';
  box-shadow: 0 0 10px #ccc;

  .chart-info-content {
    height: 100%;
    width: 100%;
  }
}
.list-info-container {
  height: 294px;
  box-shadow: 0 0 10px #ccc;
}
.list-info-content-item {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f4f4f4;
  box-sizing: border-box;
  .list-info-content-label {
    display: inline-block;
  }
  .list-info-content-num {
    float: right;
  }
}
</style>

<template>
  <div class="">
    <div class="chart-info-container">
      <div class="chart-info-content">
        <ECharts :extend-option="echartOption"></ECharts>
      </div>
    </div>
    <div class="list-info-container">
      <tab :line-width="2" 
        active-color='#368ae5' 
        v-model="subMenuSelected"
        prevent-default
        @on-before-index-change="switchTabItem">
        <tab-item class="vux-center"
          :selected="subMenuSelected === index"
          v-for="(item, index) in viewMap"
          :key="index">{{item.label}}</tab-item>
      </tab>
      <div v-for="(item, index) in infoList" :key="index" class="list-info-content-item">
        <div class="list-info-content-label">{{item.label}}</div>
        <div class="list-info-content-num">{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
export default {
  components: {
    Tab, 
    TabItem
  },
  methods: {
    switchTabItem(index) {
      this.subMenuSelected = index;
    }
  },
  data() {
    return {
      subMenuSelected: 0,
      viewMap: [{
        label: "实际开房床位"
      }, {
        label: "重症医学科开发床位"
      }, {
        label: "急诊留观开发床位"
      }],
      infoList: [{
        label: "本期",
        num: "987"
      }, {
        label: "同期",
        num: "278"
      }, {
        label: "上期",
        num: "392"
      }, {
        label: "同比",
        num: "6%"
      }, {
        label: "环比",
        num: "4.7%"
      }],
      echartOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    };
  }
};
</script>
