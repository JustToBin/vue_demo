export default {
  //存储单个属性
  set: function(key, value) {
    if (typeof value !== "undefined") {
      window.localStorage[key] = value;
    }
  }, 
  //读取单个属性
  get: function(key, defaultValue) {
    return window.localStorage[key] || defaultValue;
  }, 
  //存储对象，以JSON格式存储
  setObject: function(key, value) {
    if (typeof value !== "undefined") {
      window.localStorage[key] = JSON.stringify(value);
    }
  }, 
  //读取对象
  getObject: function(key) {
    return window.localStorage[key] ? JSON.parse(window.localStorage[key]) : null;
  },
  //删除某一键值对
  removeItem: function(key) {
    return window.localStorage.removeItem(key);
  },
  //清空整个localStorage
  clearLocalStorage: function() {
    return window.localStorage.clear();
  }
};
