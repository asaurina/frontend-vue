import Vue from 'vue';
import App from './App.vue';

import VueNotify from 'vuejs-notify';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueNotify);

Vue.use(Loading, {
  color: '#0A7CFF',
  loader: 'dots',
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
