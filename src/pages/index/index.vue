<template>
  <view>
    <uni-form ref="form" :formConfig="formConfig" :defaultFormData="defaultFormData">
      <template #test100>
        <view>测试一下</view>
      </template>
    </uni-form>
    <uni-bottom-popup v-model="value" ref="pop" @change="change"></uni-bottom-popup>
    <button @click="validate">按钮</button>
  </view>
</template>

<script>
  import { PHONE } from "@/utils/regEx";

  export default {
    components: {},
    data() {
      return {
        value: "",
        theme: this.$theme,
        defaultFormData: {
          test3: true,
          test1: "测试一下啊测试一下啊测试一下啊测试一下啊测试一下啊测试一下啊测试一下啊",
          test: "",
          test4: 6,
          test5: 20,
          test7: [1, 2],
          test8: 1,
          test9: ["https://cdn.uviewui.com/uview/album/1.jpg"],
          test12: "2023-04-04",
        },
        formConfig: {
          mode: "editor",
          form: [
            {
              type: "slot",
              label: "测试",
              slotName: "test100",
            },
            {
              type: "input",
              key: "test",
              label: "测试",
              required: true,
            },
            {
              type: "textarea",
              key: "test1",
              label: "测试1",
            },
            {
              type: "switch",
              key: "test3",
              label: "测试",
            },
            {
              type: "rate",
              key: "test4",
              label: "评分",
            },
            {
              type: "slider",
              key: "test5",
              label: "评分",
            },
            {
              type: "numberBox",
              key: "test6",
              label: "步进器",
            },
            {
              type: "checkboxGroup",
              label: "复选框",
              key: "test7",
            },
            {
              type: "radioGroup",
              label: "单选框",
              key: "test8",
            },
            {
              type: "upload",
              label: "上传附件",
              key: "test9",
            },
            {
              type: "select",
              key: "test10",
              keyName: "name",
              labelName: "name",
              label: "测试啊",
              placeholder: "请选择",
            },
            {
              type: "select",
              key: "test11",
              keyName: "testName",
              labelName: "name",
              label: "测试啊",
              placeholder: "请选择",
              event: "test",
              selectType: "checkbox",
            },
            {
              type: "datetime",
              key: "test12",
              label: "时间选择器",
            },
          ],
          rules: {
            test9: {
              type: "array",
              required: true,
              message: "请上传附件",
              trigger: ["blur", "change"],
            },
            test: [
              {
                type: "string",
                required: true,
                message: "请填写测试",
                trigger: ["blur", "change"],
              },
              {
                pattern: PHONE.source,
                message: "请填写正确的手机号",
              },
            ],
          },
          init: {
            test10: [
              {
                name: "测试",
                id: 1,
              },
              {
                name: "哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈",
                id: 2,
              },
            ],
            test11: [
              {
                name: "测试",
                id: 1,
              },
              {
                name: "哈啊哈",
                id: 2,
              },
            ],
            test8: [
              {
                name: "测试",
                value: 1,
              },
              {
                name: "哈啊哈",
                value: 2,
              },
            ],
          },
        },
      };
    },
    onLoad() {
      console.log(this.formConfig);
    },
    methods: {
      validate() {
        this.$refs.form.resetFields();
      },
      change(e) {},
    },
  };
</script>

<style lang="scss">
  .content {
  }
</style>
<style lang="scss" scoped></style>
