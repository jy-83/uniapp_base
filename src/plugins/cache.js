/**

 * @author jiangyi

 * @date 2023-02-07 14:40

 */

/**
 * 缓存相关操作
 */
class Cache {
  setCache(key, value) {
    uni.setStorageSync(key, JSON.stringify(value));
  }
  getCache(key) {
    const value = uni.getStorageSync(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteCache(key) {
    uni.removeStorageSync(key);
  }
  clearCache() {
    uni.clearStorageSync();
  }
}

export default new Cache();
