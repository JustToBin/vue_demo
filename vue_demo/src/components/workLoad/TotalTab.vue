<style lang="less" scoped>
@import "~@/styles/definitions";
@total-container-height: 250px;
.total-count-info-container {
  @top-bottom-gap: 15px;
  @left-right-gap: 15px;
  @middle-vertical-gap: 30px;
  @middle-horizon-gap: 20px;
  height: @total-container-height;
  padding: @top-bottom-gap @left-right-gap;
  position: relative;
  box-sizing: border-box;
  .gradient-horizon(#3463e6, #04bcfe);
  
  .total-count-card-row {
    position: relative;
    width: 100%;
    height: 50%;
    padding: @middle-horizon-gap/2 0;
    font-size: 0;
    box-sizing: border-box;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }

    .total-count-card-item {
      height: 100%;
      width: ~'calc(50% - @{middle-vertical-gap}/2)';
      margin: 0 @middle-vertical-gap/2;
      display: inline-block;
      box-sizing: border-box;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      background-color: rgba(255, 255, 255, 0.4);
      color: @white;
      border-bottom: 2px solid @white;
      vertical-align: top;
      padding: 10px 15px;

      .total-count-card-item-label {
        height: 33.3333%;
        font-size: 1.2rem;
      }
      .total-count-card-item-total {
        height: 33.3333%;
        font-size: 1.5rem;
        text-align: center;
      }
      .total-count-card-item-month {
        height: 33.3333%;
        font-size: 1rem;
        text-align: center;
      }
    }
  }
}
.top-5-container {
  height: ~'calc(100% - @{total-container-height})';
  position: relative;
  .top-5-container-header {
    padding: 5px 0;
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid @c-block-border;
  }
  .top-5-container-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    height: ~'calc(100% - 44px)';
  }
}
.top-5-content-swiper {
  height: 100%;
  .top-5-content-swiper-item {
    overflow-y: auto;
  }
}
</style>


<template>
  <div class="total-tab-container common-tab-container">
    <div class="total-count-info-container">
      <div class="total-count-card-row">
        <div class="total-count-card-item">
          <div class="total-count-card-item-label">门诊人次</div>
          <div class="total-count-card-item-total">4028</div>
          <div class="total-count-card-item-month">月均&nbsp;&nbsp;4028</div>
        </div>
        <div class="total-count-card-item">
          <div class="total-count-card-item-label">门诊人次</div>
          <div class="total-count-card-item-total">4028</div>
          <div class="total-count-card-item-month">月均&nbsp;&nbsp;4028</div>
        </div>
      </div>
      <div class="total-count-card-row">
        <div class="total-count-card-item">
          <div class="total-count-card-item-label">门诊人次</div>
          <div class="total-count-card-item-total">4028</div>
          <div class="total-count-card-item-month">月均&nbsp;&nbsp;4028</div>
        </div>
        <div class="total-count-card-item">
          <div class="total-count-card-item-label">门诊人次</div>
          <div class="total-count-card-item-total">4028</div>
          <div class="total-count-card-item-month">月均&nbsp;&nbsp;4028</div>
        </div>
      </div>
    </div>
    <div class="top-5-container">
      <div class="top-5-container-header">
        <button-tab v-model="btnTabIndex">
          <button-tab-item>门诊人数</button-tab-item>
          <button-tab-item>住院人数</button-tab-item>
        </button-tab>
      </div>
      <div class="top-5-container-content">
        <swiper class="top-5-content-swiper" v-model="btnTabIndex" height="100%" :show-dots="false">
          <swiper-item class="top-5-content-swiper-item" :key="0">
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
          </swiper-item>
          <swiper-item class="top-5-content-swiper-item" :key="1">
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
          </swiper-item>
        </swiper>
        <!-- <mt-tab-container v-model="curTabName">
          <mt-tab-container-item id="department">
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
          </mt-tab-container-item>
          <mt-tab-container-item id="hosp">
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
            <TopItemComp></TopItemComp>
          </mt-tab-container-item>
        </mt-tab-container> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Swiper, SwiperItem } from "vux";
export default {
  components: {
    ButtonTab, 
    ButtonTabItem, 
    Swiper, 
    SwiperItem
  },
  data() {
    return {
      curTabName: "hosp",
      btnTabIndex: 0
    };
  }
};
</script>

