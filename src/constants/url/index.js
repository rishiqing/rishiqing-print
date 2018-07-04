/*
* @Author: qinyang
* @Date:   2018-07-04 16:01:03
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-05 03:29:27
*/
import * as path from 'path';

let BASE_URL = '/task';
if (__DEV__) {
  const serverPath = window.localStorage.getItem('dev-server-path');
  BASE_URL = serverPath || '/task';
}

const context = require.context('./api', false, /\.js$/);
const api = {
  BASE_URL,
};
context.keys().forEach((item) => {
  const fileName = item.slice(2, -3);
  const p = path.join('api', item);
  api[fileName] = require(`./${p}`).default;
});

export default api;
