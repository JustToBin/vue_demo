import { authApi } from "@/apis"; 
import { $locals, $auth } from "@/utils";

export default {
  namespaced: true,
  state: {
    info: {},
    loginRequesting: false
  },
  getters: {
    loginRequesting: (state) => state.loginRequesting,
    isLogin: (state) => $auth.isLogin(),
    isResetPwd: (state) => {
      const loginInfo = $locals.getObject("LOGIN_INFO");
      if (loginInfo && loginInfo.loginUser && loginInfo.loginUser.resetPwd === 0) {
        return true;
      } else {
        return false;
      }
    },
    loginInfo: (state) => $locals.getObject("LOGIN_INFO")
  },
  actions: {
    loginRequest({ commit }, b) {
      commit("LOGIN_ING");
      return new Promise((resolve, reject) => {
        const promises = authApi.login(b.username, b.password, b.captcha);
        promises.then((resData) => {
          window.$logger.info("登陆返回数据", resData);
          let data = resData.data;
          if (resData.ok) {
            resolve(data);
            let permissions = [];
            for (const key in data.permissions) {
              if (data.permissions[key]) {
                permissions.push(key);
              }
            }
            $locals.set("USER_AUTHS", permissions.join(","));
            commit("LOGIN_SUCCESS");
            commit("REFRESH_LOGIN_USER_INFO", data);
          } else {
            reject(data);
            commit("LOGIN_FAIL");
          }
        }).catch((e) => {
          reject(e);
          commit("LOGIN_FAIL");
        });
      });
    },
    adAuth({ commit }, authObj) {
      return new Promise((resolve, reject) => {
        const cacheToken = $auth.getToken();
        if (cacheToken) {
          resolve(cacheToken);
        } else if (!authObj.a || !authObj._ || authObj.a === "" || authObj._ === "") {
          reject({
            loginType: "dealer"
          });
          commit("LOGIN_FAIL");
        } else {
          authApi.adLogin(authObj.a, authObj._).then((data) => {
            window.$logger.info("登陆返回数据", data);
            if (data.token) {
              resolve(data.token);
              let permissions = [];
              for (const key in data.permissions) {
                if (data.permissions[key]) {
                  permissions.push(key);
                }
              }
              $locals.set("USER_AUTHS", permissions.join(","));
              commit("LOGIN_SUCCESS");
              commit("REFRESH_LOGIN_USER_INFO", data);
            } else {
              reject(data);
              commit("LOGIN_FAIL");
            }
          }).catch((e) => {
            reject(e);
            commit("LOGIN_FAIL");
          });
        }
      });
    },
    logout({ commit }, obj) {
      $auth.clearAuthCache();
    },
    changePwd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        authApi.changePwd(obj.oldPwd, obj.newPwd).then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject({
              message: data.msg
            });
          }
        }).catch((e) => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    LOGIN_ING(state) {
      state.loginRequesting = true;
    },
    LOGIN_SUCCESS(state) {
      state.loginRequesting = false;
    },
    LOGIN_FAIL(state) {
      state.loginRequesting = false;
    },
    REFRESH_LOGIN_USER_INFO(state, payload) {
      $locals.setObject("LOGIN_INFO", payload);
    }
  }
};
