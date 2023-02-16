<template>
  <view>
    <template>
      <u-form
        :model="formData"
        :labelAlign="config.labelAlign"
        :labelStyle="config.labelStyle"
        :labelPosition="config.labelPosition"
        :labelWidth="config.labelWidth"
        :borderBottom="config.borderBottom"
        :errorType="config.errorType"
        :rules="config.rules"
        ref="form"
      >
        <u-form-item
          :label="item.label"
          :prop="item.key"
          borderBottom
          ref="item1"
          v-for="(item, index) in config.form"
          :key="index"
          :labelPosition="item.labelPosition"
        >
          <!--input start-->
          <u-input
            v-if="item.type === 'input' && config.mode === 'editor'"
            v-model="formData[item.key]"
            border="none"
            :type="mergeProperty(item, 'inputType')"
            :clearable="mergeProperty(item, 'clearable')"
            :maxlength="mergeProperty(item, 'maxlength')"
            :placeholder="mergeProperty(item, 'placeholder')"
            :inputAlign="mergeProperty(item, 'inputAlign')"
          >
            <template #prefix>
              <slot :name="`prefix_${item.key}`"></slot>
            </template>
            <template #suffix>
              <slot :name="`suffix_${item.key}`"></slot>
            </template>
          </u-input>
          <view v-if="item.type === 'input' && config.mode === 'readOnly'">
            <slot :name="`prefix_${item.key}`"></slot>
            <view>{{ formData[item.key] }}</view>
            <slot :name="`suffix_${item.key}`"></slot>
          </view>
          <!-- input end-->

          <!--textarea start-->
          <u-textarea
            v-if="item.type === 'textarea'"
            v-model="formData[item.key]"
            :disabled="config.mode === 'readOnly'"
            :placeholder="mergeProperty(item, 'placeholder')"
            :height="mergeProperty(item, 'height')"
            :count="mergeProperty(item, 'count')"
          ></u-textarea>
          <!--textarea end -->

          <!--开关选择器 start-->
          <u-switch
            :disabled="config.mode === 'readOnly'"
            v-if="item.type === 'switch'"
            v-model="formData[item.key]"
            :activeColor="theme.color_primary"
          ></u-switch>
          <!--开关选择器 end-->

          <!--评分 start-->
          <u-rate
            v-if="item.type === 'rate'"
            v-model="formData[item.key]"
            :readonly="config.mode === 'readOnly'"
            :activeColor="theme.color_primary"
            :count="mergeProperty(item, 'count')"
            :size="mergeProperty(item, 'size')"
            :allowHalf="mergeProperty(item, 'allowHalf')"
            :touchable="mergeProperty(item, 'touchable')"
            :minCount="mergeProperty(item, 'minCount')"
          ></u-rate>
          <!--评分 end-->

          <!-- slider start-->
          <u-slider
            v-if="item.type === 'slider'"
            v-model="formData[item.key]"
            :activeColor="theme.color_primary"
            :showValue="mergeProperty(item, 'showValue')"
            :disabled="config.mode === 'readOnly'"
            :min="mergeProperty(item, 'min')"
            :max="mergeProperty(item, 'max')"
          ></u-slider>
          <!--  slider end-->

          <!-- number-box start-->
          <u-number-box
            v-if="item.type === 'numberBox'"
            v-model="formData[item.key]"
            :disabled="config.mode === 'readOnly'"
            :min="mergeProperty(item, 'min')"
            :max="mergeProperty(item, 'max')"
            :step="mergeProperty(item, 'step')"
            :disabledInput="mergeProperty(item, 'disabledInput')"
          ></u-number-box>
          <!-- number-box end-->

          <!--checkboxGroup start-->
          <u-checkbox-group
            v-if="item.type === 'checkboxGroup'"
            v-model="formData[item.key]"
            :activeColor="theme.color_primary"
            :placement="mergeProperty(item, 'placement')"
            :disabled="config.mode === 'readOnly'"
          >
            <u-checkbox
              v-for="(childItem, childIndex) in config.init[item.key]"
              :key="childIndex"
              :label="childItem.name"
              :name="childItem.value"
              :customStyle="mergeProperty(item, 'customStyle')"
            ></u-checkbox>
          </u-checkbox-group>
          <!--checkboxGroup end-->

          <!--u-radio-group start-->
          <u-radio-group
            v-if="item.type === 'radioGroup'"
            v-model="formData[item.key]"
            :placement="mergeProperty(item, 'placement')"
            :activeColor="theme.color_primary"
            :disabled="config.mode === 'readOnly'"
          >
            <u-radio
              v-for="(childItem, childIndex) in config.init[item.key]"
              :key="childIndex"
              :label="childItem.name"
              :name="childItem.value"
              :customStyle="mergeProperty(item, 'customStyle')"
            ></u-radio>
          </u-radio-group>
          <!-- u-radio-group end-->

          <!-- 附件上传 start-->
          <uni-upload
            v-if="item.type === 'upload'"
            v-model="formData[item.key]"
            :max="mergeProperty(item, 'max')"
            :btype="mergeProperty(item, 'btype')"
            :disabled="config.mode === 'readOnly'"
          ></uni-upload>
          <!--附件上传 end-->

          <!-- select start-->
          <template v-if="item.type === 'select'">
            <view @click="showModal(`${item.key}Modal`)">
              {{
                formData[item.keyName] ||
                (config.mode === "editor" ? mergeProperty(item, "placeholder") : "")
              }}
              <uni-bottom-popup
                :ref="`${item.key}Modal`"
                v-model="formData[item.key]"
                @change="changeValue($event, item)"
                @click.native.stop
                :initData="config.init[item.key]"
              ></uni-bottom-popup>
            </view>
            <u-icon slot="right" name="arrow-right" v-if="config.mode === 'editor'"></u-icon>
          </template>
          <!--select end-->

          <!-- 右侧插槽-->
          <template #right>
            <slot :name="item.key"></slot>
          </template>
        </u-form-item>
      </u-form>
    </template>
  </view>
