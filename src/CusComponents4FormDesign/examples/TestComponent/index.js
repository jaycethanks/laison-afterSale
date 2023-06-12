import TestComponent from './TestComponent.vue';

export default {
  type: 'TestComponent', // 表单类型
  label: 'TestComponent', // 标题文字
  icon: 'icon-write',
  component: TestComponent,

  options: {
    // type: 'text',
    testField: false,
    help: '',
    width: '100%', // 宽度
    hidden: false, // 是否隐藏，false显示，true隐藏
    disabled: false, // 是否禁用，false不禁用，true禁用
  },
  // model: '', // 数据字段
  // key: '',
  // rules: [
  //   //验证规则
  //   {
  //     required: false, // 必须填写
  //     message: 'common.please_input',
  //   },
  // ],
};
