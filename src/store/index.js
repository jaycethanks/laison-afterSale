import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import kform from './modules/kform';
import bpmn from './modules/bpmn';
import flowform from './modules/flowform';
import system from './modules/system';
Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    kform,
    bpmn,
    flowform,
    system,
  },
  state: {},
  mutations: {},
  actions: {},
});
