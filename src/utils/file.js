/**

 * @author jiangyi

 * @date 2023-02-07 16:31

 */
import {validURL, isString} from "@/utils/validate";
import modal from "@/plugins/modal";

/**
 * 加载图片
 * @param {string} src
 * @param {string|number} height
 * **/
export function loadImage(src, height) {
    if (!src) return '';
    src = src.toString();
    if (!validURL(src)) {
        src = `${process.env.VUE_APP_URL}${process.env.VUE_APP_IMG_BASE}${src}`;
    }
    /**
     * 是否走oss
     * 在.env文件配置**/
    if (process.env.VUE_APP_OSS_URL&&height) {
        height = height.toString();
        height = height.replace("rpx", "");
        src += `?x-oss-process=image/resize,h_${height},m_lfit`;
    }
    return src;
}

/**
 * 上传附件
 * @param {Array} imgList 已经上传的图片列表
 * @param {number} max 最大上传图片数量
 * @param {string} btype 绑定业务id需要的
 * **/
export function uploadImage(imgList, max = 1, btype) {
    let promise = new Promise((resolve, reject) => {
        uni.chooseImage({
            count: max - imgList.length,
            success: (chooseImageRes) => {
                const tempFilePaths = chooseImageRes.tempFilePaths;
                if ((imgList.length + tempFilePaths.length) <= max || max == 1) {
                    let imgList = [];
                    console.log(process.env.VUE_APP_URL +
                        `/index/attachment/upload${btype ? "?btype=" + btype : ""}`)
                    for (let i in tempFilePaths) {
                        uni.uploadFile({
                            url:`${process.env.VUE_APP_URL}/index/attachment/upload${btype ? "?btype=" + btype : ""}`,
                            filePath: tempFilePaths[i],
                            name: "file",
                            success: (uploadFileRes) => {
                                let res = JSON.parse(uploadFileRes.data);
                                if (res.error) {
                                    modal.confirm(res.message);
                                } else {
                                    imgList.push(...res.data);
                                }
                                if (tempFilePaths.length == imgList.length) {
                                    resolve(imgList);
                                }
                            }
                        });
                    }
                } else {
                    modal.confirm(`最多上传${max}张图片`);
                }
            }
        });
    });
    return promise;
}

/**
 * 预览图片
 * @param {Array|String}
 * @param {number} current
 **/
export function previewImage(urls, current) {
    if (isString(urls)) {
        urls = urls.split(",");
    }
    urls=urls.map(item=>{
        return loadImage(item)
    })
    uni.previewImage({
        urls,
        current
    });
}