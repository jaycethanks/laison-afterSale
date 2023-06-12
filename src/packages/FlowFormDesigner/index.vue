// TODO: 其他对应type的测试和逻辑完善
<template>
  <div class="flow-form-designer-root">
    <div class="flow-form-designer-root" v-show="!success">
      <p class="flow-form-designer-header">
        <a-button
          class="header-back"
          v-if="
            [
              FlowFormDesignerType.PLATFORM_NEW,
              FlowFormDesignerType.PLATFORM_EDIT,
            ].includes(computedQuery.type)
          "
          @click="handleGoBackToManagePage"
          type="link"
          icon="rollback"
          >返回</a-button
        >
        <a-steps
          ref="steps"
          style="margin-bottom: 0; width: auto"
          size="small"
          v-model="current"
          type="navigation"
          @change="onStepChange"
        >
          <!-- bugfix 不可以用v-if, v-if 会导致current 改变， 0,1,2 => 0,1 -->
          <a-step status="finish" title="表单设计" v-show="!noFormDesign">
            <SvgIconFormDesign style="width: 20px; height: 20px" slot="icon" />
          </a-step>
          <a-step status="finish" title="流程设计">
            <SvgIconFlowDesign style="width: 20px; height: 20px" slot="icon" />
          </a-step>
          <a-step status="process" title="流程发布">
            <SvgIconFFPublish style="width: 20px; height: 20px" slot="icon" />
          </a-step>
        </a-steps>
      </p>
      <div class="flow-form-designer-container">
        <form-design v-show="!noFormDesign || current === 0" ref="formDesignView"></form-design>
        <flow-design
          v-show="current === 1"
          :bpmnEditDataInit="bpmnEditDataInit"
          :type="computedQuery.type"
        ></flow-design>
        <flow-form-publish
          v-show="current === 2"
          @submit="sumbitHandler"
          :publishEditDataInit="publishEditDataInit"
          @success="$emit('back')"
          @doSubmit="handleSubmit"
          :type="computedQuery.type"
          :fetchGroup="fn.fetchGroup"
          :uniTenantId="computedQuery.uniTenantId"
        ></flow-form-publish>
      </div>
    </div>
    <SuccessPage description="提交成功" v-show="success">
      <a-button
        v-if="[FlowFormDesignerType.SYSTEM_NEW].includes(computedQuery.type)"
        @click="handleGoBackToDesign"
        type="link"
        icon="rollback"
        >继续设计</a-button
      >
      <a-button
        v-if="[FlowFormDesignerType.SYSTEM_EDIT].includes(computedQuery.type)"
        @click="handleGoBackToTemplatesList"
        type="link"
        icon="rollback"
        >返回</a-button
      >

      <a-button
        v-if="
          [
            FlowFormDesignerType.PLATFORM_NEW,
            FlowFormDesignerType.PLATFORM_EDIT,
          ].includes(computedQuery.type)
        "
        @click="handleGoBackToManagePage"
        type="link"
        icon="rollback"
        >返回</a-button
      >
    </SuccessPage>
  </div>
</template>

<script>
import FormDesign from '@/packages/FormDesigner/index.vue';
import FlowDesign from '@/packages/FlowDesigner/index.vue';
import handleQuery from '@/mixins/handleQuery.js';

import FlowFormPublish from './FlowFormPublish';
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';

