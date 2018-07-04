/*
* @Author: qinyang
* @Date:   2018-05-18 11:57:57
* @Last Modified by:   qinyang
* @Last Modified time: 2018-07-05 03:42:02
*/
const COLLECT_TYPE = {
  ESSAYS: 'essays',
  DAILY: 'daily',
  WEEK: 'week',
  MONTH: 'month',
};

/**
 * 解析笔记的日期详细信息
 * @param  {String} date        日期字符串 日： xxxx.xx.xx 周: xxxx.xx 月: xxxx.xx
 * @param  {String} collectType 文集类型
 * @return {Object}             详细的日期对象
 */
export function getDocItemDateInfo(date, collectType) {
  let year;
  let month;
  let week;
  let day;
  if (collectType === COLLECT_TYPE.ESSAYS) return {}; // 普通文集没有日期信息
  if (collectType === COLLECT_TYPE.DAILY) {
    const d = new Date(`${date.replace(/\./g, '-')}T00:00:00+08:00`);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
  } else if (collectType === COLLECT_TYPE.WEEK) {
    const d = date.split('.');
    year = parseInt(d[0], 10);
    week = parseInt(d[1], 10);
  } else if (collectType === COLLECT_TYPE.MONTH) {
    const d = date.split('.');
    year = parseInt(d[0], 10);
    month = parseInt(d[1], 10);
  }
  return {
    year, month, week, day,
  };
}

/**
 * 重新处理docItem里的date，日报: 直接返回；周报和月报，把周数或者月数补全为2位数之后，再返回
 * 主要用于做时间对比，谁在前，谁在后
 * @param  {[type]} date        [description]
 * @param  {[type]} collectType [description]
 * @return {[type]}             [description]
 */
export function getDocItemDateStr(date, collectType) {
  if (collectType === COLLECT_TYPE.DAILY) {
    return date;
  } else if (collectType === COLLECT_TYPE.WEEK || collectType === COLLECT_TYPE.MONTH) {
    const dateArr = date.split('.');
    if (dateArr.length !== 2) return date;
    if (dateArr[1].length === 1) {
      return `${dateArr[0]}.0${dateArr[1]}`;
    }
    return date;
  }
}

/**
 * 生成日期提示字符串如 几年几月 几年第几周
 * @param  {String} date        日期字符串
 * @param  {String} collectType 文集类型
 * @return {[type]}             [description]
 */
export function getDocItemDateStrTip(date, collectType) {
  const info = getDocItemDateInfo(date, collectType);
  if (collectType === COLLECT_TYPE.MONTH) {
    return `${info.year}年${info.month}月`;
  } else if (collectType === COLLECT_TYPE.WEEK) {
    return `${info.year}年第${info.week}周`;
  } else if (collectType === COLLECT_TYPE.DAILY) {
    return `${info.month}月${info.day}日`;
  } return '';
}

/**
 * 获取上一层日期，比如周报，就获取年，月报也获取年，日报就获取月；主要用于加载哪些日期有笔记的date参数
 * @param  {[type]} date        [description]
 * @param  {[type]} collectType [description]
 * @return {[type]}             [description]
 */
export function getParentDate(date, collectType) {
  if (!date) return null;
  if (collectType === COLLECT_TYPE.DAILY) {
    const l = date.split('.');
    return `${l[0]}.${l[1]}`;
  } else if (collectType === COLLECT_TYPE.WEEK || collectType === COLLECT_TYPE.MONTH) {
    return date.split('.')[0];
  }
}
