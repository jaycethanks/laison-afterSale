<template>
  <RootContainer>
    <Container maxWidth="700px">
      <!-- <div class="publish-page-wrapper" :style="{ height: height }"> -->
      <div class="publish-content">
        <!--  -->
        <div class="field-item">
          <div style="float: left; width: 15%">
            <!--  -->
            <div class="inside-field-item">
              <div class="field-title">
                <div class="field-main-title required-field">图标设置</div>
                <div class="field-sub-title">图标</div>
              </div>

              <div class="field-content" style="cursor: pointer" @click="$refs.iconSelect.show()">
                <iconSelect ref="iconSelect" v-model="sumbitForm.iconName" />
              </div>
            </div>
          </div>
          <div style="float: right; width: 75%">
            <!--  -->
            <div class="field-item">
              <div class="field-title">
                <div class="field-main-title required-field">表单名称</div>
                <div class="field-sub-title">最多20字符</div>
              </div>

              <div class="field-content">
                <a-input allowClear style="width: 100%" placeholder="请输入表单名称" v-model="sumbitForm.flowName" />
              </div>
            </div>
            <!--  -->
          </div>
        </div>

        <div class="field-item" style="clear: both">
          <div class="field-title">
            <div class="field-main-title required-field">所在分组</div>
            <div class="field-sub-title">请为该流程设定分组</div>
          </div>
          <div class="field-content" style="display: flex">
            <a-popover v-model="popoverVisible" :title="null" trigger="click">
              <!-- prettier-ignore -->
              <div slot="content" style="display: flex; align-items: center;gap: 5px;">
              <!-- prettier-ignore -->
              <div style="white-space: nowrap;font-weight: 600;">新增分组:</div>
              <a-input @keyup.enter="handlerAdd" :maxLength="10" allowClear placeholder="新增的组名，10个字符限制" v-model="newGroupInputModel"></a-input>
              <!-- prettier-ignore -->
              <a-button @click="handlerAdd" type="link" size="small" ><a-icon type="check"/></a-button>
              <!-- prettier-ignore -->
              <a-button @click="popoverVisible = false" type="link" size="small" ><a-icon style="color: #ff7875" type="close"/></a-button>
            </div>
              <a-button
                style="margin-right: 20px"
                type="dashed"
                shape="circle"
                icon="plus"
                @click="newGroupInputModel = ''"
              />
            </a-popover>

            <a-select v-model="sumbitForm.groupSelected" style="width: 100%">
              <!-- prettier-ignore -->
              <!-- <a-input-search ref="inputRef"  enterButton="添加" @search="addItem"></a-input-search> -->
              <a-select-option v-for="item in groupList" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
        </div>

        <div class="field-item">
          <div class="field-title">
            <div class="field-main-title">表单说明</div>
            <div class="field-sub-title">请在这里简单描述该流程表单用途及注意事项，最多50字符</div>
          </div>

          <div class="field-content">
            <a-textarea
              allowClear
              :maxLength="50"
              v-model="sumbitForm.remark"
              :auto-size="{ minRows: 2, maxRows: 2 }"
            />
          </div>
        </div>

        <!-- bugfix 不可 v-if 模板设计完成后将会没有notifyConfig字段， 这样拉取模板发布时，这个字段没有初始值，提交也不会有值-->
        <div class="field-item" v-show="showPeopleConfig">
          <div class="field-title">
            <div class="field-main-title">消息推送类型</div>
            <div class="field-sub-title">指定消息将以何种方式推送</div>
          </div>

          <div class="field-content">
            <a-checkbox v-model="sumbitForm.notifyConfig.selectSMS"> 短信通知 </a-checkbox>
            <a-checkbox v-model="sumbitForm.notifyConfig.selectEmail"> 邮箱通知 </a-checkbox>
          </div>
        </div>

        <div class="field-item" v-if="showPeopleConfig">
          <div class="field-title">
            <div class="field-main-title required-field">发起新流程</div>
            <div class="field-sub-title">请在这里配置可以发起该流程的人员</div>
          </div>
          <div class="field-content">
            <OrgSelectionModal approvalType="multiple" v-model="sumbitForm.startMembers" :minHeight="100" />
          </div>
        </div>

        <div class="field-item" v-if="showPeopleConfig">
          <div class="field-title">
            <div class="field-main-title required-field">查看全部流程</div>
            <div class="field-sub-title">请在这里配置可以查看全部该流程的人员</div>
          </div>
          <div class="field-content">
            <OrgSelectionModal approvalType="multiple" v-model="sumbitForm.viewMembers" :minHeight="100" />
          </div>
        </div>
        <div class="field-item">
          <a-button @click="submit" type="primary">{{
            submitBtnText
          }}</a-button>
        </div>
      </div>
      <!-- </div> -->
    </Container>
  </RootContainer>
