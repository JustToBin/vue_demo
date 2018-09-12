export default {
  curDate() {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    return start;
  },
  beforeDate(num) {
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    return start;
  },
  addDate(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 3600 * 1000 * 24 * num);
    return start;
  },
  addMinute(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 60 * 1000 * num);
    return start;
  },
  addSecond(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 1000 * num);
    return start;
  },
  format(date, _fmt) {
    let fmt = _fmt;
    if (!fmt) {
      fmt = "yyyy-MM-dd hh:mm:ss";
    }
    const o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    
    return fmt;
  }
};
