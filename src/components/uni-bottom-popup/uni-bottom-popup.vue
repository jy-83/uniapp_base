<template>
  <uni-popup v-model="show">
    <view class="popup">
      <view class="title">
        {{ title }}
      </view>
      <scroll-view>
        <slot>
          <template v-if="type === 'radio'">
            <u-radio-group
              v-model="copyValue"
              placement="column"
              iconPlacement="right"
              :activeColor="theme.color_primary"
            >
              <u-radio
                :customStyle="{ paddingBottom: '24rpx' }"
                v-for="(item, index) in data"
                :key="index"
                :label="item[labelName]"
                :name="item[valueName]"
              ></u-radio>
            </u-radio-group>
          </template>
          <template v-else>
            <u-checkbox-group
              v-model="copyValue"
              placement="column"
              iconPlacement="right"
              :activeColor="theme.color_primary"
            >
              <u-checkbox
                :customStyle="{ paddingBottom: '24rpx' }"
                v-for="(item, index) in data"
                :key="index"
                :label="item[labelName]"
                :name="item[valueName]"
              ></u-checkbox>
            </u-checkbox-group>
          </template>
        </slot>
      </scroll-view>
      <u-button @click="confirm" shape="circle" :color="theme.color_primary">确定</u-button>
    </view>
  </uni-popup>
</template>

<script>
  import request from "@/utils/request";
  import { isArray, isEmpty } from "@/utils/validate";

  export default {
    name: "uni-bottom-popup",
    data() {
      return {
        show: false,
        data: [],
        theme: this.$theme,
        copyValue: "",
      };
    },
    props: {
      title: {
        type: String,
        default: "请选择",
      },
      type: {
        type: String,
        default: "radio",
      },
      //传递的初始值
      value: {
        require: true,
      },
      //列表数据
      initData: {
        type: Array,
        default: () => [],
      },
      //用于列表搜索
      queryUrl: {
        type: String,
      },
      //显示的名称
      labelName: {
        type: String,
        default: "name",
      },
      valueName: {
        type: String,
        default: "id",
      },
    },
    created() {
      this.handleData();
    },
    methods: {
      // 打开
      open() {
        this.show = true;
        this.copyValue = this.$_.clone(this.value);
      },
      // 关闭
      close() {
        this.show = false;
      },
      //获取数据
      getData() {
        request
          .post({
            url: this.queryUrl,
          })
          .then((res) => {});
      },
      //处理初始化数据
      handleData() {
        if (this.queryUrl) {
          this.getData();
        } else {
          this.data = this.initData;
        }
      },
      confirm() {
        if (isEmpty(this.copyValue)) {
          this.$toast.info("请选择");
          return;
        }
        let copyValue;
        if (isArray(this.copyValue)) {
          copyValue = this.copyValue.join(",");
        } else {
          copyValue = this.copyValue.toString();
        }
        let current;
        current = this.initData.filter((item) => {
          return copyValue.indexOf(item[this.valueName]) != -1;
        });
        this.$emit("input", this.copyValue);
        this.$emit("change", current);
        this.close();
      },
    },
  };
</script>

<style scoped lang="scss">
  .popup {
    padding: 0 32rpx;

    .title {
      text-align: center;
      font-size: $font_size_lg;
      font-weight: bolder;
      height: 80rpx;
      line-height: 80rpx;
    }

    scroll-view {
      max-height: 40vh;
      min-height: 20vh;
    }
  }
</style>
