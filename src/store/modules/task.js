/*
* @Author: qinyang
* @Date:   2018-07-04 19:06:55
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-09 12:42:09
*/
import {
  getKanBanItem,
  getKanbanItemComment,
} from '@/services/kanban';
import {
  getTodoItem,
  getTodoItemComments,
} from '@/services/todo';

export default {
  namespaced: true,
  state() {
    return {
      id: null,
      name: '',
      note: '',
      members: [],
      subTasks: [],
      from: {},
      comments: [],
      startDate: '',
      endDate: '',
    };
  },
  mutations: {
    reset(state, payload) {
      Object.assign(state, payload);
    },
    resetComments(state, payload) {
      state.comments = payload;
    },
  },
  getters: {
    starComments(state) {
      return state.comments.filter(comment => comment.startMark || comment.starMark);
    },
    starCommentsString(state, { starComments }) {
      if (!starComments.length) return '';
      return `<ul style="padding: 16px;">${starComments.map(comment => `
          <li>
            <p>${comment.creator.showName}</p>
            <div class="editor-style">${comment.content}</div>
            <p>—— ${comment.dateCreated}</p>
          </li>
        `).join('')}</ul>`;
    },
    membersString(state) {
      return state.members.map(member => member.showName).join(',');
    },
    subTasksString(state) {
      return `<ul style="padding: 16px;">${state.subTasks.map(task => `
          <li>${task.name}</li>
        `).join('')}</ul>`;
    },
    dateString(state) {
      return `${state.startDate} - ${state.endDate}`;
    },
    fromString({ from }) {
      const list = [];
      if (!from) return '';
      if (from.kanbanName) list.push(from.kanbanName);
      if (from.kanbanChildName) list.push(from.kanbanChildName);
      if (from.kanbanCardName) list.push(from.kanbanCardName);
      return list.join('-');
    },
  },
  actions: {
    getTaskItem({ commit, dispatch }, params) { // params = {type: 'kanban' | 'todo', taskId}
      let promise;
      if (params.type === 'kanban') {
        promise = getKanBanItem(params.taskId);
      } else {
        promise = getTodoItem(params.taskId);
      }
      promise
        .then(data => commit('reset', data))
        .then(() => {
          dispatch('getComments', params);
        });
    },
    getComments({ commit }, params) {
      let promise;
      if (params.type === 'kanban') {
        promise = getKanbanItemComment(params.taskId);
      } else {
        promise = getTodoItemComments(params.taskId);
      }
      promise
        .then((list) => {
          commit('resetComments', list);
        });
    },
  },
};
