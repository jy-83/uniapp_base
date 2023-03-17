/**

 * @author jiangyi

 * @date 2023-02-14 13:19

 */

const DEFAULT_CONFIG = {
  errorType: "toast", //校验提示方式 none|toast|border-bottom|message
  borderBottom: false, //是否显示底部的border
  labelPosition: "left", //表单域提示文字的位置，left-左侧，top-上方
  labelWidth: "auto", //提示文字的宽度，单位px 数值 / auto
  labelAlign: "left", //label字体的对齐方式center / right /left
  labelStyle: {
    width: "200rpx",
  }, //label的样式，对象形式
  // input默认配置
  input: {
    clearable: true, //是否显示清空按钮
    maxlength: -1,
    placeholder: "请输入",
    inputType: "text", //number | idcard | digit | password
    inputAlign: "left", //left | center | right
  },
  // textarea默认配置
  textarea: {
    placeholder: "请输入",
    height: "400rpx",
    count: true,
    border: "none",
  },
  //评分
  rate: {
    count: 5, //最多可选的星星数量
    size: 28, //星星的大小
    allowHalf: true, //是否允许出现半星
    touchable: true, //是否可以通过滑动手势选择评分
    minCount: 0, //最少选中星星的个数
  },
  //滑动选择器
  slider: {
    showValue: true, //是否显示右侧的数字
    min: 0, //最小选择的值
    max: 100, //最大选择的值
  },
  // 开关
  //步进器
  numberBox: {
    min: 1, //最小值
    max: 10, //最大值
    step: 1, //步长
    disabledInput: false, //是否禁止使用输入框
  },
  //复选框
  checkboxGroup: {
    borderBottom: true,
    placement: "row", //布局方式，row-横向，column-纵向
    customStyle: {
      marginRight: "20rpx",
    },
  },
  //单选框
  radioGroup: {
    borderBottom: true,
    placement: "row",
    customStyle: {
      marginLeft: "20rpx",
    },
  },
  //上传附件
  upload: {
    max: 3,
    btype: "",
    disabled: false,
  },
  //弹出层选择
  select: {
    placeholder: "请选择",
    inputAlign: "left",
    selectType: "radio",
  },
  // 时间选择器
  datetime: {
    mode: "datetime", //date为日期选择，time为时间选择，year-month为年月选择
    placeholder: "请选择",
    minDate: Date.now(), //最小选择的时间
    inputAlign: "left",
  },
  slot: {},
  rules: {},
};

export default DEFAULT_CONFIG;
