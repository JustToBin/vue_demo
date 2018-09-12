<style lang="less" scoped>
@import "~@/styles/definitions.less";
.layout-view-content {
  height: ~'calc(100vh - @{page-title-height} - @{subpage-tab-height})';
  width: 100vw;
  overflow: hidden;
  position: relative;
}
</style>

<template>
  <div class="fee-manage-container">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">科研成果统计</mt-tab-item>
      <mt-tab-item id="2">资源配备统计</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="layout-view-container">
      <mt-tab-container-item id="1" class="layout-view-content">
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="layout-view-content">
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "1"
    };
  }
};
</script>

