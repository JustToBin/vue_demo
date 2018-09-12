const files = require.context('.', true, /\.vue/);

const Components = {
  install: function(Vue) {
    files.keys().forEach(key => {
      if (key !== "./index.js" && key.indexOf("I18nSelect") === -1) {
        const keysList = key.split("/");
        const resultKey = keysList[keysList.length - 1].replace(/(\.\/|\.vue)/g, '');
        Vue.component(resultKey, files(key).default);
        return true;
      }
    });
  }
};

// 导出组件
export default Components;
