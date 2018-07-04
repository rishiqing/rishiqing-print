import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  /*
  不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  */
  strict: __DEV__,
  state: {
    headerTitle: '打印',
  },
  mutations: {
    changeHeaderTitle(state, title) {
      state.headerTitle = title;
    },
  },
  actions: {

  },
  modules,
});
