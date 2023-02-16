/**

 * @author jiangyi

 * @date 2023-02-10 14:28

 */
const { color_primary, text_color_grey } = require("@/styles/theme");

const DEFAULT_OPTION = {
  title: "温馨提示",
  showCancel: true,
  cancelText: "取消",
  cancelColor: text_color_grey,
  confirmText: "确定",
  confirmColor: color_primary,
  editable: false,
  placeholderText: "请输入",
};
/**
 * @class
 * **/
class Modal {
  /**
   * @param {Object} option
   * @param {string} option.title 标题
   * @param {boolean} option.showCancel 是否显示取消按钮
   * @param {string} option.cancelText 取消按钮文字
   * @param {string} option.cancelColor 取消按钮颜色
   * @param {string} option.confirmText 确认按钮文字
   * @param {string} option.confirmColor 确认按钮颜色
   * @param {boolean} option.editable 是否显示输入框
   * @param {string} option.placeholderText 输入框文本内容占位
   * **/
  constructor(option = DEFAULT_OPTION) {
    this.option = option;
  }
  /**确认弹窗**/
  confirm(content, option) {
    return new Promise((resolve, reject) => {
      uni.showModal({
        ...this.option,
        content,
        ...option,
        success: (res) => {
          if (res.confirm) {
            resolve(res);
          }
        },
      });
    });
  }
  /**输入框弹窗**/
  edit(title, option) {
    return new Promise((resolve, reject) => {
      uni.showModal({
        ...this.option,
        title,
        editable: true,
        ...option,
        success: (res) => {
          if (res.confirm) {
            resolve(res.content);
          }
        },
      });
    });
  }
}

export default new Modal();