import SvgIconFormDesign from '@/assets/svgIcon/SvgIconFormDesign.vue';
import SvgIconFlowDesign from '@/assets/svgIcon/SvgIconFlowDesign.vue';
import SvgIconFFPublish from '@/assets/svgIcon/SvgIconFFPublish.vue';
import mock from "./mock"
import { listDesignGroup as system_listDesignGroup, findById as system_query, add as system_add, update as system_update } from '@/api/system/processFormTemplate.js';
import { queryTemplate, queryProcessForm, publishProcessForm, updateProcessForm, organizationStructure, listDesignGroup } from "@/api/platform/platformOpenAPI.js"
import SuccessPage from "@/components/FlowForm/SuccessPage/index.vue"
const HistoryStack = {
  0:"formDesign",
  1:"flowDesign",
  2:"flowformPublish"
}
export default {
  name: 'FlowFormDesigner',
  mixins: [handleQuery],

  props: {
    editRecord: {
      type: Object,
    },
    // type: {
    //   type: Number,
    //   default: FlowFormDesignerType.PLATFORM_NEW,
    // },
  },

  components: {
    FormDesign,
    FlowDesign,
    FlowFormPublish,
    SvgIconFormDesign,
    SvgIconFlowDesign,
    SvgIconFFPublish,
    SuccessPage
  },
  provide: function () {
    return {
      jumpTo: this.jumpTo,
    };
  },
  data() {
    return {
      FlowFormDesignerType,
      noFormDesign: true,
      current: 0,
      stepsHistoryStack: [0], // steps 的跳转栈，用于增加操作逻辑
      isSubmit: false, // 用于判断路由切换时，提示控制
      bpmnEditDataInit: null, // 用于edit的回显初始化
      publishEditDataInit: null, // 用于edit的回显初始化
      fn: {
        publish: null,//发布接口
        query: null,//查询模板/流程接口
        fetchGroup: null//查询发布分组接口
      },
      query: {
        // 查看handleQuery的使用文档 src/mixins/handleQuery.md
        // query 的初始化全部值，都必须在这里指定， 如果需要指明那一个query字段是必须的，
        // 那么，需要将该字段初始化为一对象,例如 type: {value: 初始化值}
        type: {
          type: Number,
        },
        templateId: undefined,
        uniTenantId: undefined,
        bizToken: undefined,
      },
      success: false
    };
  },

  created() {
    // 尝试数据初始化
    this.resetStore()

    // 根据query的type 进行一系列初始化
    this.handleType(this.computedQuery.type);
  },
  mounted() {
    this.$refs.steps.historyStack = [];
  },
  methods: {
    jumpTo(tabIndex) {
      this.current = tabIndex;
    },

    onStepChange(key,a,b) {
      this.stepsHistoryStack.push(key);
      let from = this.stepsHistoryStack.at(-2);

      let _this = this;
      // let res = this.$refs.formDesignView.fetchFormData()
      let currentFormInfo = this.$store.state.kform.data;

      // !! 临时禁用验证
      // if (key === 1 && !currentFormInfo.list.length) {
      //   this.$warning({
      //     content: '表单设计为空，请先完成表单设计',
      //     onOk() {
      //       _this.current = 0;
      //     },
      //   });
      // } else if (key === 2 && !window.historyExtendConfig.length) {
      //   this.$warning({
      //     content: '设计流程不可为空，请先完成流程设计',
      //     onOk() {
      //       _this.current = 1;
      //     },
      //   });
      // }

      // if(from === 0 && to === 1){
      //   this.$warning({
      //     content: '请确认表单设计内容,跳转将刷新流程节点字段控制',
      //     onOk() {
      //       _this.current = 0
      //     },
      //   })
      // }
      /**
       * 触发事件 'stepChange' , 以便于在src/components/bpmnpd/package/penal/PropertiesPanel.vue 中触发更新
       * @param key -  { Number } - 当前step对应的key,相当于 "to" 的含义
       * @param from { Number } - 上一个step
       */

      this.$bus.$emit('stepChange', from, key);
    },
    sumbitHandler() {
      this.isSubmit = true;
    },
    handleType(type) {
      switch (type) {
        case FlowFormDesignerType.SYSTEM_NEW: //1
          this.noFormDesign = false;
          this.current = 0;
          this.fn.publish = system_add;
          this.fn.fetchGroup = system_listDesignGroup;

          break;
        case FlowFormDesignerType.PLATFORM_NEW: //2
          this.noFormDesign = true;
          this.current = 1;

          this.fn.publish = publishProcessForm;
          this.fn.query = queryTemplate;
          this.fn.fetchGroup = listDesignGroup;
          this.loadPlatformFlowFormDataAndInit()
          this.loadOrgStructAndSetStore()
          break;
        case FlowFormDesignerType.SYSTEM_EDIT: //3
          this.noFormDesign = false;
          this.current = 0;

          this.fn.publish = system_update;
          this.fn.query = system_query
          this.fn.fetchGroup = system_listDesignGroup;

          this.loadSystemFlowFormDataAndInit()
          break;
        case FlowFormDesignerType.PLATFORM_EDIT: //4
          this.noFormDesign = true;
          this.current = 1;

          this.fn.publish = updateProcessForm;
          this.fn.query = queryProcessForm
          this.fn.fetchGroup = listDesignGroup;

          this.loadPlatformFlowFormDataAndInit()
          this.loadOrgStructAndSetStore()
          break;
        default:
          break;
      }
    },
    // 加载三方组织架构,并set到store
    async loadOrgStructAndSetStore() {
      const res = await organizationStructure({
        uniTenantId: this.computedQuery.uniTenantId,
        bizToken: this.computedQuery.bizToken,
      })
      if (res.status === 200) {
        this.$store.commit('SET_FLOWFORM_organizationStructure', res.data);
      }
    },


    // 系统 在设计/编辑 流程模板时 初始化数据
    async loadSystemFlowFormDataAndInit() {
      const res = await this.fn.query({ id: this.computedQuery.templateId })
      if (res.status === 200) {
        this.setFlowFormData(res.data)
      } else {
        this.$message.error(res.msg)
      }
    },

    // 平台 设计流程模板 / 编辑已发布流程时 初始化数据
    async loadPlatformFlowFormDataAndInit() {
      if (this.computedQuery.templateId) {
        const res = await this.fn.query({ id: this.computedQuery.templateId })
        if (res.status === 200) {
          this.setFlowFormData(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    },
    setFlowFormData(fetchData) {
      const { formInfo, procModelXml, nodeConfigs } = fetchData;
      this.setKformStore(formInfo);
      this.setFlowDesignData({ procModelXml, nodeConfigs });
      this.setFlowFormPublishData(fetchData);
    },
    // 初始化kform design store 数据
    setKformStore(formInfo) {
      let _formInfo;
      if (typeof formInfo === 'string') {
        _formInfo = JSON.parse(formInfo);
      }
      this.$store.commit('SET_KFORM_DATA', _formInfo);
    },
    // 初始化 flow design 数据
    setFlowDesignData({ procModelXml, nodeConfigs }) {
      this.$set(this, 'bpmnEditDataInit', {
        xmldata: procModelXml,
        nodeConfigs: nodeConfigs,
      });

    },
    setFlowFormPublishData(fetchData) {
      const {
        permissionConfig,
        id,
        designIcon,
        designColor,
        designName,
        designGroupName,
        designDes,
        notifyConfig
      } = fetchData;
      let _permissionConfig = permissionConfig ? JSON.parse(permissionConfig) : {};
      this.publishEditDataInit = {
        id: id, // 注意，仅当为编辑状态时需要此id， 如果时新建流程，不需要传这个id
        iconName: {
          name: designIcon,
          color: designColor,
        },
        flowName: designName,
        groupSelected: designGroupName,
        remark: designDes,
        notifyConfig: notifyConfig ? JSON.parse(notifyConfig) : null,
        startMembers: _permissionConfig ? _permissionConfig.starterMembers : [],
        viewMembers: _permissionConfig ? _permissionConfig.viewAllMembers : [],
      };
    },

    // 数据提交
    async handleSubmit(data) {
      const res = await this.fn.publish({ data, uniTenantId: this.computedQuery.uniTenantId });
      if (res.status === 200) {
        this.success = true
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }


    },
    handleGoBackToDesign() {
      this.jumpTo(0);
      this.success = false;
      this.resetStore()

    },
    handleGoBackToManagePage() {
      this.$router.push({
        path: '/platform/flowformManagement',
        query: {
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
        }
      });
    },
    handleGoBackToTemplatesList() {
      this.resetStore()
      this.$router.push({
        path: '/system/flowformDesign/flowformTemplatesList',
      });
    },
    resetStore(){
      this.$store.commit('RESET_KFORM');
      this.$store.commit('RESET_BPMN');
      this.$store.commit('RESET_FLOWFORM');
    }


  },

  // beforeRouteLeave(to, from, next) {
  //   if (this.isSubmit) {
  //     //提交过了
  //     next();
  //   } else {
  //     this.$confirm({
  //       title: this.$t('common.warning'),
  //       content: this.$t('common.离开页面将会丢弃所有设计内容，确认离开？'),
  //       okType: 'danger',
  //       onOk() {
  //         next();
  //       },
  //       onCancel() {
  //         next(false);
  //       },
  //     });
  //   }
  //   this.isSubmit = false;
  // },
};
</script>
<style scoped lang="scss">
.flow-form-designer-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  user-select: none;
  height: 40px;
  position: relative;
  margin-bottom: 0;
  .header-back {
    position: absolute;
    left: 0;
  }
}
.flow-form-designer-root {
  height: 100%;
  width: 100%;
}
.flow-form-designer-container {
  height: calc(100% - 40px);
}
::v-deep .ant-steps-navigation .ant-steps-item.ant-steps-item-active::before {
  transform: translateX(-50%);
  left: 50%;
  // width: 25%;
  height: 100%;
  border-radius: 6px;
  background-color: #fff;
  transition: left 0.3s;
}

::v-deep .ant-steps-navigation .ant-steps-item::before {
  transform: translateX(-50%);
  height: 100%;
  border-radius: 6px;
  background-color: #fff;
  transition: left 0.3s;
}
::v-deep .ant-steps-navigation .ant-steps-item-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0;
  min-width: 140px;
}
::v-deep .ant-steps-navigation .ant-steps-item::before {
  height: 1.8px;
}
::v-deep .ant-steps-navigation {
  padding: 2px;
  border-radius: 6px;
  background-color: #eeeeee;
}

::v-deep .ant-steps-navigation .ant-steps-item::after {
  display: none;
}
::v-deep .ant-steps-item-custom .ant-steps-item-icon > .ant-steps-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .ant-steps-small .ant-steps-item-custom .ant-steps-item-icon {
  width: 24px;
  height: 24px;
}
/** steps 自定义样式 END */
</style>
