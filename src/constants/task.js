/*
* @Author: qinyang
* @Date:   2018-07-04 21:10:01
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-04 22:07:31
*/

export const PrintMap = {
  name: {
    name: '任务名称',
  },
  note: {
    name: '任务描述',
    needHtml: true,
    class: 'editor-style',
  },
  members: {
    name: '任务成员',
  },
  subTasks: {
    name: '子任务',
    needHtml: true,
  },
  from: {
    name: '任务来源',
  },
  starComments: {
    name: '星标评论',
    needHtml: true,
  },
  date: {
    name: '任务日期',
  },
};

export const PrintList = Object.keys(PrintMap);
