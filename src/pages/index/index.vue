<template>
  <view class="content" :style="{color:theme.color_primary}">
    <uni-form ref="form" :formConfig="formConfig" :defaultFormData="defaultFormData">
    </uni-form>
    <button @click="validate">按钮</button>
  </view>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      theme: this.$theme,
      defaultFormData: {
        test3: true,
        test1: '1',
        test: "测试一下啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
      },
      formConfig: {
        mode: "editor",
        form: [{
          type: "input",
          key: "test",
          label: "测试"
        }, {
          type: "textarea",
          key: "test1",
          label: "测试1"
        },
          {
            type: "switch",
            key: "test3",
            label: "测试"
          },
          {
            type: "rate",
            key: "test4",
            label: "评分"
          },
          {
            type: "slider",
            key: "test5",
            label: "评分"
          }, {
            type: "numberBox",
            key: "test6",
            label: "步进器"
          }, {
            type: "checkboxGroup",
            label: "复选框",
            key: "test7"
          }, {
            type: "radioGroup",
            label: "单选框",
            key: "test8"
          }
        ],
        rules: {
          test1: {
            type: "string",
            required: true,
            message: "请填写姓名",
            trigger: ["blur", "change"]
          }
        },
        init: {
          test7: [{
            name: "测试",
            value: 1
          }, {
            name: "哈啊哈",
            value: 2
          }],
          test8: [{
            name: "测试",
            value: 1
          }, {
            name: "哈啊哈",
            value: 2
          }]
        }
      }
    };
  },
  onLoad() {

  },
  methods: {
    validate() {
      this.$refs.form.validate().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss">
.content {

}
</style>
