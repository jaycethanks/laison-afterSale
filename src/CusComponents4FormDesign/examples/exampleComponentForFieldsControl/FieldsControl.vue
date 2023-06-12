<template>
  <a-card>
    <p>这个字段不可控制!</p>
    <a-input placeholder="Basic usage" v-model="modelFields.foo" @change="handleChange" />
    <p>这个字段也不可以控制哦!</p>
    <a-input placeholder="Basic usage" v-model="modelFields.bar" @change="handleChange" />
    <p>这个字段可以控制</p>
    <a-input
      placeholder="Basic usage"
      v-model="modelFields.baz"
      v-if="!exposeFields.baz.hidden"
      :disabled="exposeFields.baz.disabled"
      @change="handleChange"
    />
  </a-card>
</template>
<script>
export default {
  name: 'FieldsControl',
  props: ['value'],
  data() {
    return {
      modelFields: {
        foo: '2',
        bar: '1',
        baz: '3',
      },
      exposeFields: {
        baz: {
          disabled: false,
          hidden: false,
        },
      },
    };
  },
  created() {
    this.$emit('change', this.modelFields); // created 的时候一定要触发一次， 否则组件将无法获取到初始值
    if (this.value) {
      // 如果有回显值，则应该将回显值初始化显示
      this.modelFields = this.value;
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.modelFields); // 每次需要更新值变化的时候， 都需要提交一次 change 事件
    },
  },
};
</script>
<style></style>
