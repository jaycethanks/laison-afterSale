import FormPreviewer from '@/packages/FormPreviewer';
import FlowPreviewer from '@/packages/FlowPreviewer/index.vue';
import FlowFormDesigner from '@/packages/FlowFormDesigner/index.vue';
import FlowDesigner from '@/packages/FlowDesigner';
import FormDesigner from '@/packages/FormDesigner';

const components = [FormPreviewer, FlowPreviewer, FlowFormDesigner, FlowDesigner, FormDesigner];
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export { install, FormPreviewer, FlowPreviewer, FlowFormDesigner, FlowDesigner, FormDesigner };
