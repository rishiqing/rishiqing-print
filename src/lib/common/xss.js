/*
* @Author: qinyang
* @Date:   2018-07-05 01:29:22
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-05 03:42:59
*/
import whiteList from '@/constants/whiteList';
import xss from 'xss';

export default function (content) {
  if (typeof content !== 'string') return content;
  const wl = {}; // _whiteList
  whiteList.tags.forEach((item) => {
    wl[item] = [];
  });
  Object.assign(wl, whiteList.attributes);

  return xss(content, {
    whiteList: wl,
    onIgnoreTagAttr(tag, name, value) {
      if (name === 'style') {
        return `${name}="${value}"`;
      }
    },
  });
}
