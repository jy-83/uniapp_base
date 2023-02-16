/**
 * 主题文件
 * 可以在scss中直接使用 例如 $color_primary
 * 可以在js中直接使用 例如 color_primary
 * **/
module.exports = {
  /**行为相关**/
  color_primary: '#dd524d',
  color_success: '#4cd964',
  color_warning: '#f0ad4e',
  color_error: '#dd524d',
  /* 文字基本颜色 */
  text_color: '#333', // 基本色
  text_color_inverse: '#fff', // 反色
  text_color_grey: ' #999', // 辅助灰色，如加载更多的提示信息
  text_color_placeholder: '#808080',
  text_color_disable: '#c0c0c0',

  /* 背景颜色 */
  bg_color: ' #fff',
  bg_color_grey: '#F7F8FA',
  bg_color_hover: '#f1f1f1', // 点击状态颜色
  bg_color_mask: 'rgba(0, 0, 0, 0.4)', // 遮罩颜色

  /* 边框颜色 */
  border_color: '#c8c7cc',

  /* 尺寸变量 */

  /* 文字尺寸 */
  font_size_sm: '24rpx',
  font_size_base: '28rpx',
  font_size_lg: '32rpx',

  /* 图片尺寸 */
  img_size_sm: '40rpx',
  img_size_base: '52rpx',
  img_size_lg: '80rpx',

  /* Border Radius */
  border_radius_sm: '8rpx',
  border_radius_base: '12rpx',
  border_radius_lg: '24rpx',
  border_radius_circle: '50%',

  /* 水平间距 */
  spacing_row_sm: '10rpx',
  spacing_row_base: '20rpx',
  spacing_row_lg: '30rpx',

  /* 垂直间距 */
  spacing_col_sm: '8rpx',
  spacing_col_base: '16rpx',
  spacing_col_lg: '24rpx',

  /* 透明度 */
  opacity_disabled: '0.3', // 组件禁用态的透明度

  /* 文章场景相关 */
  color_title: '#2c405a', // 文章标题颜色
  font_size_title: ' 40rpx',
  color_subtitle: '#555', // 二级标题颜色
  font_size_subtitle: '36rpx',
  color_paragraph: '#3f536e', // 文章段落颜色
  font_size_paragraph: '30rpx',
};
