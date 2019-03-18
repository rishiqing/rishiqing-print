// 这个文件的代码需要写得尽量完善，尽量简洁，减少更新
// 这个文件最后会在web端/webapp端/笔记打印、分享等处复制粘贴进行使用
// 因此需要这个文件一旦更新会导致多出修改。
// 这个文件不能引用任何第三方库，必须尽量精简
// 这个文件也会发布到oss里，且采用非压缩的状态，之后好进一步实现客户端的代码更新
// 这是一个对内的文件，所以不采用npm进行发布
// vue-cli-plugin-rishiqing 插件里也可以集成这个文件的更新
// editor-file-data.json文件的路径，需要通过server提供的接口来获取
// 这样方便server对新版编辑器做灰度发布

// 使用方法：
// 在需要用编辑器的工程中粘贴这个文件。
// 在需要用编辑器的时机，引用这个文件，import ReditorLibrary from '...'
// 使用ReditorLibrary.init(path, token)初始化。
// 使用ReditorLibrary().then((library)=>{ const lib = new Library()})

function ReditorLibrary() {
  return new Promise((resolve, reject) => {
    // 循环检测 window.ReditorLibrary 是否存在
    // 如果不存在，则间隔300ms之后，再继续检测
    // 最多可进行 2000 次检查，也即 600s, 等于 10 分钟
    // 10分钟之后，如果还没有获取到 window.ReditorLibrary，就报错
    let detectCount = 0;
    function detectReditorLibrary() {
      if (window.ReditorLibrary) {
        resolve(window.ReditorLibrary);
      } else if (detectCount < 2000) {
        setTimeout(detectReditorLibrary, 300);
      } else if (detectCount >= 2000) {
        reject(new Error('get window.ReditorLibrary timeout!'));
      }
      detectCount += 1;
    }
    detectReditorLibrary();
  });
}

// 参数path在不同场景的值：
// reditor的web/native/history:
// 配合.env文件，本地调试时，值为process.env.JSON_URL || '/task/reditor/client/library/editor-file-data'
// 有.env的路径时指向本地 /.libraryCache/editor-file-data.json，
// 发布时，为 对应域名/task/reditor/client/library/editor-file-data
//
// 主前端：
// 配合.env文件，值为process.env.REDITOR_JSON || R_URL.BASE_URL + R_URL.basic.REDITOR_RESOURCE;
// 有.env的路径时指向本地，
// 发布时，指向远程 对应域名/task/reditor/client/library/editor-file-data
//
// 笔记分享、打印：
// 值为R_URL.BASE_URL + R_URL.basic.REDITOR_RESOURCE
// 指向远程 对应域名/task/reditor/client/library/editor-css-data
// 仅能获取到css。但是不需要传token,可以直接获取。
ReditorLibrary.init = function init(path, token) {
  const getEditorFileData = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.onload = function onload() {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = function onerror() {
      reject(new Error('get editor-file-data.json error'));
    };
    if (token) {
      xhr.setRequestHeader('token', token);
    }
    xhr.send();
  });

  getEditorFileData.then((data) => {
    const head = document.getElementsByTagName('head')[0];
    if (!head) return;
    const cssList = data.css || [];
    const jsList = data.js || [];
    cssList.forEach((source) => {
      const link = document.createElement('link');
      link.href = source;
      link.rel = 'stylesheet';
      head.insertBefore(link, head.firstElementChild); // 把这个 link css 放到最前面，作为最基础样式
    });
    jsList.forEach((source) => {
      const script = document.createElement('script');
      script.charset = 'utf-8';
      script.timeout = 120;
      script.src = source;
      head.appendChild(script);
    });
  });
};

// 返回一个函数
// 这个函数会返回一个Promise，这个Promise会返回一个ReditorLibrary构造函数
// 这里应该提供一个能提前结束的方式
// 不然在调用这个方法的地方，如果在获取ReditorLibrary的过程中，切换到其他地方去了
// 但是当获取到了ReditorLibrary之后，会继续执行后面的代码，可能会导致bug
export default ReditorLibrary;
