import cache from "@/plugins/cache.js";
import toast from "@/plugins/toast";

const HttpService = function () {};

// 获取最终URL
const BaseURL = process.env.VUE_APP_URL.endsWith("/")
  ? process.env.VUE_APP_URL
  : process.env.VUE_APP_URL + "/";

/**
 * 拼接URL
 * @param baseURL 基础地址
 * @param url 请求地址
 * @param {Object}query 请求参数
 * @returns {string}
 */
const concatURL = function (baseURL = "", url = "", query = {}) {
  // 如果url本身满足协议头，则不进行任何处理
  let isProtocolURL = url.match(/^[a-z]+:\/\//);
  let finalURL = baseURL;
  if (!isProtocolURL) {
    if (url.startsWith("/")) {
      finalURL = finalURL + url.substring(1);
    } else {
      finalURL = finalURL + url;
    }
  } else {
    finalURL = url;
  }
  return finalURL;
};

/**
 * 拼接请求参数,返回拼接好的请求地址
 * @param {String}url url地址
 * @param {Object}queryString 请求参数对象
 */
const setParams = function (url, queryString = {}) {
  if (queryString && Object.keys(queryString).length > 0) {
    Object.keys(queryString).forEach((key, index) => {
      if (url.includes("?")) {
        url = `${url}&${key}=${queryString[key]}`;
      } else {
        url = `${url}?${key}=${queryString[key]}`;
      }
    });
  }
  return url;
};

HttpService.prototype = {
  /**
   * 请求拦截,返回uni.request需要的请求对象
   */
  _requestInterceptor(config) {
    const options = Object.assign(
      {
        method: "GET",
        header: {},
      },
      config,
    );

    // 如果没有url，则直接失败
    let url = options.url;
    if (!url) {
      throw "发起请求失败：缺少请求地址url!";
    }

    // 组装最终地址
    if (url.indexOf("http") !== 0) {
      options.url = concatURL(options.baseURL || BaseURL, url);
    }

    // 判断是否传递了params参数
    options.url = setParams(options.url, options.params);

    // 对于请求的是本站的地址，需要添加Token
    if (options.url.startsWith(BaseURL)) {
      // 设置Token请求头
      let user = cache.getCache("user");
      options.header["login-platform"] = "AED";
      if (user) {
        options.header.Authorization = `Bearer ${user.authToken}`;
      }
    }
    return options;
  },

  async request(config) {
    // 封装请求参数
    const options = this._requestInterceptor(config);

    if (config.showLoading === false) {
    } else {
      uni.showLoading();
    }
    return await new Promise((resolve, reject) => {
      options.complete = (response) => {
        uni.hideLoading();

        const status = response.statusCode;
        if (status === 200) {
          // 判断是否是错误的响应
          let data = response.data;
          if (data.code !== 200) {
            toast.info(data.msg);
            reject(data.message);
            return;
          }
          // 这里表示正确的响应
          resolve(data.data);
          return;
        }
        reject(response);
        // 打印错误
        printError(status);
      };
      uni.request(options);
    });
  },
};

/**
 * 处理请求异常的情况
 * @param {number} status 错误码
 */
function printError(status) {
  switch (status) {
    case 400:
      toast.error("请求参数错误！");
      break;
    case 404:
      toast.error("接口不存在！");
      break;
    case 500:
      toast.error("服务器错误！");
      break;
    default:
      toast.error("请求出现了一点小问题！");
      break;
  }
  throw "请求错误：" + status;
}

const request = {
  async get(config) {
    return await new HttpService({}).request({
      ...config,
      method: "get",
    });
  },
  async post(config) {
    return await new HttpService({}).request({
      ...config,
      method: "post",
    });
  },
};

export default request;
