<style lang="less" scoped>
@import "~@/styles/definitions.less";
.menu-list {
  width: 70vw; 
  height: 100vh; 
  background-color: #fff;
}
.menu-item {
  &.is-active {
    background-color: #eee;
  }
}
.layout-view-content {
  height: ~'calc(100vh - @{page-title-height} - @{subpage-tab-height})';
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.demo-index-container {
  height: 100%;
}
.router-view {
  height: ~"calc(100% - 44px)";
  overflow-y: auto;
  overflow-x: hidden;
}
.right-popup {
  width: 200px;
}
</style>



<template>
  <div class="demo-index-container">
    <!-- <mt-header :title="pageTitle" :fixed="true">
      <mt-button icon="more" slot="left" @click="menuShow = !menuShow"></mt-button>
    </mt-header>
    <div style="padding-top: 40px;"></div>
    <router-view></router-view>
    <mt-popup
      v-model="menuShow"
      position="left">
      <div class="menu-list">
        <div class="menu-item" :class="{'is-active': item.url === $route.path}" :key="index" v-for="(item, index) in menuList" @click="changePage(item.url)">
          {{item.label}}
        </div>
      </div>
    </mt-popup> -->
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <div v-transfer-dom>
      <popup v-model="rightVisibility"
        position="right">
        <div class="right-popup">
          <group>
            <cell>试试</cell>
            <cell>试试</cell>
          </group>
        </div>
      </popup>
    </div>
    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group title="菜单" style="margin-top:20px;">
          <cell v-for="(item, key) in pageMap" 
            :title="item.name" 
            :link="item.mainUrl" 
            @click.native="menuName = key; drawerVisibility = false; subMenuSelected = 0;" 
            :key="key"
            :class="{'is-active': menuName === key, 'menu-item': true}">
          </cell>
        </group>
      </div>

      <!-- main content -->
      <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="0">

        <x-header
          v-if="isShowNav"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
          :left-options="leftOptions"
          :right-options="rightOptions"
          :title="pageTitle"
          :transition="headerTransition"
          @on-click-more="onClickMore">
          <span slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>

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
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
          @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
          :name="viewTransition" 
          :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>

      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, 
  Tab, TabItem, Loading, TransferDom, Popup } from 'vux';
export default {
  directives: {
    TransferDom
  },
  components: {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Loading,
    Actionsheet,
    Popup
  },
  data() {
    return {
      // selected: "1",
      // menuShow: false,
      // menuList: [{
      //   label: "工作负荷",
      //   url: "/work_load"
      // }, {
      //   label: "费用管理",
      //   url: "/fee_manage"
      // }, {
      //   label: "发展潜力",
      //   url: "/potential"
      // }]
      entryUrl: document.location.href,
      showMenu: false,
      rightVisibility: false,
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh-CN': '中文',
        'en': 'English'
      },
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left',
      route: "",
      path: "",
      deviceready: "",
      demoTop: "",
      isLoading: false,
      direction: "",
      menuName: "workLoad",
      subMenuSelected: 0,
      pageMap: {
        workLoad: {
          name: "工作负荷",
          mainUrl: "/work_load_view"
        },
        feeManage: {
          name: "费用管理",
          mainUrl: "/fee_manage_view"
        },
        potential: {
          name: "发展潜力",
          mainUrl: "/potential_tech"
        }
      }
    };
  },
  computed: {
    pageTitle() {
      return this.pageMap[this.menuName].name;
    },
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false;
      }
      return true;
    },
    leftOptions () {
      return {
        showBack: false
      };
    },
    rightOptions () {
      return {
        showMore: true
      };
    },
    headerTransition () {
      if (!this.direction) {
        return '';
      }
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left';
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/');
        if (/component/.test(this.route.path) && parts[2]) {
          return parts[2];
        }
      }
    },
    viewTransition () {
      if (!this.direction) {
        return '';
      }
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out');
    },
    viewMap() {
      let viewListMap = {
        workLoad: [{
          label: "总览",
          url: "/work_load_view"
        }, {
          label: "门诊人次",
          url: "/work_load_depart"
        }, {
          label: "住院人次",
          url: "/work_load_hosp"
        }, {
          label: "手术人次",
          url: "/work_load_operation"
        }],
        feeManage: [{
          label: "总览",
          url: "/fee_manage_view"
        }, {
          label: "总收入",
          url: "/fee_manage_total"
        }, {
          label: "医疗收入",
          url: "/fee_manage_medic"
        }, {
          label: "其他收入",
          url: "/fee_manage_other"
        }, {
          label: "总支出",
          url: "/fee_manage_out"
        }],
        potential: [{
          label: "科研成果统计",
          url: "/potential_tech"
        }, {
          label: "资源配备统计",
          url: "/potential_material"
        }]
      };
      if (this.menuName && viewListMap[this.menuName]) {
        return viewListMap[this.menuName];
      } else {
        return null;
      }
    }
  },
  methods: {
    changePage(url) {
      if (this.$route.path !== url) {
        this.$router.push(url);
      }
      this.menuShow = false;
    },
    onShowModeChange (val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showModeValue = val;
      }, 400);
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showPlacementValue = val;
      }, 400);
    },
    onClickMore () {
      // this.showMenu = true;
      this.rightVisibility = true;
    },
    changeLocale (locale) {
      this.$i18n.set(locale);
      this.$locale.set(locale);
    },
    switchTabItem(index) {
      this.$router.push(this.viewMap[index].url);
      this.subMenuSelected = index;
    }
  }
};
</script>

