<style lang="less" scoped>
.echarts-container {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="echarts-container" ref="echarts-content">
    <div id="echarts-content" ref="echarts-content" :style="{width: contentWidth, height: contentHeight}"></div>
  </div>
</template>
<script>
import echarts from "echarts";
if (!global.echarts) {
  global.echarts = echarts;
}
export default {
  props: {
    extendOption: {
      default: {}
    },
    custRender: {
      default: () => {
        return function() {};
      }
    }
  },
  mounted() {
    this.refreshCharts();
    let _zr = this.echartInstance.getZr();
    this.custRender(_zr);
  },
  data() {
    return {
      echartInstance: null,
      defaultOption: {},
      contentWidth: 0,
      contentHeight: 0
    };
  },
  methods: {
    refreshCharts() {
      this.contentWidth = this.$refs['echarts-content'].clientWidth;
      this.contentHeight = this.$refs['echarts-content'].clientHeight;
      this.echartInstance = echarts.init(this.$refs['echarts-content']);
      this.echartInstance.setOption(this.options);
    }
  },
  computed: {
    options() {
      return Object.assign(this.defaultOption, this.extendOption);
    }
    // contentWidth() {
    //   console.log(this.$refs['echarts-content']);
    //   return this.$refs['echarts-content'].width();
    // },
    // contentHeight() {
    //   console.log(this.$refs['echarts-content']);
    //   return this.$refs['echarts-content'].height();
    // }
  }
};
</script>

