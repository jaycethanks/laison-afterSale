<template>
  <div class="k-form-design-wrapper">
    <k-form-design
      :propModalHeight="propModalHeight"
      :showHead="false"
      ref="kfd"
      :toolbars="['preview', 'exportJson', 'exportCode', 'reset', 'undo', 'redo']"
      @save="handleSave"
    />
    <!-- <DesignLabelForm @okForm="onFormSave" ref="modalForm"></DesignLabelForm> -->
  </div>
</template>

<script>
// import DesignLabelForm from '@/components/designform/DesignLabelForm'
import { KFormDesign } from '@/lib/kform/index.js';
// import LaisonInputMeterSelect from '@/components/laison/LaisonInputMeterSelect'
import API from '@/api/ActZForm';
export default {
  name: 'FormDesigner',
  components: {
    // DesignLabelForm,
    KFormDesign,
    // LaisonInputMeterSelect,
  },
  props: ['height'],
  data() {
    return {
      index: 1,
      // 表头
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
      showLabelForm: false,
      jsonData: {
        list: [
          {
            type: 'textarea',
            label: '文本框',
            icon: 'icon-edit',
            options: {
              width: '100%',
              minRows: 4,
              maxRows: 6,
              defaultValue: '',
              disabled: false,
              placeholder: '请输入',
            },
            model: 'textarea_1584772782841',
            key: 'textarea_1584772782841',
            rules: [
              {
                required: false,
                message: this.$t('common.please_input'),
              },
            ],
          },
        ],
        config: {
          layout: 'horizontal',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 18,
          },
          hideRequiredMark: false,
          customStyle: '',
        },
      },
    };
  },
  computed: {
    propModalHeight() {
      return this.height;
    },
  },
  methods: {
    handleSave(jsonForm) {
      console.log(jsonForm, '--line95');
      let objectForm = JSON.parse(jsonForm);
      if (!objectForm || !objectForm.list || objectForm.list.length < 1) {
        this.$message.error(this.$t('order.pleaseDesignFrom'));
        return;
      }
      this.$refs.modalForm.formInfo.jsonForm = jsonForm;
      this.$refs.modalForm.title = this.$t('common.edit');
      this.$refs.modalForm.visible = true;
    },
    onFormSave(formInfo) {
      //清空数据
      window.hjxcx = this.$refs.kfd;
      this.$refs.kfd.clearData();
      this.$emit('operatOK', formInfo);
    },
    resetData() {},
    importData(item) {
      this.$refs.modalForm.formInfo = item;
      this.$refs.kfd.handleSetData(JSON.parse(item.jsonForm));
    },
    // fetchFormData() {
    //   return JSON.stringify(this.$refs.kfd.$data.data)
    // },
    updateLocalStorage() {
      /**
       * 定时保存当前表单设计，为了避免其他地方复用kform 的时候，影响到这里的逻辑， 所以不在kform 内部去封装
       * 逻辑， 没有办法在
       */
    },
  },
  mounted() {},
};
</script>
<style scoped lang="css">
.k-form-design-wrapper {
  height: 100%;
  width: 100%;
}
</style>
