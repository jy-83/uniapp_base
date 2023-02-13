<template>
  <view class="upload">
    <view class="image" v-for="(item,index) in fileList" :key="index" @click="previewImage(index)">
      <uni-lazy-image width="160rpx" :src="item" height="160rpx"></uni-lazy-image>
    </view>
    <view class="addFile" @click="addFile">
      <u-icon name="camera" :color="theme.text_color_inverse" size="58"></u-icon>
    </view>
  </view>
</template>

<script>
import {isString, isEmpty, isArray} from "@/utils/validate";
import {previewImage,uploadImage} from "@/utils/file";

export default {
  name: "uni-upload",
  data() {
    return {
      fileList: [],
      theme:this.$theme
    };
  },
  props:{
    data:{

    },
    max:{
      type:Number,
      default:3
    }
  },
  watch: {
    /**监听传入的值为字符串还是数组**/
    data:{
      handler(newVal){
        if (isEmpty(newVal)) {
          this.fileList = [];
          return;
        }
        if (isString(newVal)) {
          this.fileList = newVal.split(",");
          return;
        }
        if (isArray(newVal)) {
          this.fileList = newVal;
        }
      },
      immediate:true
    },
  },
  methods:{
    /**预览**/
    previewImage(index){
      previewImage(this.fileList,index)
    },
    addFile(){
      uploadImage(this.fileList,this.max).then(res=>{
        this.fileList.push(...res)
      })
    }
  }
};
</script>

<style scoped lang="scss">
.upload {
  display: flex;
  flex-wrap: wrap;
  margin:-10rpx;
  .image {
    width: 160rpx;
    height: 160rpx;
    margin:10rpx;
  }
  .addFile{
    width: 160rpx;
    height: 160rpx;
    background: $bg-color-grey;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:10rpx;
  }
}
</style>