<template>
  <!-- <a-tabs
    style="width: 480px"
    :tabBarStyle="{ margin: 0 }"
    default-active-key="1"
  > -->
  <!-- <a-tab-pane key="1" tab="节点属性"> -->
  <div class="process-panel__container" :style="{ width: `${this.width}%` }">
    <a-collapse :bordered="false" accordion v-model="activeTab">
      <a-collapse-panel key="base" v-if="isSystem">
        <div slot="header" class="panel-tab__title">
          <a-icon type="info"></a-icon>
          常规
        </div>
        <element-base-info
          :id-edit-disabled="idEditDisabled"
          :business-object="elementBusinessObject"
          :type="elementType"
        />
      </a-collapse-panel>
      <a-collapse-panel v-if="elementType === 'Process' && isSystem" key="message">
        <div slot="header" class="panel-tab__title"><i class="el-icon-s-comment"></i>消息与信号</div>
        <signal-and-massage />
      </a-collapse-panel>
      <a-collapse-panel key="condition" v-if="conditionFormVisible && isSystem" v-show="isSystem">
        <div slot="header" class="panel-tab__title"><i class="el-icon-s-promotion"></i>流转条件</div>
        <flow-condition :business-object="elementBusinessObject" :type="elementType" />
      </a-collapse-panel>
      <!-- <a-collapse-panel v-if="formVisible" key="form">
        <div slot="header" class="panel-tab__title"><i class="el-icon-s-order"></i>表单</div>
        <element-form :id="elementId" :type="elementType" />
      </a-collapse-panel> -->

      <!-- <a-collapse-panel key="task" v-if="elementType.indexOf('Task') !== -1">
        <div slot="header" class="panel-tab__title"><i class="el-icon-s-claim"></i>任务</div>
        <element-task :id="elementId" :type="elementType" />
      </a-collapse-panel> -->

      <!-- <a-collapse-panel
            key="multiInstance"
            v-if="elementType.indexOf('Task') !== -1"
            key="multiInstance"
          >
            <div slot="header" class="panel-tab__title">
              <i class="el-icon-s-help"></i>多实例
            </div>
            <element-multi-instance
              :business-object="elementBusinessObject"
              :type="elementType"
            />
          </a-collapse-panel> -->

      <!--      <a-collapse-panel key="listeners" key="listeners">-->
      <!--        <div slot="header" class="panel-tab__title">-->
      <!--          <i class="el-icon-message-solid"></i>定时器-->
      <!--          &lt;!&ndash; <i class="el-icon-message-solid"></i>执行监听器 &ndash;&gt;-->
      <!--        </div>-->
      <!--        <element-listeners :id="elementId" :type="elementType" />-->
      <!--      </a-collapse-panel>-->

      <a-collapse-panel key="taskListeners" v-if="elementType === 'UserTask' && isSystem">
        <div slot="header" class="panel-tab__title"><a-icon type="bell"></a-icon>任务监听器</div>
        <user-task-listeners :id="elementId" :type="elementType" />
      </a-collapse-panel>

      <a-collapse-panel key="extensions" v-if="isSystem">
        <div slot="header" class="panel-tab__title"><i class="el-icon-circle-plus"></i>扩展属性</div>
        <element-properties :id="elementId" :type="elementType" />
      </a-collapse-panel>
      <!-- <a-collapse-panel key="other" key="other">
            <div slot="header" class="panel-tab__title">
              <i class="el-icon-s-promotion"></i>其他
            </div>
            <element-other-config :id="elementId" />
          </a-collapse-panel> -->

      <a-collapse-panel class="person-incarge-item" key="languages" v-if="elementType === 'UserTask' && isSystem">
        <div slot="header" class="panel-tab__title"><a-icon type="tags"></a-icon>结点多语言</div>
        <LanguageSupport :elementId="elementId" v-model="currentExtendNodeConfig.lang" ref="language-support" />
        <!-- <el-checkbox v-model="currentExtendNodeConfig.taskConfig.applyerLeader" label="申请者领导审批"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.applyer" label="申请者审批"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.createOrderNumber" label="产生订单编号"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.createMeterNumber" label="生成表号"></el-checkbox> -->
      </a-collapse-panel>

      <a-collapse-panel class="person-incarge-item" key="peopleInchage" v-if="elementType === 'UserTask'">
        <div slot="header" class="panel-tab__title"><a-icon type="share-alt"></a-icon>审批配置</div>
        <!-- <el-checkbox v-model="currentExtendNodeConfig.taskConfig.applyerLeader" label="申请者领导审批"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.applyer" label="申请者审批"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.createOrderNumber" label="产生订单编号"></el-checkbox>
        <el-checkbox v-model="currentExtendNodeConfig.taskConfig.createMeterNumber" label="生成表号"></el-checkbox> -->
        <template v-if="isPlatform">
          <TitleRow title="审批类型" size="small" bold> </TitleRow>
          <a-checkbox v-model="currentExtendNodeConfig.taskConfig.autoApproval"> 自动审批 </a-checkbox>
        </template>

        <template v-if="isPlatform">
          <!-- <OrgSelectionModal v-model="currentExtendNodeConfig.taskConfig.members" /> -->
          <NodeApproverConfigModal v-model="currentExtendNodeConfig.taskConfig.approval" />
        </template>

        <template v-if="isSystem">
          <p class="field-label-text"><a-icon type="control"></a-icon>字段控制</p>
          <FormFieldsControl v-model="currentExtendNodeConfig.taskConfig.columnConfigs" />
        </template>
      </a-collapse-panel>

      <a-collapse-panel class="person-incarge-item" key="copyConfig" v-if="elementType === 'UserTask'">
        <div slot="header" class="panel-tab__title"><a-icon type="mail"></a-icon>抄送配置</div>
        <TitleRow title="抄送类型" size="small" bold> </TitleRow>

        <a-radio-group v-model="currentExtendNodeConfig.copyConfig.type">
          <a-radio value="start">节点审批前</a-radio>
          <a-radio value="end">节点审批后</a-radio>
        </a-radio-group>
        <template v-if="isPlatform">
          <!-- <OrgSelectionModal v-model="currentExtendNodeConfig.copyConfig.members" /> -->
          <NodeApproverConfigModal v-model="currentExtendNodeConfig.copyConfig.approval" />
        </template>

        <template v-if="isSystem">
          <p class="field-label-text"><a-icon type="control"></a-icon>字段控制</p>
          <FormFieldsControl v-model="currentExtendNodeConfig.copyConfig.columnConfigs" />
        </template>
      </a-collapse-panel>

      <a-collapse-panel class="person-incarge-item" key="flowCheckConfig" v-if="elementType === 'UserTask'">
        <div slot="header" class="panel-tab__title">
          <a-icon type="eye"></a-icon><span style="margin-right: 20px">查看配置</span>
        </div>
        <div class="common-config">
          <el-row :gutter="20">
            <el-col :span="8"
              ><div class="grid-content bg-purple" style="margin-left: 8px">
                <!-- <p class="field-label-text"><i class="el-icon-time"></i>显示最新</p> -->
                <el-checkbox-group
                  v-model="
                    currentExtendNodeConfig.viewConfig.commonConfig.newest
                  "
                >
                  <el-checkbox label="显示最新"></el-checkbox>
                </el-checkbox-group></div
            ></el-col>
            <!-- <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-checkbox-group v-model="currentExtendNodeConfig.viewConfig.commonConfig.disabled">
                  <el-checkbox label="不可编辑"></el-checkbox>
                </el-checkbox-group></div
            ></el-col> -->
            <!-- <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-checkbox-group v-model="currentExtendNodeConfig.viewConfig.commonConfig.hidden">
                  <el-checkbox label="隐藏显示"></el-checkbox>
                </el-checkbox-group></div>
            </el-col> -->
          </el-row>
        </div>
        <!-- <div class="org-config" v-if="currentExtendNodeConfig.viewConfig.commonConfig.newest">
          <p class="field-label-text"><i class="el-icon-s-custom"></i>可查看人</p>
          <OrgSelectionModal v-model="currentExtendNodeConfig.viewConfig.userConfig.members" />
          <p class="field-label-text"><i class="el-icon-tickets"></i>字段控制</p>
          <FormFieldsControl v-model="currentExtendNodeConfig.viewConfig.userConfig.columnConfigs" />
        </div> -->
      </a-collapse-panel>
      <!-- <a-collapse-panel
            key="formFieldControl"
            key="formFieldControl"
            v-if="elementType === 'UserTask'"
          >
            <div slot="header" class="panel-tab__title">
              <i class="el-icon-s-order"></i>表单属性
            </div>
            <FormFieldsControl v-model="fieldsControl_peopleInCharge" />
          </a-collapse-panel> -->
    </a-collapse>
  </div>
  <!-- </a-tab-pane> -->

  <!-- <a-tab-pane key="2" tab="表单属性"> -->
  <!-- <FormFieldsControl v-model="tableJson" /> -->
  <!-- </a-tab-pane> -->
  <!-- </a-tabs> -->
