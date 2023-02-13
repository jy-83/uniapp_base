/**
 * @author jiangyi
 * @date 2023-02-11 11:35
 * https://dayjs.fenxianglu.cn/ dayjs
 */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)
/**
 *时间格式化
 * @param {string|date|number} date 时间
 * @param {string} 格式化格式
 * */
export function format(date, format = "YYYY.MM.DD HH:mm") {
    if (date) {
        return dayjs(date).format(format);
    }
}

/**
 * 时间多久之前
 * @param {string|date|number} data 时间
 * @param {string|date|number} currentDate 相对于的时间
 * **/
export function dateFrom(date, currentDate = new Date()) {
    if (date) {
        return dayjs(date).locale('zh-cn').from(currentDate);
    }
}

/**
 * 时间多久之后
 * @param {string|date|number} date 时间
 * @param {string|date|number} currentDate 相对于的时间
 * */
export function dateTo(date,currentDate=new Date()){
    if(date){
        return dayjs(currentDate).locale('zh-cn').to(date)
    }
}
