/*
  格式化日期
*/
export function formateDate(time) {
  var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() + ' ';
  return M + D
}