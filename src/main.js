import '@/styles/reboot.scss';
import '@/styles/editor.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ReditorLibrary from './utils/reditorLibrary';

Vue.config.productionTip = false;
ReditorLibrary.init(R_URL.BASE_URL + R_URL.common.REDITOR_RESOURCE);
ReditorLibrary().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});

