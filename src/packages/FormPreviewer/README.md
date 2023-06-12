页面默认情况下, 会响应式的展示表单的宽度, 但如果需要按照一定的规则来让表单特定显示,可以通过 `maxWidth, minWidth` 这两个参数传入, 其值类型为合法的 css 单位.
query:{
maxWidth,
minWidth
}
例如, 如果希望表单始终占满屏幕,可以指定 `minWidth=100%`
