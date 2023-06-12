//prettier-ignore
<template>
  <a-config-provider>
    <a-form
      v-if="value.list && value.config"
      class="k-form-build-9136076486841527"
      :layout="value.config.layout"
      :hideRequiredMark="value.config.hideRequiredMark"
      :form="form"
      @submit="handleSubmit"
      :style="value.config.customStyle"
    >
      <!-- v-for="(record, index) in cvalue.list" -->

      <buildBlocks
        ref="buildBlocks"
        @handleReset="reset"
        v-for="(record, index) in value.list"
        :record="record"
        :dynamicData="getDynamicData"
        :config="config"
        :disabled="disabled"
        :stockRecord="stockRecord"
        :rootCompent="rootCompent"
        :formConfig="value.config"
        :validatorError="validatorError"
        :showType="showType"
        :key="index"
        :sunOfProps="sunOfProps"
        @change="handleChange"
      />
    </a-form>
  </a-config-provider>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 将json数据构建成表单
 */
import buildBlocks from './buildBlocks';
import { expressionAnalyser } from '@/lib/kform/KExpressions/expressionsHandleFns.js';
export default {
  name: 'KFormBuild',
  data() {
    return {
      form: this.$form.createForm(this),
      validatorError: {},
      defaultDynamicData: {},
      tempModel: null,
    };
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    showType: {
      type: Number,
      default: 0,
    },
    dynamicData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sunOfProps: {
      //是否是LaisonOrderPropShow的子组件
      type: Boolean,
      default: false,
    },
    stockRecord: {
      //sunOfProps =ture  的时候  stockList里的每一项stock
      type: Object,
      default: () => {
        return null;
      },
    },
    rootCompent: {
      //根组件 可以从根组件获取完整的数据结构
      type: Object,
      default: () => {
        return null;
      },
    },
    outputString: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    buildBlocks,
  },

  computed: {
    getDynamicData() {
      return typeof this.dynamicData === 'object' && Object.keys(this.dynamicData).length
        ? this.dynamicData
        : window.$kfb_dynamicData || {};
    },
    // ---------------------------------------------------CUS START --------------------------------
  },

  methods: {
    // moment,
    handleSubmit(e) {
      // 提交按钮触发，并触发submit函数，返回getData函数
      e.preventDefault();
      this.$emit('submit', this.getData);
    },
    reset() {
      // 重置表单
      this.form.resetFields();
    },
    getData() {
      // 提交函数，提供父级组件调用
      return new Promise((resolve, reject) => {
        try {
          this.form.validateFields(async (err, values) => {
            if (err) {
              reject(err);
              /**
               * @author: lizhichao<meteoroc@outlook.com>
               * @Description: 多容器校验时，提供error返回给多容器进行判断。
               */
              this.validatorError = err;
              return;
            }
            this.validatorError = {};
            // this.$refs.buildBlocks.forEach(async (item) => {
            // 这个地方仅设计了 KBatch 组件类型的验证
            // if (!item.validationSubform()) {
            //   reject(err)
            // }

            //@jayce 22/08/18-14:10:13 : 增强验证， 子组件为表单的情况下，支持验证
            const validates = this.$refs.buildBlocks.map((item) => {
              if (!item.validationSubform()) {
                reject(err);
              }
              return item.validateKFormItem();
            });
            await Promise.all(validates);
            window.xxxx = this.$refs.buildBlocks[0].$refs.nestedComponents
            console.log('[values]: ',values)
            if (this.outputString) {
              // 需要所有value转成字符串
              for (const key in values) {
                const type = typeof values[key];
                if (type === 'string' || type === 'undefined') {
                  continue;
                } else if (type === 'object') {
                  values[key] = `k-form-design#${type}#${JSON.stringify(values[key])}`;
                } else {
                  values[key] = `k-form-design#${type}#${String(values[key])}`;
                }
              }
              resolve(values);
            } else {
              resolve(values);
            }
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    setData(json) {
      return new Promise((resolve, reject) => {
        try {
          if (this.outputString) {
            // 将非string数据还原
            for (const key in json) {
              if (!json[key].startsWith('k-form-design#')) {
                continue;
              }
              const array = json[key].split('#');
              if (array[1] === 'object') {
                json[key] = JSON.parse(array[2]);
              } else if (array[1] === 'number') {
                json[key] = Number(array[2]);
              } else if (array[1] === 'boolean') {
                json[key] = Boolean(array[2]);
              }
            }
            this.form.setFieldsValue(json);
          } else {
            this.form.setFieldsValue(json);
          }
          resolve(true);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },

    // 批量设置某个option的值
    setOptions(fields, optionName, value) {
      fields = new Set(fields);

      // 递归遍历控件树
      const traverse = (array) => {
        array.forEach((element) => {
          if (fields.has(element.model)) {
            this.$set(element.options, optionName, value);
          }
          if (element.type === 'grid' || element.type === 'tabs') {
            // 栅格布局 and 标签页
            element.columns.forEach((item) => {
              traverse(item.list);
            });
          } else if (element.type === 'card' || element.type === 'batch') {
            // 卡片布局 and  动态表格
            traverse(element.list);
          } else if (element.type === 'table') {
            // 表格布局
            element.trs.forEach((item) => {
              item.tds.forEach((val) => {
                traverse(val.list);
              });
            });
          }
        });
      };
      traverse(this.value.list);
    },

    // 隐藏表单字段
    hide(fields) {
      this.setOptions(fields, 'hidden', true);
    },
    // 显示表单字段
    show(fields) {
      if (fields) {
        this.setOptions(fields, 'hidden', false);
      }
    },
    // 禁用表单字段
    disable(fields) {
      this.setOptions(fields, 'disabled', true);
    },
    // 启用表单字段
    enable(fields) {
      this.setOptions(fields, 'disabled', false);
    },
    // @jayce rewrite below
    // handleChange(value, key) {
    //   // 触发change事件
    //   this.$emit("change", value, key);
    // }

    // ----------------------------------------------------CUS START --------------------------------
    triggerHiddenDisabledInjectScript() {
      this.walkNodes((element) => {
        // 表单全部字段key:value键值对象
        const models = this.form.getFieldsValue();
        const model = element.model;
        if (element.options.hiddenJs) {
          // 如果当前控件中有hiddenJs脚本,但是该脚本的执行和当前字段是不相关的,则判断为这个脚本是无效脚本
          // if (!element.options.hiddenJs.includes(model)) return;
          let _hiddenJs = new Function('return ' + element.options.hiddenJs)();
          try {
            this.$set(element.options, 'hidden', _hiddenJs(models, this, window.rootKForm || null));
          } catch (e) {
            console.error(`[控件:${model}] 在执行hiddenJs 的时候遇到了错误:\n ${e}`);
          }
        }
        if (element.options.disabledJs) {
          let _disabledJs = new Function('return ' + element.options.disabledJs)();
          try {
            this.$set(element.options, 'disabled', _disabledJs(models, this, window.rootKForm || null));
          } catch (e) {
            console.error(`[控件:${model}] 在执行 disabledJs 的时候遇到了错误:\n ${e}`);
          }
        }
      });
    },
    triggerInitInjectScript() {
      this.walkNodes((element) => {
        // 表单全部字段key:value键值对象
        const models = this.form.getFieldsValue();
        const model = element.model;
        if (element.options.initJs) {
          // 如果当前控件中有hiddenJs脚本,但是该脚本的执行和当前字段是不相关的,则判断为这个脚本是无效脚本
          // if (!element.options.hiddenJs.includes(model)) return;
          let _initJs = new Function('return ' + element.options.initJs)();
          try {
            _initJs(models, this, window.rootKForm || null);
          } catch (e) {
            console.error(`[控件:${model}] 在执行hiddenJs 的时候遇到了错误:\n ${e}`);
          }
        }
      });
    },
    walkNodes(callback) {
      // 递归遍历控件树
      const traverse = (array) => {
        array.forEach((element) => {
          callback(element);
          // this.$set(element.options, optionName, value);

          if (element.type === 'grid' || element.type === 'tabs') {
            // 栅格布局 and 标签页
            element.columns.forEach((item) => {
              traverse(item.list);
            });
          } else if (element.type === 'card' || element.type === 'batch') {
            // 卡片布局 and  动态表格
            traverse(element.list);
          } else if (element.type === 'table') {
            // 表格布局
            element.trs.forEach((item) => {
              item.tds.forEach((val) => {
                traverse(val.list);
              });
            });
          }
        });
      };
      traverse(this.value.list);
    },

    handleChange(value, key) {
      // 触发change事件时，去执行fixItem
      this.$emit('change', value, key);
      this.handleExpression();
      this.triggerHiddenDisabledInjectScript();
    },
    // doInitJs(that, item, model) {
    //   // console.log(item.model, this.disabled, '--line467')

    //   if (item.options.initJs) {
    //     let funh = new Function('return ' + item.options.initJs)();
    //     try {
    //       /**
    //        * window.rootKForm 是在src/components/laison/LaisonCustomeFormShow2.vue中
    //        * 注册的根表单实例
    //        */

    //       funh(that, item, model, window.rootKForm || undefined);
    //     } catch (e) {
    //       console.error(e, '--line452', item);
    //     }
    //   }
    // },
    handleExpression() {
      /**
       * 要动态计算一个表达式,
       * 1. 首先,要找到目标字段
       * 2. 获取参数字段值
       * 3. 将参数字段值赋值给目标字段
       *
       */
      const fieldsObj = this.form.getFieldsValue();

      //bugfix setField 之前必须要getFieldDecorator,否则会报错
      Object.keys(fieldsObj).forEach((key) => {
        this.form.getFieldDecorator(key, { initialValue: fieldsObj[key] });
      });

      const { expressions } = this.value.config;
      if (!expressions) return;
      try {
        const toSetFieldVals = expressionAnalyser(fieldsObj, expressions);
        toSetFieldVals.forEach((fieldVal) => {
          this.form.setFieldsValue(fieldVal);
        });
      } catch (err) {
        this.$message.error({ content: '表达式解析错误', duration: 1 });
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.setData(this.defaultValue);
    });
    this.triggerHiddenDisabledInjectScript();
    this.triggerInitInjectScript();
    this.$emit('mount', this);
  },
};
</script>

<style scoped lang="scss">
@import "@/lib/kform/styles/form-item-disable-style.scss";
</style>
