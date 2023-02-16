/**

 * @author jiangyi

 * @date 2023-02-11 14:37

 */

/**
 * 分享功能
 * 如果不需要携带多余的参数引入即可
 **/
export default {
  data() {
    return {
      title: "",
      path: "", //发送到朋友的参数
      imageUrl: "",
      query: "", //发送到朋友圈的参数
    };
  },
  /**发送给朋友**/
  onShareAppMessage() {
    return {
      title: this.title,
      path: this.path,
      imageUrl: this.imageUrl,
      fail: (err) => {
        console.error(err);
      },
    };
  },
  /**分享到朋友圈**/
  onShareTimeline() {
    return {
      title: this.title,
      query: this.query,
      imageUrl: this.imageUrl,
      fail: (err) => {
        console.error(err);
      },
    };
  },
};
