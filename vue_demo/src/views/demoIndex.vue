<style lang="less" scoped>
@import "~@/styles/definitions.less";
.menu-item {
  padding: 5px 10px;
  border-bottom: 1px solid @c-block-border;
}
.layout-view-content {
  height: ~'calc(100vh - @{page-title-height} - @{subpage-tab-height})';
  width: 100vw;
  overflow: hidden;
  position: relative;
}
</style>



<template>
  <div class="demo-index-container">
    <mt-header title="工作负荷" :fixed="true">
      <mt-button icon="more" slot="left" @click="menuShow = !menuShow"></mt-button>
    </mt-header>
    <div style="padding-top: 40px;"></div>
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

    <mt-popup
      v-model="menuShow"
      position="left">
      <div style="width: 70vw; height: 100vh; background-color: #fff;">
        <div class="menu-item" :key="index" v-for="(item, index) in menuList">
          {{item.label}}
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "1",
      menuShow: false,
      menuList: [{
        label: "菜单1"
      }, {
        label: "菜单2"
      }, {
        label: "菜单3"
      }, {
        label: "菜单4"
      }, {
        label: "菜单5"
      }]
    };
  }
};
</script>