</template>

<script>
import ElementBaseInfo from './base/ElementBaseInfo';
import ElementOtherConfig from './other/ElementOtherConfig';
import ElementTask from './task/ElementTask';
import ElementMultiInstance from './multi-instance/ElementMultiInstance';
import FlowCondition from './flow-condition/FlowCondition';
import SignalAndMassage from './signal-message/SignalAndMessage';
import ElementListeners from './listeners/ElementListeners';
import ElementProperties from './properties/ElementProperties';
import ElementForm from './form/ElementForm';
import UserTaskListeners from './listeners/UserTaskListeners';
//@jayce 21/12/20-11:02:31 :
import FormFieldsControl from './comps/FormFieldsControl.vue';
import OrgSelectionModal from './comps/OrgSelectionModal.vue';
import NodeApproverConfigModal from './comps/NodeApproverConfigModal.vue';
import LanguageSupport from './comps/LanguageSupport.vue';
import convert from 'xml-js';
import deepCloneObject from '@/utils/deepCloneObject.js';
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';
import TitleRow from '@/components/base/TitleRow';

/**
 * 侧边栏
 * @Author MiyueFE
 * @Home https://github.com/miyuesc
 * @Date 2021年3月31日18:57:51
 */
export default {
  name: 'MyPropertiesPanel',
  components: {
    UserTaskListeners,
    ElementForm,
    ElementProperties,
    ElementListeners,
    SignalAndMassage,
    FlowCondition,
    ElementMultiInstance,
    ElementTask,
    ElementOtherConfig,
    ElementBaseInfo,
    FormFieldsControl,
    OrgSelectionModal,
    LanguageSupport,
    NodeApproverConfigModal,
    TitleRow,
  },
  componentName: 'MyPropertiesPanel',
  props: {
    bpmnModeler: Object,
    prefix: {
      type: String,
      default: 'activiti',
    },
    width: {
      type: Number,
      default: 40,
    },
    idEditDisabled: {
      type: Boolean,
      default: true,
    },
    bpmnEditDataInit: {
      //@jayce 22/01/18-18:48:13 : 用于edit 模式下。初始化节点配置、抄送配置、查看配置
      type: Object,
    },
    type: {
      type: Number,
      required: true,
    },
  },
  provide() {
    return {
      prefix: this.prefix,
      width: this.width,
    };
  },
  computed: {
    isPlatform: function () {
      return this.type === FlowFormDesignerType.PLATFORM_NEW || this.type === FlowFormDesignerType.PLATFORM_EDIT;
    },
    isSystem: function () {
      return this.type === FlowFormDesignerType.SYSTEM_NEW || this.type === FlowFormDesignerType.SYSTEM_EDIT;
    },
  },
  data() {
    return {
      activeTab: ['peopleInchage'],
      elementId: '',
      elementType: '',
      elementBusinessObject: {}, // 元素 businessObject 镜像，提供给需要做判断的组件使用
      conditionFormVisible: false, // 流转条件设置
      formVisible: false, // 表单配置

      //@jayce 21/12/20-19:24:55 :
      currentExtendNodeConfig: {
        // nodeId: '',
        // lang: { zh: 'Hello' },
        // taskConfig: {
        //   columnConfigs: [],
        //   applyerLeader: false, //发起人领导
        //   applyer: false,
        //   members: [],
        // },
        // copyConfig: {
        //   columnConfigs: [],
        //   members: [],
        //   type: 'end', //'start'/'end'
        // },
        // viewConfig: {
        //   commonConfig: {
        //     newest: true,
        //     // disabled: false,
        //     // hidden: true,
        //   },
        //   userConfig: {
        //     columnConfigs: [],
        //     members: [],
        //   },
        // },
      },
      historyExtendConfig: [],
    };
  },
  watch: {
    elementId: {
      handler() {
        this.activeTab = ['languages'];
      },
    },
    historyExtendConfig: {
      handler: function () {
        window.historyExtendConfig = this.historyExtendConfig;
        this.$store.commit('SET_BPMN_DATA', this.historyExtendConfig);

      },
      deep: true,
      immediate: true,
    },
    //@jayce 23/05/12-17:36:52 : + currentExtendNodeConfig watch
    currentExtendNodeConfig: {
      handler: function () {
        this.$store.commit('SET_BPMN_DATA', this.historyExtendConfig);
      },
      deep: true,
      immediate: true,
    },
    bpmnEditDataInit:{
      // bpmnEditDataInit 数据是异步拉取的， 所以不能在 created 阶段去初始化
      handler:function(){
        if(this.bpmnEditDataInit && !!this.bpmnEditDataInit.nodeConfigs){
          this.historyExtendConfig = JSON.parse(this.bpmnEditDataInit.nodeConfigs);
          console.log('[this.historyExtendConfig]: ',this.historyExtendConfig)
        }
      },
      deep:true,
      immediate:true
    }
  },

  mounted() {
    // this.initModels()
    let unwatch = this.$watch('bpmnModeler', function () {
      this.initModels();
      if (unwatch) unwatch();
    });
    /**
     * 用以监听src/views/erp/formdesign/FlowFormDesigner/index.vue 中， step 切换时的事件
     * 该监听事件，用于当表单设计器变动时，刷新流程节点的字段控制
     * @param key { Number } - 当前step对应的key
     */
    this.$bus.$on('stepChange', (from, key) => this.stepChangeListener(from, key));
  },
  methods: {
    handleElementChange(element) {
      // 结点编辑 change 事件发生后，同步去修改结点多语言配置中的中文项
      const name = element.businessObject.name;
      this.currentExtendNodeConfig.lang['zh'] = name;
    },
    handleLangInputChange(elementId) {
      this.currentExtendNodeConfig.lang = this.$refs['language-support'].getValue();
      const isValid = this.$refs['language-support'].validateForm();
    },
    initModels() {
      /**
       * 把这种写法替换为了 vw.$watch 在mounted 中触发：相关参考：https://www.cnblogs.com/jaycethanks/p/15719696.html#方案二-vwwatch
       * // 初始化 modeler 以及其他 moddle
       * if (!this.bpmnModeler) {
       * // 避免加载时 流程图 并未加载完成
       * this.timer = setTimeout(() => this.initModels(), 10)
       * return
       * }
       * if (this.timer) clearTimeout(this.timer)
       */

      window.bpmnInstances = {
        modeler: this.bpmnModeler,
        modeling: this.bpmnModeler.get('modeling'),
        moddle: this.bpmnModeler.get('moddle'),
        eventBus: this.bpmnModeler.get('eventBus'),
        bpmnFactory: this.bpmnModeler.get('bpmnFactory'),
        elementFactory: this.bpmnModeler.get('elementFactory'),
        elementRegistry: this.bpmnModeler.get('elementRegistry'),
        replace: this.bpmnModeler.get('replace'),
        selection: this.bpmnModeler.get('selection'),
      };
      this.getActiveElement();
    },
    getActiveElement() {
      // 初始第一个选中元素 bpmn:Process
      this.initFormOnChanged(null);
      this.bpmnModeler.on('import.done', (e) => {
        this.initFormOnChanged(null);
      });
      // 监听选择事件，修改当前激活的元素以及表单
      this.bpmnModeler.on('selection.changed', ({ newSelection }) => {
        this.initFormOnChanged(newSelection[0] || null);
      });
      this.bpmnModeler.on('element.changed', ({ element }) => {
        // 保证 修改 "默认流转路径" 类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
        if (element && element.id === this.elementId) {
          this.handleElementChange(element);
          this.initFormOnChanged(element);
        }
      });

      this.bpmnModeler.on('shape.remove', ({ element }) => {
        // 节点移除监听
        this.shapeRemoveEventCustomHandle(element);
      });
    },
    // 初始化数据
    initFormOnChanged(element) {
      //@jayce 21/12/22-15:38:48 : 节点点击事件
      let activatedElement = element;
      if (!activatedElement) {
        activatedElement =
          window.bpmnInstances.elementRegistry.find((el) => el.type === 'bpmn:Process') ??
          window.bpmnInstances.elementRegistry.find((el) => el.type === 'bpmn:Collaboration');
      }
      if (!activatedElement) return;
      // console.log(`
      //         ----------
      // select element changed:
      //           id:  ${activatedElement.id}
      //         type:  ${activatedElement.businessObject.$type}
      //         ----------
      //         `)
      // console.log('businessObject: ', activatedElement.businessObject)
      window.bpmnInstances.bpmnElement = activatedElement;
      this.bpmnElement = activatedElement;
      this.elementId = activatedElement.id;
      this.elementType = activatedElement.type.split(':')[1] || '';

      this.elementBusinessObject = deepCloneObject(activatedElement.businessObject);
      this.conditionFormVisible = !!(
        this.elementType === 'SequenceFlow' &&
        activatedElement.source &&
        activatedElement.source.type.indexOf('StartEvent') === -1
      );
      this.formVisible = this.elementType === 'UserTask' || this.elementType === 'StartEvent';

      //@jayce 21/12/28-16:30:42 : extend entry
      this.clickEventCustomHandle();
    },
    beforeDestroy() {
      window.bpmnInstances = null;
    },
    //@jayce 21/12/28-15:49:52 :
    // fetchBpmnJsonData() {
    //   this.bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
    //     return convert.xml2json(xml, { spaces: 2 })
    //   })
    // },
    shapeRemoveEventCustomHandle(element) {
      let i = this.historyExtendConfig.findIndex((it) => it.node_id === element.id);
      if(i != -1){
        this.historyExtendConfig.splice(i, 1); // 移除该节点
      }
    },
    clickEventCustomHandle() {
      this.initFieldsControl(); // 初始化表单字段控制组件
      console.log('[this.currentExtendNodeConfig]: ', this.currentExtendNodeConfig);
    },
    //@jayce 21/12/28-16:26:41 :
    initFieldsControl() {
      /** 每次点击，有两件事需要做：
       * 1. 判断bpmnUserTaskNodeConfig是否已经维护该节点
       * 2. 如果已经维护，拿出其表单，响应式绑定到 <FormFieldsControl/>,实时修改
       * 3. 如果没有维护，从store深拷贝当前表单，然后维护到bpmnUserTaskNodeConfig，响应式绑定到 <FormFieldsControl/>, 实时修改
       */
      if (this.elementType === 'UserTask') {
        // 1. 判断bpmnUserTaskNodeConfig是否已经维护该节点
        let target = this.historyExtendConfig.find((it) => it.nodeId === this.elementId);
        if (target != undefined) {
          // 2. 如果已经维护
          //拿出其表单，响应式绑定到 <FormFieldsControl/>,  实时修改
          this.currentExtendNodeConfig = target;
        } else {
          // 3. 如果没有维护
          //深拷贝一份kform 表单信息，并关联改节点后，放入bpmnUserTaskNodeConfig,将表单的引用响应式绑定到 <FormFieldsControl/>,  实时修改
          let temp = {
            nodeId: this.elementId,
            lang: {},
            taskConfig: {
              columnConfigs: this.pureFieldsControl(deepCloneObject(this.$store.state.kform.data)), // 将深拷贝表单信息转为 <FormFieldsControl/> 能直接处理的数据对象,
              approval: {
                approvalType: 'applicant',
                members: []
              },
              autoApproval: false
            },
            copyConfig: {
              columnConfigs: this.pureFieldsControl(deepCloneObject(this.$store.state.kform.data)),
              approval: {
                approvalType: 'applicant',
                members: []
              },
              type: 'end',
            },
            viewConfig: {
              commonConfig: {
                newest: true,
                disabled: true,
                hidden: true,
              },
              userConfig: {
                columnConfigs: this.pureFieldsControl(deepCloneObject(this.$store.state.kform.data)),
                approval: {
                  approvalType: 'applicant',
                  members: []
                },
              },
            },
          };

          this.currentExtendNodeConfig = temp;
          this.historyExtendConfig.push(temp);
        }
      }
    },
    /* ----@jayce 21/12/28-15:58:01 :   util functions 工具函数---- */
    //表单中的字段过滤出来 until function
    pureFieldsControl(formInfo) {
      let _this = this;
      /*
      grid columns
      card list
      tabs columns
      table trs
      */
      let result = [];
      const TYPELIST = ['grid', 'card', 'tabs', 'table']; //布局元素
      recursionFilter(formInfo.list); // 过滤出嵌套在布局元素中的字段，
      function recursionFilter(target) {
        target.map((it) => {
          if (TYPELIST.includes(it.type)) {
            if (it.type === 'grid' || it.type === 'tabs') {
              it.columns.map((_it) => {
                recursionFilter(_it.list);
              });
            } else if (it.type === 'card') {
              recursionFilter(it.list);
            } else if (it.type === 'table') {
              it.trs.map((_it) => {
                _it.tds.map((__it) => {
                  recursionFilter(__it.list);
                });
              });
            }
          } else {
            // 非布局元素
            result.push(_this.structDateObj(it));
          }
        });
      }
      return result;
    },
    structDateObj(it) {
      const obj = {};
      if (it.model != undefined || it.key != undefined) {
        obj.label = it.label || 'empty';
        obj.type = it.type || 'unknown';
        obj.model = it.model || it.key;
        obj.key = it.key;
        obj.hidden = false;
        obj.disabled = false;
        // obj.hidden = it.options.hidden || false
        // obj.disabled = it.options.disabled || false
      }
      if (it.exposeFields) {
        obj.exposeFields = it.exposeFields;
      }

      return obj;
    },
    stepChangeListener(from, key) {
      let _this = this;
      if (from === 0 && key == 1) {
        // 如果从表单设计跳转到流程设定step
        /**
         * 1.forminfo 表单设计器，是关联在vuex中的，因此，它始终保持最新同步，即便是在最后提交，也是直接从store中获取
         * 2.流程设计器中的各个既存节点，由于初次初始化是在添加的时刻完成（点击触发）。所以当表单设计器变动了，这些节点的字段控制需要在这里进行更新同步
         * 3.表单的更新，意味着表单信息可能增加或者减少两种情况
         */
        /**
         * 思路描述：
         * 1. 先以历史节点数据为基础，生成一份拷贝
         * 2. 将该拷贝中的所有字段控制先赋值为最新的字段控制模板
         * 3. 过滤出历史字段控制模板和最新的字段控制模板中皆存在的字段 => 说明这些字段都是存在历史字段控制配置的
         * 4. 将这里历史字段控制的配置 重新 set给所有节点（已经被赋值为最新的字段控制模板）
         */

        // prettier-ignore
        // H: History Nodes Fields Control Template 获取历史的字段控制模板
        const H = this.historyExtendConfig.length > 0 ? this.historyExtendConfig[0].taskConfig.columnConfigs : [] //获取历史节点，都是一样的随便取一个
        if (this.historyExtendConfig.length === 0 || H.length === 0) return; // 如果压根没有历史节点，或者表单字段为空就不需要做处理
        // N: New Nodes Fields Control Template 生成最新的字段控制模板
        const N = this.pureFieldsControl(deepCloneObject(this.$store.state.kform.data));
        // 一定要在set 之前， 保留一份历史节点的数据
        const historyExtendConfig_backup = deepCloneObject(this.historyExtendConfig); //历史节点深拷贝

        // set 新的最新字段控制模板
        this.historyExtendConfig.forEach((it) => {
          it.taskConfig.columnConfigs = deepCloneObject(N);
          it.copyConfig.columnConfigs = deepCloneObject(N);
          it.viewConfig.userConfig.columnConfigs = deepCloneObject(N);
        });
        /**
         * 1. 去做判断， 最新的字段控制模板和历史的字段控制模板有什么差异
         * 2. 找出最新的字段控制模板中有，且历史字段模板有的 历史字段字段（如果是新增字段则不用管，在上一步的set最新字段控制模板中就已经设定了默认值）也就是需要恢复设定值的字段
         */

        // 找出存在历史配置的字段key
        const H_keys = H.map((it) => it.key);
        const N_keys = N.map((it) => it.key);
        const DiffKeys = N_keys.filter((it) => H_keys.indexOf(it) != -1); // 存在历史的字段key

        // 设定每个节点历史配置值
        console.log(this.historyExtendConfig, '--line586');
        // prettier-ignore
        this.historyExtendConfig.forEach((it) => {
          historyExtendConfig_backup.forEach(h_it => {
            if (it.nodeId === h_it.nodeId) {
              setHistoryFields(it.taskConfig.columnConfigs, h_it.taskConfig.columnConfigs)
              setHistoryFields(it.copyConfig.columnConfigs, h_it.copyConfig.columnConfigs)
              setHistoryFields(it.viewConfig.userConfig.columnConfigs, h_it.viewConfig.userConfig.columnConfigs)
            }
          })
        })

        // prettier-ignore
        function setHistoryFields(columnConfigs, historyColumnConfigs) {
          columnConfigs.forEach((it) => {
            // 遍历每个字段，先去判断有没有历史配置，针对有历史配置的字段：
            if (DiffKeys.includes(it.key)) {
              // 当前字段有历史配置，找到该历史配置对象
              let target = historyColumnConfigs.find(i => i.key === it.key);
              it.hidden = target.hidden;
              it.disabled = target.disabled;
              // it = target;不可以这样直接赋值，对象的内存地址直接被覆盖了，无法利用引用值特性直接修改原 historyExtendConfig 数据
            }
          })
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .person-incarge-item .a-collapse-panel__content {
  margin-bottom: 10px;
}
::v-deep .ant-collapse-header {
  // padding: 6px 16px !important;
  user-select: none !important;
}
.field-label-text {
  margin-top: 10px;
  color: #a4a4a4;
}
::v-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
  padding: 10px 14px;
}
</style>
