/**

 * @author jiangyi

 * @date 2023-02-11 10:16

 */
const DEFAULT_OPTION={
    title:'',
    icon:'none',
    image:'',
    mask:true,
    duration:1500
}

class Toast {
    /**
     * @param {Object} option
     * @param {Object} option.title 提示的内容
     * @param {Object} option.icon 图标
     * @param {Object} option.image 自定义图标的本地路径
     * @param {Object} option.mask 是否显示透明蒙层
     * @param {Object} option.duration 提示的延迟时间
     **/
    constructor(option=DEFAULT_OPTION) {
        this.option=option
    }
    /**错误**/
    error(title,option){
        uni.showToast({
            ...this.option,
            title,
            icon:'error',
            ...option
        })
    }
    /**成功**/
    success(title,option){
        uni.showToast({
            ...this.option,
            title,
            icon:'success',
            option
        })
    }
    /**默认无icon**/
    info(title,option){
        uni.showToast({
            ...this.option,
            title,
            ...option
        })
    }
}

export default new Toast()