import VueI18n from 'vue-i18n'

const files = require.context('./', false, /\.js$/);

export default function(Vue) {
  Vue.use(VueI18n);
  let messages = {}
  files.keys().forEach(key => {
    if (key !== "./index.js") {
      const keysList = key.split("/");
      const resultKey = keysList[keysList.length - 1].replace(/(\.\/|\.js)/g, '');
      const originLang = require('element-ui/lib/locale/lang/' + resultKey).default;
      messages[resultKey] = Object.assign(files(key).default,originLang);
      // Vue.locale(resultKey, Object.assign(files(key).default),originLang);
      return true;
    }
  });
  const i18n = new VueI18n({
    locale: localStorage.getItem("i18n") || 'zh-CN',
    messages,
  })
  return i18n;
};
