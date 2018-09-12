<style lang="less">
.side-menu-container .menu-popper {
  padding: 12px 0;
}
.side-menu-container .el-menu-item {
  min-width: initial
}
</style>
<style lang="less" scoped>
</style>


<template>
  <div class="side-menu-container">
    <el-menu :default-active="$route.path" :router="true" :collapse="isCollapse">
      <template v-for="(item, index) in menuLayout" v-sd-auth="item.authCode">
        <el-submenu :index="'sub-menu-' + index" v-if="item.childs" :key="'sub-menu-' + index">
          <template slot="title">
            <i :class="'iconfont icon-' + item.iconName" v-if="item.iconName"></i>
            <span>{{item.label}}</span>
          </template>
          <template v-if="item1.childs" v-for="(item1, index1) in item.childs" >
            <li class="el-menu-item" style="padding-left: 40px;min-width: initial" :key="index1"  @click="toggleHighLevelMenu(index, index1)">
              <el-popover
                placement="right-end"
                width="200"
                popper-class="menu-popper"
                style="padding: 12px 0"
                v-model="item1.visible"
                trigger="click">
                <el-menu-item v-for="(item2, index) in item1.childs"
                  :key="index" 
                  v-if="menuMap[item2.name]" 
                  v-sd-auth="item2.authCode" 
                  :index="menuMap[item2.name].path" 
                  :route="menuMap[item2.name]">
                    <i :class="'iconfont icon-' + item2.iconName" v-if="item2.iconName"></i>
                    <span>{{item2.label}}</span>
                </el-menu-item>
              </el-popover>
              <span>
                <i :class="'iconfont icon-' + item1.iconName" v-if="item1.iconName"></i>
                <span>{{item1.label}}</span>
              </span>
            </li>
          </template>
          <template v-else>
            <el-menu-item
              :key="item1.name" 
              v-if="menuMap[item1.name]" 
              v-sd-auth="item1.authCode" 
              :index="menuMap[item1.name].path" 
              :route="menuMap[item1.name]">
                <i :class="'iconfont icon-' + item1.iconName" v-if="item1.iconName"></i>
                <span>{{item1.label}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else-if="menuMap[item.name]" 
          :key="item.name" 
          :index="menuMap[item.name].path" 
          :route="menuMap[item.name]">
          <i :class="'iconfont icon-' + item.iconName" v-if="item.iconName"></i>
          <span>{{item.label}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      default: []
    }
  },
  data() {
    return {
      menuDeep: 2,
      visible2: false,
      isCollapse: false,
      menuLayout: [{
        label: "根节点1",
        authCode: "SYS_MENU_1",
        iconName: "fangzi",
        childs: [{
          label: "测试1",
          name: "test1Page",
          authCode: "SYS_MENU_2000"
        }, {
          label: "测试2",
          name: "test2Page",
          authCode: "SYS_MENU_1"
        }, {
          label: "三级菜单根节点1",
          authCode: "SYS_MENU_1",
          visible: false,
          childs: [{
            label: "测试5",
            name: "test5Page",
            authCode: "SYS_MENU_1"
          }, {
            label: "测试7",
            name: "test7Page",
            authCode: "SYS_MENU_1"
          }]
        }, {
          label: "三级菜单根节点2",
          authCode: "SYS_MENU_1",
          visible: false,
          childs: [{
            label: "测试6",
            name: "test6Page",
            authCode: "SYS_MENU_1"
          }]
        }]
      }, {
        label: "根节点2",
        childs: [{
          label: "测试3",
          name: "test3Page",
          authCode: "SYS_MENU_1"
        }]
      }, {
        label: "测试4",
        name: "test4Page",
        authCode: "SYS_MENU_1"
      }],
      menuMap: {}
    };
  },
  created() {
    this.menuMap = this.routes.reduce((preVal, curVal, index, arr) => {
      let resultVal = preVal;
      resultVal[curVal.name] = curVal;
      return resultVal;
    }, {});
    window.$logger.info("123123123123", this.menuMap, this.routes);
  },
  methods: {
    buildMenulist() {
      this.menuList = [];
      let firstPageRoute = "";
      for (const key in this.routerMap) {
        const menuIndex = this.avaliableMenus.indexOf(key);
        if (menuIndex !== -1) {
          this.menuList.push(this.routerMap[key]);
          window.$logger.info("build menu 1", firstPageRoute, this.isMenuAvliable(this.routerMap[key]));
          if ((!firstPageRoute || firstPageRoute === "") && this.isMenuAvliable(this.routerMap[key])) {
            firstPageRoute = this.routerMap[key].path;
          }
        }
      }
      window.$logger.info("build menu", firstPageRoute);
      if (firstPageRoute && firstPageRoute !== "") {
        this.$router.replace(firstPageRoute);
      }
    },
    toggleHighLevelMenu(index, index1) {
      const cacheVisiable = this.menuLayout[index].childs[index1].visible;
      this.menuLayout[index].childs.forEach((val, i, arr) => {
        this.menuLayout[index].childs[i].visible = false;
      });
      this.menuLayout[index].childs[index1].visible = !cacheVisiable;
    }
  },
  computed: {
  }
};
</script>

