import { PrintList } from '@/constants/task';
import Vue from 'vue';
import Router from 'vue-router';
import Doc from './views/Doc.vue';
import Task from './views/Task.vue';
import NotFound from './views/404.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/print',
  routes: [
    {
      path: '/doc/:docId',
      component: Doc,
      props: route => ({
        docId: Number(route.params.docId),
      }),
      beforeEnter(to, from, next) {
        store.commit('changeHeaderTitle', '打印笔记');
        next();
      },
    },
    {
      path: '/task/:type/:taskId',
      component: Task,
      props: (route) => {
        // 用户传入的打印列表，用 _ 拼接
        const pl = route.query.printList || PrintList.join('_');
        return {
          type: route.params.type,
          taskId: route.params.taskId,
          printList: pl.split('_').filter(item => PrintList.includes(item)), // 用 '_' 隔开之后，再过滤一下
        };
      },
      beforeEnter: (to, from, next) => {
        const types = ['todo', 'kanban'];
        if (types.includes(to.params.type)) {
          store.commit('changeHeaderTitle', '打印任务');
          next();
        } else {
          next('/404');
        }
      },
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