</template>
<script>
import OrgSelectionModal from '@/lib/bpmnpd/package/penal/comps/OrgSelectionModal.vue';
import iconSelect from '@/components/FlowForm/IconSelect/iconSelect.vue';
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';
import Container from "@/components/base/Container/index.vue"
import RootContainer from '@/components/base/RootContainer/index.vue'
import convert from 'xml-js';
let index = 0;
export default {
  props: {
    height: {
      type: String,
    },
    publishEditDataInit: {
      type: Object,
    },
    type: {
      type: Number,
      required: true,
    },
    fetchGroup: {
      type: Function,
      required: true
    },
    uniTenantId: {
      type: String,
    }
  },
  inject: ['jumpTo'],
  components: {
    OrgSelectionModal,
    iconSelect,
    Container,
    RootContainer
  },
  name:"FlowFormPublish",
  data() {
    return {
      popoverVisible: false,
      newGroupInputModel: '',
      sumbitForm: {
        iconName: {}, //图表配置
        flowName: '', // 流程名
        groupSelected: '', //分组
        remark: '', //流程说明
        startMembers: [], //发起流程
        viewMembers: [], // 查看流程
        notifyConfig: {
          selectSMS: true,
          selectEmail: true
        }
      },
      groupList: [],

    };
  },
  computed: {
    showPeopleConfig: function () {
      return this.type === FlowFormDesignerType.PLATFORM_NEW || this.type === FlowFormDesignerType.PLATFORM_EDIT;
    },
    submitBtnText: function () {
      const isPlatform =
        this.type === FlowFormDesignerType.PLATFORM_NEW || this.type === FlowFormDesignerType.PLATFORM_EDIT;
      return isPlatform ? '发布流程' : '发布模板';
    },
  },
  watch: {
    publishEditDataInit: {
      handler: function () {
        if (this.publishEditDataInit != null) {
          this.sumbitForm = JSON.parse(JSON.stringify(this.publishEditDataInit));
          //后端数据库 在存储模板的时候 没有保存 notifyConfig， 这里需要在平台拉取模板进行流程设计的时候，给这个字段初始化一下
          if (!this.sumbitForm.notifyConfig) {
            this.$set(this.sumbitForm,'notifyConfig',{
              selectSMS: true,
              selectEmail: true
            })
          }
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    // init edit data

    this.loadGroupList();
  },
  methods: {
    async loadGroupList() {
      const res = await this.fetchGroup({ uniTenantId: this.uniTenantId })
      if (res.status === 200) {
        this.groupList = res.data.map((it) => it.name);
      } else {
        this.groupList = []
      }
    },

    handleInputClick(e) {
      e.preventDefault();
      this.$refs.inputRef.focus();
    },
    handlerAdd() {
      if (!this.newGroupInputModel.trim()) {
        this.$message.error('组名不可为空');
        return;
      }
      let exist = this.groupList.some((it) => it === this.newGroupInputModel.trim());
      if (exist) {
        this.$message.error('请勿重复新增');
        return;
      }
      this.groupList.push(this.newGroupInputModel);
      this.sumbitForm.groupSelected = this.newGroupInputModel;
      this.popoverVisible = false;
    },
    submit() {
      let valid = this.requiredFieldsValidate();
      if (valid) {
        this.submitDataJoint();
      } else {
        this.$message.warning('存在必填字段为空，请先检查后提交！');
      }
    },

    requiredFieldsValidate() {
      if (
        Object.keys(this.sumbitForm.iconName).length === 0 ||
        this.sumbitForm.flowName.trim() === '' ||
        this.sumbitForm.groupSelected.trim() === ''
      ) {
        return false;
      } else {
        return true;
      }
    },
    async submitDataJoint() {
      let processJson = await this.previewProcessJson();
      let processXml = await this.previewProcessXML();
      let initDataStructure = {
        id: this.sumbitForm.id || '', // 仅在编辑时会有此id
        designKey: this.getDesignKey(processJson),
        designName: this.sumbitForm.flowName,
        designDes: this.sumbitForm.remark,
        designIcon: this.sumbitForm.iconName.name,
        designColor: this.sumbitForm.iconName.color,
        designGroupName: this.sumbitForm.groupSelected,
        formInfo: JSON.stringify(this.$store.state.kform.data),
        procModelXml: processXml,
        permissionConfig: JSON.stringify({
          starterMembers: this.sumbitForm.startMembers,
          viewAllMembers: this.sumbitForm.viewMembers,
        }),
        nodeConfigs: JSON.stringify(window.historyExtendConfig),
        notifyConfig: JSON.stringify(this.sumbitForm.notifyConfig)
      };
      let _this = this;
      function interceptingValidator() {
        //! 附加的验证逻辑可以写在这里， 通过返回true，否则返回false
        let valid = true;
        //! 如果是系统内部，设计的流程模板，则不需要验证结点配置
        if ([FlowFormDesignerType.PLATFORM_NEW, FlowFormDesignerType.PLATFORM_EDIT].includes(_this.type)) {
          valid = _this.validateNodesApproval(initDataStructure);
        }
        return valid
      }

      if (interceptingValidator()) {
        this.$message.success('流程节配置检查通过');
        this.doSubmit(initDataStructure);
      }
    },

    validateNodesApproval(initDataStructure) {
      let _this = this;
      // 验证流程, 流程节点除了第一个节点， 其他UserTask 类型节点，必须配置 '审批配置' 指定审批人
      let temp = JSON.parse(initDataStructure.nodeConfigs);
      temp.shift(); // 首个节点可不必填写
      let blankIndex = temp.findIndex((it) => {
        return it.taskConfig.approval.members.length === 0 && it.taskConfig.approval.approvalType !== "applicantLeader" && it.taskConfig.approval.approvalType !== "applicant";
      }); // true : not valid
      if (blankIndex != -1) {
        _this.$message.error('检测到存在审批节点未指定审核人员，请检查配置')
        setTimeout(() => {
          _this.jumpTo(0)
        }, 500)
        setTimeout(() => {
          try {
            let selections = window.bpmnInstances.modeler.get('selection')
            let shape = window.bpmnInstances.modeler.get('elementRegistry').get(temp[blankIndex].nodeId)
            selections.select(shape)
          } catch (e) { }
        }, 1000)
        return false
      }
      return true;
    },
    getDesignKey(processJson) {
      return JSON.parse(processJson).elements[0].attributes.id;
    },
    async doSubmit(submitdata) {
      this.$emit('doSubmit', submitdata);
    },
    /** 表单数据处理 */
    previewProcessXML() {
      return new Promise((resolve, reject) => {
        window.bpmnInstances.modeler.saveXML({ format: true }).then(({ xml }) => {
          resolve(xml);
        });
      });
    },
    previewProcessJson() {
      return new Promise((resolve, reject) => {
        window.bpmnInstances.modeler.saveXML({ format: true }).then(({ xml }) => {
          let xmljson = convert.xml2json(xml, { spaces: 2 });
          resolve(xmljson);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
// .publish-page-wrapper {
// padding: 16px 20px;
// .publish-content {
//   padding: 16px 20px;
//   background-color: #ffffff;
//   height: 100%;
//   overflow-y: auto;
//   width: 40%;
//   margin: 0 auto;
//   max-width: 700px;
.publish-content::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
.field-item {
  padding-top: 32px;
  .field-title {
    .field-main-title {
      color: #1f2d3d;
      line-height: 22px;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .field-sub-title {
      margin-bottom: 4px;
      color: #91a1b7;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .field-content {
  }
  .inside-field-item {
    padding-top: 32px;
    .field-title {
      .field-main-title {
        color: #1f2d3d;
        line-height: 22px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .field-sub-title {
        margin-bottom: 4px;
        color: #91a1b7;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .field-content {
    }
  }
}
// }
// }

.required-field::before {
  display: inline-block;
  margin-right: 4px;
  color: #f5222d;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: "*";
}
</style>
