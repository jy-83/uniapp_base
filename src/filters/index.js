/**

 * @author jiangyi

 * @date 2023-02-11 12:03

 */
import { isString, isNumber } from "@/utils/validate";
export { format, dateFrom, dateTo } from "@/plugins/dateFormat";

/**
 * 数字格式化
 * @param {number|string} num
 * @param {decimal} num
 * **/
export function numFormat(num, decimal = 2) {
  if (isString(num)) {
    return Number(num).toFixed(decimal);
  }
  if (isNumber(num)) {
    return num.toFixed(decimal);
  }
}
