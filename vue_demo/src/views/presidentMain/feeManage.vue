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
    <tab :line-width="2" active-color='#fc378c' v-model="selected">
      <tab-item class="vux-center" :selected="selected === index" v-for="(val, key, index) in viewMap" @click="selected = index" :key="key">{{val}}</tab-item>
    </tab>
    <swiper v-model="selected" :show-dots="false">
      <swiper-item :key="0">
        <div class="tab-swiper vux-center layout-view-content">
          <FeeManageTotalTab></FeeManageTotalTab>
        </div>
      </swiper-item>
      <swiper-item :key="1">
        <div class="tab-swiper vux-center layout-view-content">
          <FeeManageInTab></FeeManageInTab>
        </div>
      </swiper-item>
      <swiper-item :key="2">
        <div class="tab-swiper vux-center layout-view-content">
        </div>
      </swiper-item>
      <swiper-item :key="3">
        <div class="tab-swiper vux-center layout-view-content">
        </div>
      </swiper-item>
      <swiper-item :key="4">
        <div class="tab-swiper vux-center layout-view-content">
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from "vux";
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      selected: 0,
      viewMap: {
        tab1: "总览",
        tab2: "总收入",
        tab3: "医疗收入",
        tab4: "其他收入",
        tab5: "总支出"
      }
    };
  }
};
</script>

