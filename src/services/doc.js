/*
* @Author: qinyang
* @Date:   2018-07-04 18:06:48
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-04 20:15:48
*/
import request from '@/utils/request';

/**
 * 获取笔记的详情
 * @param  {Number} id 笔记的id
 */
export function getDocItem(id) {
  return request.get(R_URL.doc.DOC_ITEM, {
    params: { id },
  })
    .then(res => res.data);
}
