<template>
  <a-modal cancelText="取消" okText="确定" v-model="visible" :title="title" @ok="handleOk" @cancel="handleCancle">
    isEdit?: {{ isEdit }}
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item ref="name" label="租户名称" prop="name">
        <a-input
          v-model="form.name"
          @blur="
            () => {
              $refs.name.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="bizTenantId" label="业务系统租户ID" prop="bizTenantId">
        <a-input
          v-model="form.bizTenantId"
          @blur="
            () => {
              $refs.bizTenantId.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="时区" required prop="timezone">
        <a-select v-model="form.timezone" placeholder="please select your zone" :options="timeZoneOpts">
          <a-select-option value="shanghai"> Zone one </a-select-option>
          <a-select-option value="beijing"> Zone two </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="baseUrl" label="业务系统baseUrl" prop="baseUrl">
        <a-input
          v-model="form.baseUrl"
          placeholder="ip+port"
          @blur="
            () => {
              $refs.baseUrl.onFieldBlur();
            }
          "
        />
      </a-form-model-item>

      <a-form-model-item ref="remark" label="备注" prop="remark">
        <a-input
          v-model="form.remark"
          @blur="
            () => {
              $refs.remark.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '新增',
    },
  },
  data() {
    return {
      visible: false,
      isEdit: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      other: '',
      form: {
        // name: '',
        // tenantId: undefined,
        // timezone: undefined,
        // baseUrl: undefined,
        // remark: undefined,
      },
      timeZoneOpts: [
        {
          value: 'UTC+12',
          label: 'UTC+12',
        },
        {
          value: 'UTC+11',
          label: 'UTC+11',
        },
        {
          value: 'UTC+10',
          label: 'UTC+10',
        },
        {
          value: 'UTC+9',
          label: 'UTC+9',
        },
        {
          value: 'UTC+8',
          label: 'UTC+8',
        },
        {
          value: 'UTC+7',
          label: 'UTC+7',
        },
        {
          value: 'UTC+6',
          label: 'UTC+6',
        },
        {
          value: 'UTC+5',
          label: 'UTC+5',
        },
        {
          value: 'UTC+4',
          label: 'UTC+4',
        },
        {
          value: 'UTC+3',
          label: 'UTC+3',
        },
        {
          value: 'UTC+2',
          label: 'UTC+2',
        },
        {
          value: 'UTC+1',
          label: 'UTC+1',
        },
        {
          value: 'UTC+0',
          label: 'UTC+0',
        },
        {
          value: 'UTC-1',
          label: 'UTC-1',
        },
        {
          value: 'UTC-2',
          label: 'UTC-2',
        },
        {
          value: 'UTC-3',
          label: 'UTC-3',
        },
        {
          value: 'UTC-4',
          label: 'UTC-4',
        },
        {
          value: 'UTC-5',
          label: 'UTC-5',
        },
        {
          value: 'UTC-6',
          label: 'UTC-6',
        },
        {
          value: 'UTC-7',
          label: 'UTC-7',
        },
        {
          value: 'UTC-8',
          label: 'UTC-8',
        },
        {
          value: 'UTC-9',
          label: 'UTC-9',
        },
        {
          value: 'UTC-10',
          label: 'UTC-10',
        },
        {
          value: 'UTC-11',
          label: 'UTC-11',
        },
      ],
      rules: {
        name: [{ required: true, message: '平台名称不可为空', trigger: 'blur' }],
        tenantId: [{ required: true, message: '租户id不可为空', trigger: 'change' }],
        timezone: [{ required: true, message: '时区不可为空', trigger: 'change' }],
        baseUrl: [{ required: true, message: 'baseUrl不可为空', trigger: 'change' }],
      },
    };
  },

  methods: {
    initForm(form) {
      if (form) {
        this.isEdit = true;

        // 先置空,这样会将id也set到form，id是update 必传字段
        this.$set(this, 'form', {});
        this.$set(this, 'form', Object.assign({}, form));
      } else {
        this.$set(this, 'form', {});
      }
    },
    show(form = null) {
      this.initForm(form);
      this.visible = true;
    },
    hide() {
      this.visible = false;
      this.resetForm();
    },
    handleOk(e) {
      const valid = this.validateForm();
      valid && this.$emit('ok', this.form, this.isEdit);
    },
    handleCancle() {
      this.resetForm();
      this.$emit('cancel');
    },
    validateForm() {
      let _valid = false;
      this.$refs.ruleForm.validate((valid) => {
        _valid = valid;
      });
      return _valid;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
