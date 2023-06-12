/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue';
import {
  ConfigProvider,
  Layout,
  Input,
  Rate,
  Slider,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Empty,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Steps,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  message,
  Upload,
  Tooltip,
  FormModel,
  Collapse,
  Cascader,
  TreeSelect,
} from 'ant-design-vue';
import vcolorpicker from 'vcolorpicker';

import KBatch from '../KBatch';
import KSelectInputList from '../KSelectInputList';
import KEditor from '../KEditor';
import UploadFile from '../UploadFile';
import UploadImg from '../UploadImg';
import KDatePicker from '../KDatePicker';
import KTimePicker from '../KTimePicker';
// import LaisonInputCustomerSelect from '@/components/laison/LaisonInputCustomerSelect'
// import LaisonInputMeterSelect from '@/components/laison/LaisonInputMeterSelect'
// import LaisonInputUserSelect from '@/components/laison/LaisonInputUserSelect'
// import LaisonInputDeptSelect from '@/components/laison/LaisonInputDeptSelect'
// import LaisonInputRoleSelect from '@/components/laison/LaisonInputRoleSelect'
// import LaisonMultiImgUploadModel from '@/components/laison/LaisonMultiImgUploadModel'
// import LaisonLoginUser from '@/components/laison/LaisonLoginUser'
// import LaisonGmapMeterSelector from '@/components/laison/LaisonGmapMeterSelector'
// import LaisonErpConfig from '@/components/laison/LaisonErpConfig'
// import LaisonErpMeterNumberRecord from '@/components/laison/LaisonErpMeterNumberRecord'
// import LaisonErpProductionOptions from '@/components/laison/LaisonErpProductionOptions'
export default {
  input: Input,
  number: InputNumber,
  select: Select,
  checkbox: Checkbox,
  radio: Radio,
  date: KDatePicker,
  time: KTimePicker,
  rate: Rate,
  slider: Slider,
  switch: Switch,
  uploadFile: UploadFile,
  uploadImg: UploadImg,
  treeSelect: TreeSelect,
  cascader: Cascader,
  batch: KBatch,
  selectInputList: KSelectInputList,
  editor: KEditor,
  // CustomerSelect: LaisonInputCustomerSelect,
  // MeterSelect: LaisonInputMeterSelect,
  // UserSelect: LaisonInputUserSelect,
  // RoleSelect: LaisonInputRoleSelect,
  // LaisonInputDeptSelect,
  // LaisonLoginUser,
  // LaisonMultiImgUploadModel,
  // LaisonGmapMeterSelector,
  // LaisonErpConfig,
  // LaisonErpMeterNumberRecord,
  // LaisonErpProductionOptions,
};

Vue.use(ConfigProvider);
Vue.use(Tooltip);
Vue.use(Empty);
Vue.use(FormModel);
Vue.use(Collapse);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Rate);
Vue.use(Slider);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Card);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Steps);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(vcolorpicker);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
