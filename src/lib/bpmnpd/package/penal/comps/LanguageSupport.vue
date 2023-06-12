<template>
  <!-- // ToDo: 这个组件逻辑写的很繁琐， 有空优化下， 看能不能做成双向绑定 -->
  <a-form :form="form" ref="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
    <a-form-item :label="getLanguages(lang).name" v-for="lang in supportedLanguages" :key="lang">
      <a-input
        size="small"
        @change="(e) => handleChange(lang, e)"
        v-decorator="[lang, { rules: [{ required: true, message: '必填写字段' }] }]"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    customProp: {
      type: Object,
    },
    elementId: {
      type: String,
    },
    businessObject: Object,
  },
  model:{
    prop:"customProp",
    event:"customEvent"
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      languageList: [
        // https://emojipedia.org/flags/
        //@jayce 23/05/11-14:43:17 : 注意，如果要新增支持的语言，也需要去支持时间选择器: src/lib/kform/KDatePicker/datePicker.vue
        {
          name: '中文',
          value: 'zh',
          disabled: true,
        },
        {
          name: '英文',
          value: 'en',
        },
        {
          name: '法语',
          value: 'fr',
        },
        {
          name: '阿拉伯语',
          value: 'ar',
        },
        {
          name: '葡萄牙语',
          value: 'pt',
        },
      ],
    };
  },
  computed: mapState({
    supportedLanguages: (state) => state.kform.data.config.supportedLanguages,
  }),
  watch: {
    customProp: {
      handler: function () {
        this.$nextTick(()=>{
          this.form.setFieldsValue(this.customProp);
        })
        // this.setModalElement(this.customProp['zh']);
      },
      deep:true,
      immediate:true
    },
  },

  mounted(){
    window.ffff = this.form
  },


  methods: {
    getLanguages(lang) {
      return this.languageList.find((it) => it.value === lang);
    },
    handleChange(lang, { target: { value } }) {
      this.form.setFieldsValue({ [lang]: value });
      const fields = this.form.getFieldsValue()
      this.$emit('customEvent', fields);
      // if (lang === 'zh') {
      //   this.setModalElement(value);
      // }
    },
    getValue() {
      let result = null;
      this.form.validateFields((err, values) => {
        result = values;
      });
      return result;
    },
    validateForm() {
      let valid = true;
      this.form.validateFields((err) => {
        if (err !== null) {
          valid = false;
        }
      });
      return valid;
    },
    setModalElement(nameValue) {
      const bpmnElement = window?.bpmnInstances?.bpmnElement;
      const attrObj = Object.create(null);
      attrObj['name'] = nameValue;
      window.bpmnInstances.modeling.updateProperties(bpmnElement, attrObj);
    },
  },
};
</script>
