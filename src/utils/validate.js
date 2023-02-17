import { EMAIL, PHONE, URL } from "@/utils/regEx";

/**
 * 路径
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = URL;
  return reg.test(url);
}

/**
 * 邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = EMAIL;
  return reg.test(email);
}

/**
 * 手机
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
  const reg = PHONE;
  return reg.test(mobile);
}

/**
 * 属性是否为有效值
 * @param value
 * @returns {Boolean}
 */
export function isEmpty(value) {
  return value === null || value === undefined || value === "" || value.length === 0;
}

/**
 * 字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}
/**
 * 数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
/**
 * 数字
 * @param {number} num
 * @returns {Boolean}
 * **/
export function isNumber(num) {
  return typeof num === "number";
}

/**
 * 函数
 * @param {Function} fn
 * @returns {Boolean}
 * **/
export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === "[object Function]";
}
