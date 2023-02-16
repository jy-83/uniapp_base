<template>
  <u-popup
    :show="value"
    @close="close"
    @open="open"
    :overlay="overlay"
    :mode="mode"
    :closeable="closeable"
    :round="round"
    :closeOnClickOverlay="closeOnClickOverlay"
  >
    <slot></slot>
  </u-popup>
</template>

<script>
  const { border_radius_lg } = require("@/styles/theme");
  export default {
    name: "uni-popup",
    data() {
      return {
        theme: this.$theme,
      };
    },
    props: {
      //是否显示
      value: {
        type: Boolean,
        default: false,
      },
      //是否显示遮罩
      overlay: {
        type: Boolean,
        default: true,
      },
      //弹出方向 top / right / bottom / center
      mode: {
        type: String,
        default: "bottom",
      },
      //	是否显示关闭图标
      closeable: {
        type: Boolean,
        default: true,
      },
      //圆角
      round: {
        type: String,
        default: border_radius_lg,
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      close() {
        this.$emit("input", false);
      },
      open() {
        this.$emit("input", true);
      },
    },
  };
</script>

<style scoped></style>
