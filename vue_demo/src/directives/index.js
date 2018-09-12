const files = require.context('.', true, /\.js/);

const Directives = {
  install: function(Vue) {
    //通用指令
    files.keys().forEach(key => {
      if (key !== "./index.js") {
        const keysList = key.split("/");
        const resultKey = keysList[keysList.length - 1].replace(/(\.\/|\.js)/g, '');
        Vue.directive('sd-' + resultKey, files(key).default);
        return true;
      }
    });
  }
};

// 导出指令
export default Directives;
