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
        <view v-for="(item, index) in config.form" :key="index">
          <!--border start-->
          <slot v-if="item.type === 'border'" :name="item.slotName">
            <view class="border"></view>
          </slot>
          <!--border end-->
          <u-form-item
            :label="item.label"
            :prop="item.key"
            :borderBottom="mergeProperty(item, 'borderBottom')"
            ref="item1"
            :labelPosition="item.labelPosition"
            :required="item.required"
            v-else
          >
            <!--input start-->
            <u-input
              v-if="
                item.type === 'input' &&
                config.mode === 'editor' &&
                !mergeProperty(item, 'disabled')
              "
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
            <view
              v-if="
                item.type === 'input' &&
                (config.mode === 'readOnly' || mergeProperty(item, 'disabled'))
              "
            >
              <slot :name="`prefix_${item.key}`"></slot>
              <view class="input" :style="{ textAlign: mergeProperty(item, 'inputAlign') }">
                {{ formData[item.key] }}
              </view>
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
              :border="mergeProperty(item, 'border')"
              :style="{ background: 'red' }"
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
              :disabled="config.mode === 'readOnly' || item.disable"
              style="justify-content: flex-end"
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
              :style="{
                marginTop:
                  item.labelPosition === 'top' && !formConfig.labelStyle.marginBottom
                    ? '20rpx'
                    : '',
              }"
            ></uni-upload>
            <!--附件上传 end-->

            <!-- select start-->
            <template v-if="item.type === 'select'">
              <view
                @click="showModal(`${item.key}Modal`)"
                class="input"
                :style="{
                  textAlign: mergeProperty(item, 'inputAlign'),
                  color: formData[item.keyName] ? theme.text_color : theme.text_color_placeholder,
                }"
              >
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
                  :queryUrl="item.queryUrl"
                  :postUrl="item.postUrl"
                  :type="mergeProperty(item, 'selectType')"
                ></uni-bottom-popup>
              </view>
              <u-icon slot="right" name="arrow-right" v-if="config.mode === 'editor'"></u-icon>
            </template>
            <!--select end-->

            <!--datetime start-->
            <template v-if="item.type === 'datetime'">
              <view
                @click="showDatetime(item.key)"
                :style="{
                  textAlign: mergeProperty(item, 'inputAlign'),
                  color: formData[item.key] ? theme.text_color : theme.text_color_placeholder,
                }"
              >
                {{
                  formData[item.key] ||
                  (config.mode === "editor" ? mergeProperty(item, "placeholder") : "")
                }}
                <u-datetime-picker
                  @click.native.stop
                  :show="showConfig[item.key]"
                  :mode="mergeProperty(item, 'mode')"
                  @confirm="confirmDatetime($event, item)"
                  @cancel="closeDatetime(item.key)"
                  @close="closeDatetime(item.key)"
                  :minDate="mergeProperty(item, 'minDate')"
                  :loading="true"
                  :confirmColor="theme.color_primary"
                  :closeOnClickOverlay="true"
                ></u-datetime-picker>
              </view>
              <u-icon slot="right" name="arrow-right" v-if="config.mode === 'editor'"></u-icon>
            </template>
            <!--datetime end-->

            <!-- 插槽 start-->
            <template v-if="item.type === 'slot'">
              <view>
                <slot :name="item.slotName"></slot>
              </view>
              <u-icon slot="right" name="arrow-right" v-if="config.mode === 'editor'"></u-icon>
            </template>
            <!--插槽 end-->

            <!-- 右侧插槽-->
            <template #right>
              <slot :name="item.key"></slot>
            </template>
          </u-form-item>
        </view>
      </u-form>
    </template>
  </view>
</template>

<script>
  import default_config from "./config";
  import { isArray } from "@/utils/validate";

  export default {
    name: "uni-form",
    components: {},
    data() {
      return {
        /**最后需要的数据**/
        formData: {},
        /**合并一些配置**/
        config: {},
        /**主题引入**/
        theme: this.$theme,
        /**维护一些需要弹出层显示隐藏的变量**/
        showConfig: {},
      };
    },
    onReady() {
      this.setRules();
    },
    watch: {
      formConfig: {
        handler(newVal) {
          console.log(newVal);
          let { form } = newVal;
          let formData = {};
          let showConfig = {};
          for (let i = 0; i < form.length; i++) {
            /**没有key值就跳出当次循环**/
            if (!("key" in form[i])) continue;
            /**判断是否为datetime需要维护一个控制显隐的变量**/
            if (form[i].type === "datetime") {
              showConfig[form[i].key] = false;
            }
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
          this.config = Object.assign(this.$_.cloneDeep(default_config), newVal);
          this.showConfig = showConfig;
        },
        immediate: true,
        deep: true,
      },
      defaultFormData: {
        handler(newVal) {
          this.formData = Object.assign(
            this.$_.cloneDeep(this.formData),
            this.$_.cloneDeep(newVal),
          );
        },
        deep: true,
        immediate: true,
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
      /** 设置校验规则,参数传递正则对象会出问题,传递为正则的source,这里统一处理 **/
      setRules() {
        if (this.formConfig.rules) {
          let rules = this.$_.cloneDeep(this.formConfig.rules);
          for (let key in rules) {
            if (isArray(rules[key])) {
              rules[key].forEach((item) => {
                if (item.pattern) {
                  item.pattern = new RegExp(item.pattern);
                }
              });
            } else {
              if (rules[key].pattern) {
                rules[key].pattern = new RegExp(rules[key].pattern);
              }
            }
          }
          this.$refs.form.setRules(rules);
        }
      },
      /**重置表单**/
      resetFields() {
        console.log(this.$refs.form.resetFields);
        this.$refs.form.resetFields();
      },
      /**触发校验**/
      validate() {
        return new Promise((resolve, reject) => {
          if (this.formConfig.rules) {
            this.$refs.form.validate().then((res) => {
              if (res) {
                resolve(this.formData);
              } else {
                reject();
              }
            });
          } else {
            resolve(this.formData);
          }
        });
      },
      /**
       * 合并通用配置和独有的配置
       * 如果没有默认值会读取config.js中的配置
       * 这里是处理每一个form的属性的取值顺序为页面传递=>config.js文件中对应类型的配置=>然后取config.js最外层的配置
       * **/
      mergeProperty(item, key) {
        return item[key] ?? this.config[item.type]?.[key] ?? this.config[key];
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
        let nameArr = e.map((child) => {
          return child[item.labelName ?? "name"];
        });
        this.formData[item.keyName] = nameArr.join(",");
        /**是否需要特殊处理传递事件出去**/
        if (item.event) {
          this.$emit(item.event, item);
        }
      },
      /**
       * 时间选择器点击确定**/
      confirmDatetime({ value }, item) {
        let time;
        switch (item.mode) {
          case "date":
            time = this.$dateFormat(value, "YYYY-MM-DD");
            break;
          case "time":
            time = value;
            break;
          case "year-month":
            time = this.$dateFormat(value, "YYYY-MM");
            break;
          default:
            time = this.$dateFormat(value, "YYYY-MM-DD HH:mm");
        }
        this.formData[item.key] = time;
        this.showConfig[item.key] = false;
      },
      /**时间选择器显示**/
      showDatetime(key) {
        if (this.config.mode === "readOnly") return;
        this.showConfig[key] = true;
      },
      /**时间选择器关闭**/
      closeDatetime(key) {
        this.showConfig[key] = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .input {
    min-height: 1.4em;
    line-height: 1.4em;
    vertical-align: center;
  }
  .border {
    height: 20rpx;
    background: $bg_color_grey;
    margin: 0 -32rpx;
  }
</style>
