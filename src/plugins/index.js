/**

 * @author jiangyi

 * @date 2023-02-11 14:43

 */
import _ from "lodash";
import cache from "./cache";
import modal from "./modal";
import toast from "./toast";
import { format as dateFormat } from "./dateFormat";

export default {
  install(Vue) {
    Vue.prototype.$cache = cache;
    Vue.prototype.$modal = modal;
    Vue.prototype.$toast = toast;
    Vue.prototype.$dateFormat = dateFormat;
    Vue.prototype.$_ = _;
  },
};
