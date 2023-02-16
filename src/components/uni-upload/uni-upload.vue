<template>
  <view class="upload">
    <view class="image" v-for="(item, index) in value" :key="index" @click="previewImage(index)">
      <view class="close" @click.stop="deleteFile(index)" v-if="!disabled">
        <u-icon name="close-circle-fill" size="32rpx"></u-icon>
      </view>
      <uni-lazy-image width="160rpx" :src="item" height="160rpx"></uni-lazy-image>
    </view>
    <view class="addFile" @click="addFile" v-if="value.length < max && !disabled">
      <u-icon name="camera" :color="theme.text_color_inverse" size="58"></u-icon>
    </view>
  </view>
</template>

<script>
  import { isString, isEmpty, isArray } from '@/utils/validate';
  import { previewImage, uploadImage } from '@/utils/file';

  export default {
    name: 'uni-upload',
    data() {
      return {
        theme: this.$theme,
      };
    },
    props: {
      /**初始数据回显**/
      value: {
        type: Array,
        default: () => [],
      },
      /**最大上传数**/
      max: {
        type: Number,
        default: 3,
      },
      /**业务id**/
      btype: {
        type: String,
      },
      /**是否禁用**/
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      /**预览**/
      previewImage(index) {
        previewImage(this.value, index);
      },
      /**上传**/
      addFile() {
        uploadImage(this.value, this.max, this.btype).then((res) => {
          this.$emit('input', [...this.value, ...res]);
        });
      },
      deleteFile(index) {
        let res = [...this.value];
        res.splice(index, 1);
        this.$emit('input', res);
      },
    },
  };
</script>

<style scoped lang="scss">
  .upload {
    display: flex;
    flex-wrap: wrap;
    margin: -10rpx;

    .image {
      width: 160rpx;
      height: 160rpx;
      margin: 10rpx;
      position: relative;

      .close {
        position: absolute;
        right: 10rpx;
        top: 10rpx;
        z-index: 10;
      }
    }

    .addFile {
      width: 160rpx;
      height: 160rpx;
      background: $bg-color-grey;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10rpx;
    }
  }
</style>
