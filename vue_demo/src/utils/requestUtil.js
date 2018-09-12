import axios from "axios";
const $auth = require("./authUtil").default;

axios.interceptors.request.use(
  config => {
    // let key = buildKeyByConfig(config);
    // if (!requestMap[key]) {
    //   requestMap[key] = 1;
    //   return config;
    // } else {
    //   return null;
    // }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // let key = buildKeyByConfig(response.config);
    // requestMap[key] = 0;
    // if (!response.data.ok && response.data.code === -101004) {
    //   window.logout();
    // } else {
    //   return response;
    // }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // router.replace({
          //   path: '/login',
          //   query: { redirect: router.currentRoute.fullPath }
          // });
          $auth.logout();
          break;
        default:
          break;
      }
    }
    // let key = buildKeyByConfig(error.response.config);
    // requestMap[key] = 0;
    // 返回接口返回的错误信息
    return Promise.reject(error);
  }
);

export default {
  custGet(contextName, url, data, headers) {
    let _data = data || {};
    let _headers = Object.assign({
      "Accept": "application/json",
      "Authorization": $auth.getAuthToken()
    }, headers);
    return axios({
      method: "get",
      url: contextName + url,
      headers: _headers,
      data: _data,
      withCredentials: true // 默认的
    });
  },
  get(url, data, headers) {
    return this.custGet(global.CONTEXT_NAME, url, data, headers);
  },
  custPost(contextName, url, data, headers) {
    let _data = data || {};
    let _headers = Object.assign({
      "Accept": "application/json",
      "Authorization": $auth.getAuthToken()
    }, headers);
    return axios({
      method: "post",
      url: contextName + url,
      headers: _headers,
      data: _data,
      withCredentials: true // 默认的
    });
  },
  post(url, data, headers) {
    return this.custPost(global.CONTEXT_NAME, url, data, headers);
  },
  custPostFile(contextName, url, data, headers) {
    let _file = data._file;
    let _fileFormName = data._fileFormName;
    formdata = new FormData();
    formdata.append(_fileFormName, _file);
    for (const key in data) {
      if (key !== '_file' && key !== '_fileFormName') {
        formdata.append(key, data[key]);
      }
    }
    let _headers = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Accept": "application/json",
      "Authorization": $auth.getAuthToken()
    }, headers);
    return axios({
      url: contextName + url,
      method: 'post',
      data: formdata,
      headers: _headers
    });
  },
  postFile(url, data, headers) {
    return this.custPostFile(global.CONTEXT_NAME, url, data, headers);
  }
};
