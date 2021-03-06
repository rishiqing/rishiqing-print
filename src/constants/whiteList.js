/*
* @Author: qin yang
* @Date:   2016-12-09 22:40:30
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-04 23:29:18
*/

export default {
  tags: [
    'br', 'span', 'a', 'img', 'b', 'strong', 'i', 'strike',
    'u', 'font', 'p', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'h1',
    'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'inherit', 'table', 'colgroup', 'col', 'thead',
    'tbody', 'th', 'tr', 'td', 'input',
  ],
  attributes: {
    img: [
      'src', 'alt', 'width', 'height',
      'data-non-image', 'data-bucket', 'data-key-name', 'data-osskey',
      'data-name', 'class', 'data-location', 'data-original',
    ],
    a: ['href', 'target', 'data-id', 'data-mention', 'class', 'download'],
    font: ['color', 'size', 'face', 'style'],
    code: ['class'],
    p: [
      'class', 'data-unique-id', 'data-file-id',
      'data-file-name', 'data-file-src', 'data-attach',
      'data-img', 'data-global-link', 'data-setting',
      'data-task-block', 'data-map',
    ],
    span: [
      'class', 'contenteditable', 'data-name',
      'data-size', 'href', 'data-bucket',
      'data-osskey', 'data-key-name', 'title',
      'data-global-link-type', 'data-title', 'data-sub-title',
      'data-attach-type',
    ],
    col: ['width'],
    div: ['class'],
    input: [
      'class', 'type', 'value', 'disabled', 'data-user-id',
    ],
  },
  styles: {
    span: ['color', 'font-size', 'font-family', 'background-color', 'font-weight'],
    b: ['color'],
    i: ['color'],
    strong: ['color'],
    strike: ['color'],
    u: ['color'],
    p: ['margin-left', 'text-align', 'line-height'],
    h1: ['margin-left', 'text-align'],
    h2: ['margin-left', 'text-align'],
    h3: ['margin-left', 'text-align'],
    h4: ['margin-left', 'text-align'],
    img: ['width', 'height'],
    font: ['color', 'font-size', 'font-family', 'background-color'],
    ul: ['line-height'],
    ol: ['line-height'],
  },
};
