<template>
  <div id="app" class="default-theme">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { $locals } from "@/utils";
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
  },
  methods: {
    ...mapActions("auth", [
      "adAuth"
    ]),
    isResetPwd() {
      const loginInfo = $locals.getObject("LOGIN_INFO");
      if (loginInfo && loginInfo.loginUser && loginInfo.loginUser.resetPwd === 0) {
        return true;
      } else {
        return false;
      }
    },
    isDealerUser() {
      const loginInfo = $locals.getObject("LOGIN_INFO");
      if (loginInfo && loginInfo.loginUser && loginInfo.loginUser.userType === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.isResetPwd() && this.isDealerUser()) {
        this.$router.replace("change_pwd");
      }
    }
  }
};
</script>

<style lang="less">
@import './styles/definitions.less';
@import './styles/reset.less';
@import './styles/common.less';
body, html {
  font-size: 14px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
}
</style>
