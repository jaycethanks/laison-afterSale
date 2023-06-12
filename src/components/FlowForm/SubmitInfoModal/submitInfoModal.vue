<template>
  <a-modal cancelText="取消" okText="确定" v-model="visible" :title="title" @ok="handleOk" @cancel="handleCancle">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item ref="comment" prop="comment">
        <span slot="label" class="label-slot">评论或备注</span>
        <a-textarea allowClear :autoSize="{ minRows: 6, maxRows: 6 }" v-model="form.comment" />
      </a-form-model-item>
      <section class="recommendations">
        <span>推荐输入:</span>
        <a-button size="small" @click="handleTextClick(text)" v-for="text in recommendations" :key="text">
          {{text}}
        </a-button>
      </section>
      <a-divider style="margin:1em 0" />
      <a-form-model-item ref="comment" prop="comment">
        <span slot="label" class="label-slot">附件</span>

        <ffUploader multiple v-model="form.enclosurePaths" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import ffUploader from "@/components/FlowForm/ffUploader/index.vue"
import TitleRow from "@/components/base/TitleRow/index.vue"
export default {
  props: {
    title: {
      type: String,
      default: '新增',
    },
  },
  components:{
    ffUploader,
    TitleRow
  },
  data() {
    return {
      visible: false,
      isEdit: false,
      recommendations:[
        "已阅",
        "收到",
        "已核对",
        "合格",
        "情况属实",
        "确认",
        "已复核",
        "知悉",
        "辛苦了",
      ],
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      form: {
      },

      rules: {
        comment: [{ required: false,
        validator(rule,value,cb){
          if(value.trim().length > 100){
            cb(new Error(`超出 ${value.trim().length - 100} 字符！`))
          }else{
            cb()
          }
        }, trigger: 'change' }],

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
      this.form.enclosurePaths = "/1388/1372/14E08935-A1BB-4f35-A8BC-42433FA96072.png|/1335/1058/ff@0.3x.png|/1259/1971/README.md"
    },
    show(form = null) {
      this.initForm(form);
      this.visible = true;
    },
    hide() {
      this.visible = false;
      this.resetForm();
    },
    handleFileUploaded(filePaths){
        this.$set(this, 'form', Object.assign(this.form, {enclosurePaths:filePaths}));
    },
    handleTextClick(text){
        this.$set(this.form, 'comment', (this.form.comment || "") + text);
    },
    handleOk(e) {
      const valid = this.validateForm();
      valid && this.$emit('ok', JSON.parse(JSON.stringify(this.form)), this.isEdit);
      this.hide()
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
<style scoped>
.label-slot{
  font-weight: bold;
  font-size: 14px;
}
.label-slot-small{
  font-size: 12px;
  margin: 0;
}
>>> .ant-input{
  border-radius: 0;
}
.recommendations{
  display: inline-flex;
  gap: .4em;
  flex-wrap: wrap;
}
>>> .ant-form-item{
  margin-bottom: 0;
}
</style>
