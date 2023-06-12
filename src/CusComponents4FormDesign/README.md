```json
{
label: 'TestComponent', // 标题文字
icon: 'icon-write', // 支持 ant-design-icon 图表集
component: TestComponent,
type: 'TestComponent',// 组件渲染的时候,用于找到自定义组件,该字段名不可重复
// 且你应该避免使用这些已经预定义的组件类型, 否则将不会渲染自定义组件.
['input', 'textarea', 'date', 'time', 'number', 'radio', 'checkbox', 'select', 'rate', 'switch', 'slider', 'uploadImg', 'uploadFile', 'cascader', 'treeSelect']
['batch', 'editor', 'selectInputList']
['button']['alert']['text']['html']['divider']
// 具体的逻辑可以见 src/lib/kform/KFormItem/customComponent.vue
options: {

type:'',// 该type 用于展示控件的属性区域的配置, 有大量的预定义属性输入控件,也可以按需自己增加,由于属性编辑是可被复用的,因此该字段是可以重复的
// 如果你的自定义组件中,有['input', 'textarea', 'date', 'time', 'number', 'radio', 'checkbox', 'select', 'rate', 'switch', 'slider', 'uploadImg', 'uploadFile', 'cascader', 'treeSelect'],['batch', 'editor', 'selectInputList'],['button']['alert']['text']['html']['divider'] 这些字段的属性控制输入, 那么你可以将类型设定为这些值. 但是如果这些值无法满足你的需求时, 你应当自定义type, 并在 src/lib/kform/KFormDesign/module/formItemProperties.vue 中去预定义属性编辑输入控件, 并将值帮定到 options

width: '100%', // 宽度
defaultValue: '', // 默认值
placeholder: 'common.please_input', // 没有输入时，提示文字
clearable: false,
maxLength: null,
addonBefore: '',
addonAfter: '',
hidden: false, // 是否隐藏，false 显示，true 隐藏
disabled: false, // 是否禁用，false 不禁用，true 禁用
},
model: '', // 数据字段
key: '',
help: '',
rules: [
//验证规则
{
required: false, // 必须填写
message: 'common.please_input',
},
],

}
```

在自定义一个组件时， 数据的绑定是通过 v-model 来实现的。

prop: value
event: change/input

也就是说，你需要自己去接收 value 值 完成初始化， 同时在组件的数据发生变化是， 你需要 emit input 或者 change 事件。

如果你自定的组件中，有些字段需要在流程设计中，得到控制， 你需要在 data 中定义一个名为 exposeFields 的属性， 以下是一个示例：

```js
exposeFields: {
  userName: {
    disabled: false,
    hidden: false,
  },
  price: {
    disabled: false,
    hidden: false,
  },
},
```
