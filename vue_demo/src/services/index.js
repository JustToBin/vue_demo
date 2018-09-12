import Logger from "./Logger";

const Services = {
  install: (Vue) => {
    Vue.prototype.$logger = Logger;
    window.$logger = Logger;
    Vue.prototype.$vux = {
      bus: new Vue()
    };
  }
};

export default Services;
