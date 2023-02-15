/**

 * @author jiangyi

 * @date 2023-02-14 13:19

 */

const DEFAULT_CONFIG={
    errorType:'message',//校验提示方式 none|toast|border-bottom|message
    borderBottom:true,//是否显示底部的border
    labelPosition:"left",//表单域提示文字的位置，left-左侧，top-上方
    labelWidth:'200rpx',//提示文字的宽度，单位px 数值 / auto
    labelAlign:'left',//label字体的对齐方式center / right /left
    labelStyle:{},//label的样式，对象形式
    // input默认配置
    input:{
        clearable:true,//是否显示清空按钮
        maxlength:-1,
        placeholder:'请输入',
        inputType:"text", //number | idcard | digit | password
        inputAlign:'right',//left | center | right
    },
    // textarea默认配置
    textarea:{
        placeholder: '请输入',
        height:70,
        count:true
    },
    //评分
    rate:{
        count:5,//最多可选的星星数量
        size:28,//星星的大小
        allowHalf:true,//是否允许出现半星
        touchable:true,//是否可以通过滑动手势选择评分
        minCount:0,//最少选中星星的个数
    },
    //步进器
    numberBox:{
        min:1,
        max:10,
        step:1
    },
    //复选框
    checkboxGroup:{
        placement:"row",//布局方式，row-横向，column-纵向
        customStyle:{
            marginRight:'20rpx'
        }
    },
    //单选框
    radioGroup: {
        placement: "row",
        customStyle:{
            marginRight:'20rpx'
        }
    },
    //上传附件
    upload:{
        max:4,
        btype:'',
        disabled:false
    }
}

export default DEFAULT_CONFIG;