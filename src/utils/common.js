/**

 * @author jiangyi

 * @date 2023-02-11 16:07

 */

/**
 * 获取页面栈
 * @param {number} num=2获取上一页面
 * **/
export function getCurrentPage(num = 2) {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - num];
    return new Promise((resolve, reject) => {
        if (currentPage) {
            resolve(currentPage);
        } else {
            reject("页面不存在");
        }
    });
}


/**
 * 支付调用
 * @param {object} obj支付凭证
 */
export function requestPayment(obj) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            provider: "wxpay",
            ...obj,
            success: function(res) {
                resolve(res);
            },
            fail: function(err) {
                reject(err);
            }
        });
    });
}

