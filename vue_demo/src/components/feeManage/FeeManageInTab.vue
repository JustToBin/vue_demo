<style lang="less" scoped>
@import "~@/styles/definitions.less";
.fee-manage-in-tab-container {
  height: 100%;
}
.chart-info-container {
  margin-bottom: 10px;
  height: ~'calc(100% - 250px - 10px - 10px)';
  box-shadow: 0 0 10px #ccc;

  .chart-info-content {
    height: 100%;
    width: 100%;
  }
}
.list-info-container {
  height: 250px;
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
  <div class="fee-manage-in-tab-container">
    <div class="chart-info-container">
      <div class="chart-info-content">
        <ECharts :extend-option="echartOption"></ECharts>
      </div>
    </div>
    <div class="list-info-container">
      <div v-for="(item, index) in infoList" :key="index" class="list-info-content-item">
        <div class="list-info-content-label">{{item.label}}</div>
        <div class="list-info-content-num">{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: [{
        label: "总计",
        num: "390,823,987"
      }, {
        label: "医疗",
        num: "390,823,987"
      }, {
        label: "科研",
        num: "390,823,987"
      }, {
        label: "财务",
        num: "390,823,987"
      }, {
        label: "其他",
        num: "390,823,987"
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

