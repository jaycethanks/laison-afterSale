<!--
 * @Descripttion: 
 * @Author: kcz
 * @Date: 2021-05-02 16:04:02
 * @LastEditors: your name
 * @LastEditTime: 2022-11-24 19:00:44
-->
<template>
  <a-form-item
    :label="record.label"
    :label-col="
      formConfig.layout === 'horizontal'
        ? formConfig.labelLayout === 'flex'
          ? { style: `width:${formConfig.labelWidth}px` }
          : formConfig.labelCol
        : {}
    "
    :wrapper-col="
      formConfig.layout === 'horizontal'
        ? formConfig.labelLayout === 'flex'
          ? { style: 'width:auto;flex:1' }
          : formConfig.wrapperCol
        : {}
    "
    :style="formConfig.layout === 'horizontal' && formConfig.labelLayout === 'flex' ? { display: 'flex' } : {}"
  >
    <component
      ref="actualCusComp"
      :record="record"
      :style="`width:${record.options.width}`"
      @change="handleChange"
      @input="handleInput"
      :disabled="disabled"
      :showType="showType"
      :dynamicData="dynamicData"
      :sunOfProps="sunOfProps"
      :stockRecord="stockRecord"
      :rootCompent="rootCompent"
      :conditions="cd"
      :options="record.options"
      :height="typeof record.options.height !== 'undefined' ? record.options.height : ''"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules,
        },
      ]"
      :is="customComponent"
    ></component>
  </a-form-item>
</template>
<script>
export default {
  name: 'customComponent',
  props: ['record', 'formConfig', 'disabled', 'dynamicData', 'sunOfProps', 'stockRecord', 'rootCompent', 'showType'],
  watch: {
    disabled: {
      handler(val, oldVal) {},
      deep: true,
      //确认是否以当前的初始值执行handler的函数。
      immediate: true,
    },
  },
  created() {
    //console.log('传进来的数据是', this.dynamicData)
  },
  computed: {
    customComponent() {
      // 计算需要显示的组件
      const customComponentList = {};
      if (window.$customComponentList) {
        // 将数组映射成json
        window.$customComponentList.forEach((item) => {
          customComponentList[item.type] = item.component;
        });
      }
      window.re = customComponentList[this.record];
      window.cm = customComponentList[this.record.type];
      return customComponentList[this.record.type];
    },
    cd() {
      try {
        if (this.record.options.data) {
          return JSON.parse(this.record.options.data);
        }
      } catch (error) {
        console.error('JSON.parse(this.record.options.data) 发生错误', this.record);
      }
    },
  },
  methods: {
    handleChange(value, key) {
      // console.log('自定义组件捕获change传值', value, this.record.model)
      this.$emit('change', value, this.record.model);
    },
    handleInput(value, key) {
      //console.log('自定义组件捕获input', value, this.record.model)
      this.$emit('input', value, this.record.model);
    },
  },
  mounted() {
    // cuscomponent.children = [];

    //@jayce 23/04/23-16:20:27 : 初始化自定义组件中的 children
    const exposeFields = this.$refs.actualCusComp.$data.exposeFields;
    this.record.exposeFields = [];
    if (exposeFields) {
      for (let field in exposeFields) {
        this.record.exposeFields.push({
          label: field,
          disabled: true,
          hidden: false,
          type: field,
          key: field,
        });
      }
    }

    //@jayce 23/04/27-15:35:49 : 将服务器返回的值，set到组件去渲染
    if (typeof this.record._exposeFields !== 'undefined') {
      this.record._exposeFields.forEach(({ key, hidden, disabled }) => {
        this.$refs.actualCusComp.$data.exposeFields[key].hidden = hidden;
        this.$refs.actualCusComp.$data.exposeFields[key].disabled = disabled;
      });
    }
  },
};
</script>
