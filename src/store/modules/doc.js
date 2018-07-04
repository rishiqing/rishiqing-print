/*
* @Author: qinyang
* @Date:   2018-07-04 19:06:48
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-05 03:45:19
*/
import { getDocItem } from '@/services/doc';
import { getDocItemDateInfo } from '@/lib/doc/date';
import { dateFormat } from '@/lib/common/date-format';

function getDateInfo(date, corpusType) {
  return getDocItemDateInfo(date, corpusType);
}

export default {
  namespaced: true,
  state() {
    return {
      name: '',
      note: '',
      corpusType: '',
      creatorId: null,
      date: null,
      lastUpdated: '',
      creator: {},
    };
  },
  getters: {
    info(state) {
      return `${state.creator.showName || ''} 编辑于${dateFormat(state.lastUpdated)}`;
    },
    isEssay(state) {
      return state.corpusType === 'essays';
    },
    isDaily(state) {
      return state.corpusType === 'daily';
    },
    isWeek(state) {
      return state.corpusType === 'week';
    },
    isMonth(state) {
      return state.corpusType === 'month';
    },
    // 获取日期提醒的相关数据
    dateTip(state, getters) {
      const data = {};
      const dateInfo = getDateInfo(state.date, state.corpusType);
      if (getters.isDaily) {
        data.left = dateInfo.day;
        data.rightTop = `${dateInfo.month}月`;
        data.rightBottom = dateInfo.year;
      }
      if (getters.isWeek) {
        data.left = dateInfo.week;
        data.right = '周';
      }
      if (getters.isMonth) {
        data.left = dateInfo.month;
        data.right = '月';
      }
      return data;
    },
  },
  mutations: {
    reset(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    getDetail({ commit }, params) {
      getDocItem(params.docId)
        .then(data => commit('reset', data));
    },
  },
};
