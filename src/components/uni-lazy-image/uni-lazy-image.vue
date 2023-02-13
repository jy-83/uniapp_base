<template>
  <u--image :showLoading="true" :src="loadImage(src,height)" :radius="radius" :width="width" :height="height" :mode="mode">
    <template v-slot:loading>
      <u-loading-icon :color="theme.color_primary"></u-loading-icon>
    </template>
    <template #error>
      <view class="errorImage">
        <text>加载失败</text>
      </view>
    </template>
  </u--image>
</template>

<script>
import {loadImage} from "@/utils/file";

export default {
  name: "uni-lazyImage",
  data(){
    return{
      theme:this.$theme
    }
  },
  props:{
    src:{
      type:String,
      default:'https://cdn.uviewui.com/uview/album/1.jpg'
    },
    width:{
      type:String,
      required:true
    },
    height:{
      type:String,
      required: true
    },
    mode:{
      type:String,
      default: "aspectFill"
    },
    radius:{
      type:String,
      default:"0rpx"
    }
  },
  methods:{
    loadImage
  }
};
</script>

<style scoped lang="scss">
.errorImage{
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  font-size: $font_size_sm;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>