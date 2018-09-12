import { $locals } from "@/utils";
export default {
  namespaced: true,
  state: {
    curChangeUserInfo: {
      userId: "",
      type: "",
      account: "",
      name: "",
      email: "",
      companyId: ""
    },
    companyList: [],
    userInfo: {
      userId: "",
      name: "",
      account: "",
      email: "",
      auths: [],
      company: ""
    }
  },
  getters: {
    curChangeUserInfo: (state) => state.curChangeUserInfo,
    companyList: (state) => state.companyList,
    userInfo: (state) => {
      const store = $locals.getObject("userInfo");
      if (store) {
        return store;
      } else {
        return state.userInfo;
      }
    }
  },
  actions: {
    beforeEditUserInfo({ commit }, object) {
      commit("REFRESH_CUR_USER_INFO", object);
    },
    clearEditUserInfo({ commit }, object) {
      commit("REFRESH_CUR_USER_INFO", {
        userId: "",
        type: "",
        account: "",
        name: "",
        email: "",
        companyId: "",
        companyName: ""
      });
    }
  },
  mutations: {
    //刷新管理员修改用户界面的显示信息
    REFRESH_CUR_USER_INFO(state, payload) {
      state.curChangeUserInfo = payload;
    }
  },
  modules: {
  }
};
