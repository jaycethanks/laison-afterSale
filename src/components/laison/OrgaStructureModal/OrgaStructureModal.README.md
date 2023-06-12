## Attributes

---

| 参数                | 说明                                          | 类型    | 可选值                     | 默认值                              |
| :------------------ | --------------------------------------------- | ------- | -------------------------- | ----------------------------------- |
| v-model             | 控制 model 的显示                             | boolean |                            | false                               |
| elementSize         | 组件内，可控元素的大小设定                    | string  | medium / small / mini      | mini                                |
| width               | modal 框容器的百分比宽度                      | number  |                            | 50                                  |
| serachPlaceHolder   | 搜索框的 placeholder 内容                     |         |                            |                                     |
| tagMargin           | tags 中的每个 tag 的间距设定                  | string  |                            | '0 5px 5px 0'                       |
| selectable          | 是否可选，如果设定为 false， 仅会展示预览元素 | boolean |                            | true                                |
| ifShowPersonPhone   | 是否展示联系人手机号码                        | boolean |                            | true                                |
| tagWrapperMinHeight | tags 容器的最小高度                           | number  |                            | 48                                  |
| initType            | 初始化类型页面                                | string  | 'dept' / 'role' / 'person' | 'dept'                              |
| disableDept         | 是否禁用部门选择                              | boolean |                            | false                               |
| disableRole         | 是否禁用角色选择                              | boolean |                            | false                               |
| disablePerson       | 是否禁用人员选择                              | boolean |                            | false                               |
| maxPerson           | 用以限制 Person 类型下的可选择人最大限制      | number  |                            | -                                   |
| deptType            | 配置 部门 数据接口的参数                      |         | "all" "aftersale"          | undefined: 当前登录用户的权限去获取 |

## Events

---

| 事件名称 | 说明         | 回调参数           |
| :------- | ------------ | ------------------ |
| ok       | 选择完成事件 | 返回选中组织的数组 |
