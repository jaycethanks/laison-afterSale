import MyProcessDesigner from './designer';
import MyProcessPenal from './penal';
import '@/lib/bpmnpd/package/theme/element-variables.scss';
import '@/lib/bpmnpd/package/theme/index.scss';
// 引入bpmn插件
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
// const components = [MyProcessDesigner, MyProcessPenal];

// const install = function(Vue) {
//   components.forEach(component => {
//     Vue.component(component.name, component);
//   });
// };

// if (typeof window !== "undefined" && window.Vue) {
//   install(window.Vue);
// }

// export default {
//   version: "0.0.1",
//   install,
//   ...components
// };

export { MyProcessDesigner, MyProcessPenal };
