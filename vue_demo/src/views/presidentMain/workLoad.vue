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
  <div class="work-load-container">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">总览</mt-tab-item>
      <mt-tab-item id="2">门诊人次</mt-tab-item>
      <mt-tab-item id="3">住院人次</mt-tab-item>
      <mt-tab-item id="4">手术人次</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="layout-view-container">
      <mt-tab-container-item id="1" class="layout-view-content">
        <TotalTab></TotalTab>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="layout-view-content">
        <DepartmentTab></DepartmentTab>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="layout-view-content">
        <HospTab></HospTab>
      </mt-tab-container-item>
      <mt-tab-container-item id="4" class="layout-view-content">
        <OperationTab></OperationTab>
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

