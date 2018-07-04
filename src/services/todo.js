/*
* @Author: qinyang
* @Date:   2018-07-04 16:59:17
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-04 20:02:50
*/
import request from '@/utils/request';

/**
 * 获取日程任务的详情
 * @param  {String} id 日程任务的id
 */
export function getTodoItem(id) {
  return request.get(R_URL.todo.TODO_ITEM, {
    params: { id },
  })
    .then(res => res.data);
}

/**
 * 获取日程任务的评论列表
 * @param  {String} id 日程任务的id
 */
export function getTodoItemComments(id) {
  return request.get(R_URL.todo.TODO_COMMENTS, {
    params: { todoId: id },
  })
    .then(res => res.data);
}
