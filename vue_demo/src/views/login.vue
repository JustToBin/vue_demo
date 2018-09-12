<style lang="less" scoped>
@import "../styles/definitions.less";
.login-page-view {
  // position: relative;
  width: 100%;
  height: 100%;
  // background-image: url(../images/login_bg.png);
  background-color: #0091ea;
  background-position: 50% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat; 
}
.login-panel-container {
  @container-width: 300px;
  position: absolute;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: ~'translate(-50%, -50%)';
  .login-form-container {
    border-radius: 10px;
    width: @container-width;
    background-color: @white;
    // border: 1px solid #b4b4b4;
    // box-shadow: 1px 1px 8px rgba(0,0,0,0.1);
    box-sizing: border-box;
    padding: 12px 12px 12px 12px;
    overflow: hidden;

    .login-btn {
      margin-top: 30px;
      .ivu-btn {
        width: 100%;
        font-size: 18px;
        height: 40px;
      }
      // .ivu-btn.ivu-btn-primary span {
      // }
    }

    .login-form-input-item {
      margin-bottom: 0;
    }

  }

  .logo-container {
    margin-top: -100px;
    width: 300px;
    height: 100px;

    // background-image: url(../images/login_logo.png);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: auto 60%;
    display: inline-block;
    vertical-align: middle;
  }
}
.footer-copyright {
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  font-size: 12px;
  text-align: center;
  width: 100%;
}
.login-form-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  display: inline-block;
  // margin-bottom: 20px;
  .white-space {
    display: inline-block;
    width: 2em;
  }
}
.i18n-select-container {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<style lang="less">
.login-form-container {
  .el-tabs__nav {
    width: 100%; 
    .el-tabs__item {
      width: 50%;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
}
</style>


<template>
  <div class="login-page-view">
    <div class="login-panel-container">
      <div class="logo-container">
      </div>
      <div type="border-card" class="login-form-container" v-loading="loginRequesting">
        <div class="login-form-title">{{$t("login.form.title")}}</div>
        <el-form ref="dealerLoginForm" :model="dealerLoginForm" :rules="formRule">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="username" class="login-form-input-item" @keyup.enter="handleSubmit('dealerLoginForm')" :label="$t('login.form.username')">
                <el-input type="text" v-model="dealerLoginForm.username" :placeholder="$t('login.form.username')">
                  <!-- <cust-icon type="account" slot="suffix"></cust-icon> -->
                  <i slot="prefix" class="el-input__icon iconfont icon-username"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="password" class="login-form-input-item" @keyup.enter="handleSubmit('dealerLoginForm')" :label="$t('login.form.password')">
                <el-input type="password" v-model="dealerLoginForm.password" :placeholder="$t('login.form.password')">
                  <!-- <cust-icon type="password" slot="prepend"></cust-icon> -->
                  <i slot="prefix" class="el-input__icon iconfont icon-password"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="enableCaptcha">
            <el-col :span="24">
              <el-form-item prop="captcha" class="login-form-input-item" @keyup.enter="handleSubmit('dealerLoginForm')" :label="$t('login.form.captcha')">
                <el-input type="captcha" v-model="dealerLoginForm.captcha" :placeholder="$t('login.form.captcha')">
                  <template slot="append">
                    <div @click="refreshCaptcha" class="clickable">
                      <img :src="captchaImg" alt="">
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="login-btn">
            <el-col :span="24">
              <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="handleSubmit('dealerLoginForm')">{{$t("login.form.button")}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="i18n-select-container">
      <I18nSelect></I18nSelect>
    </div>
    <div class="footer-copyright">{{$t("system.copyright")}}</div>
  </div>
</template>

<script>
// import axios from "axios";
// import util from "@/utils";
import { mapActions, mapGetters } from 'vuex';
import systemSetting from "@/../config/system.setting";
export default {
  data() {
    return {
      enableCaptcha: systemSetting.login.captcha,
      dealerLoginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      innerLoginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      formRule: {
        username: [
          { required: true, message: this.$t("login.err.username.empty"), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t("login.err.password.empty"), trigger: 'blur' }
          // { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: this.$t("login.err.captcha.empty"), trigger: 'blur' }
        ]
      },
      captchaImg: global.CONTEXT_NAME + "/security/captchaCode?t=" + new Date().getTime()
    };
  },
  created() {
    // util.locals.clearLocalStorage();
    // window.vue.$emit("on-clear-cache");
  },
  computed: {
    ...mapGetters("auth", [
      "loginRequesting"
    ])
  },
  methods: {
    ...mapActions("auth", [
      "loginRequest"
    ]),
    handleSubmit(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loginRequest(_this[formName]).then((loginResData) => {
            this.$router.push("/");
          }).catch((e) => {
            this.$message.error(e.msg);
          });
        } else {
          this.$message.error('表单验证失败!');
        }
      });
    },
    refreshCaptcha() {
      this.captchaImg = global.CONTEXT_NAME + "/security/captchaCode?t=" + new Date().getTime();
    }
  }
};
</script>