</template>

<script>
  import default_config from "./config";

  export default {
    name: "uni-form",
    components: {},

    data() {
      return {
        formData: {},
        config: {},
        theme: this.$theme,
      };
    },
    onReady() {
      this.$refs.form.setRules(this.formConfig.rules);
    },
    watch: {
      formConfig: {
        handler(newVal) {
          let { form } = newVal;
          let formData = {};
          for (let i = 0; i < form.length; i++) {
            /**判断是switch默认设置为false**/
            if (form[i].type === "switch") {
              formData[form[i].key] = false;
              continue;
            }
            /**判断选择的是否有回显值**/
            if (form[i].keyName) {
              formData[form[i].keyName] = "";
            }
            formData[form[i].key] = "";
          }
          this.formData = Object.assign(formData, this.defaultFormData);
          this.config = Object.assign(default_config, newVal);
        },
        immediate: true,
        deep: true,
      },
    },
    props: {
      /**生成表单的配置**/
      formConfig: {
        type: Object,
        required: true,
      },
      /**出入默认的值**/
      defaultFormData: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      /**触发校验**/
      validate() {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate().then((res) => {
            if (res) {
              resolve(this.formData);
            } else {
              reject();
            }
          });
        });
      },
      /**
       * 合并通用配置和独有的配置
       * 如果没有默认值会读取config.js中的配置
       * todo
       * 空值合并符写在dom中编译报错
       * **/
      mergeProperty(item, key) {
        return item[key] ?? this.config[item.type][key];
      },
      /**
       * 底部弹出层显示
       * **/
      showModal(type) {
        if (this.config.mode === "readOnly") return;
        this.$refs[type][0].open();
      },
      /**
       * 用于回显选择器的值
       * 配置中需要传入keyName
       * **/
      changeValue(e, item) {
        this.formData[item.keyName] = e[item.labelName ?? "name"];
      },
    },
  };
</script>

<style lang="scss"></style>
