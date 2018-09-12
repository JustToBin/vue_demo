import Vue from 'vue';
import Vuex from 'vuex';
import Promise from 'promise-polyfill';

window.Promise = Promise;

import * as modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
});

export default store;
