/*
* @Author: qinyang
* @Date:   2018-07-04 18:11:13
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-04 20:02:39
*/
import request from '@/utils/request';

/**
 * 获取看板任务的详情
 * @param  {Number} id 看板任务的id
 */
export function getKanBanItem(id) {
  return request.get(R_URL.kanban.KANBAN_ITEM, {
    params: { id },
  })
    .then(res => res.data);
}

/**
 * 获取看板任务的评论列表
 * @param  {Number} id 看板任务的id
 */
export function getKanbanItemComment(id) {
  return request.get(R_URL.kanban.KANBAN_COMMENTS, {
    params: { kanbanItemId: id },
  })
    .then(res => res.data);
}
