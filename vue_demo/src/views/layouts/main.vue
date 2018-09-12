<template>
  <el-container class="main-layout-root">
    <el-header class="cust-header">
      <el-container class="cust-header-container">
        <el-aside width="200px" class="menu-header">
        </el-aside>
        <el-container class="layout-header">
          <div class="right-block">
            <span class="company-name-field">{{getUserInfo()["account"]}}</span>
            <el-dropdown @command="handleUserInfoCommand">
              <i class="iconfont icon-username account-icon"></i>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="showUserInfo">个人信息</el-dropdown-item>
              <el-dropdown-item v-sd-auth="'SYS_BTN_302'" command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-container>
      </el-container>
    </el-header>
    <el-container>
      <el-aside width="200px" class="menu-container">
        <SideMenu :routes="$router.options.routes[0].children"></SideMenu>
      </el-aside>
      <el-container style="height: calc(100vh - 60px)">
        <el-main class="page-main-container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { $auth, $locals } from "@/utils";
import systemSetting from "@/../config/system.setting";
export default {
  name: 'mainLayout',
  data() {
    return {
      pageLoading: true
    };
  },
  computed: {
    ...mapGetters("user", [
      "userInfo"
    ]),
    ...mapGetters("auth", [
      'isLogin'
    ])
  },
  created() {
    window.vue.$on("page-change-before", (options) => {
      this.$logger.info("before");
      this.pageLoading = true;
    });
    window.vue.$on("page-change-after", (options) => {
      this.$logger.info("after");
      this.pageLoading = false;
    });
    if (!this.isLogin) {
      this.$router.replace("/login");
    }
  },
  methods: {
    ...mapActions("auth", [
      "logout"
    ]),
    isMenuAvliable(routeObj) {
      const authArr = $locals.get("USER_AUTHS", "").split(",");
      return authArr.indexOf(routeObj.authCode) > -1;
    },
    getUserInfo() {
      if (!$locals.getObject("LOGIN_INFO")) {
        $auth.logout();
      } else {
        return $locals.getObject("LOGIN_INFO").loginUser;
      }
    },
    handleUserInfoCommand(cmd) {
      switch (cmd) {
        case "showUserInfo":
          this.$router.push("/user_info");
          break;
        case "changePwd":
          this.$router.push({ path: '/change_pwd', query: { from: "inner" }});
          break;
        case "logout":
          $auth.logout();
          break;
        default:
      }
    },
    collapseMenu() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less">
@import '~@/styles/definitions.less';
@import '~@/styles/reset.less';
@import '~@/styles/common.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  /* line-height: 60px; */
  height: @header-height;
  .menu-header {
    background-color: @c-main;
    padding: 0;
    height: 100%;
    background-image: url(~@/images/logo.png);
    background-position: 50% 50%;
    background-size: auto 60%;
    background-repeat: no-repeat;
  }
  &.cust-header {
    padding: 0;
    position: relative;
    .cust-header-container {
      height: 100%;
    }
  }
}
.el-aside {
  color: #333;
}
</style>

<style lang="less" scoped>
@import '~@/styles/definitions.less';
.menu-container {
  padding: 0;
  height: ~'calc(100vh - 62px)';
  border-right: 1px solid @c-block-border;
  overflow: visible;
}
.company-name-field {
  display: inline-block;
  vertical-align: middle;
}
.account-icon {
  font-size: 40px;
  vertical-align: middle;
  margin-left: 20px;
}
.main-layout-root {
  background-color: @bc-main;
  height: 100%;
}
.page-main-container {
  position: relative;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}
.layout-header {
  background-color: @white;
  padding: 0 20px;
  line-height: 60px;
  position: relative;
  border-bottom: 1px solid @c-block-border;
  .right-block {
    position: absolute;
    right: 20px;
  }
}
.menu-container {
  background-color: @white;
  position: relative;
}
</style>

