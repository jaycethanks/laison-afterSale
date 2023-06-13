import Vue from 'vue';
import App from './App.vue';
import vueBus from '@/utils/vueBus';
import { VueAxios } from '@/utils/request';
import store from '@/store';
import router from '@/router';
import '@/lib/lazy_antd';
import i18n from '@/lang/index.js';
import '@/utils/localStorageEnhance.js'; //LocalStorage 方法增强

Vue.config.productionTip = false;
Vue.use(vueBus);
Vue.use(VueAxios);
new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
