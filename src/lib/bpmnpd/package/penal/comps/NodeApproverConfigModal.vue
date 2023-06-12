<template>
  <div class="root">
    <TitleRow title="设定节点审批人" size="small" bold> </TitleRow>
    <a-radio-group v-model="approval.approvalType" :options="options" @change="emitChange" />
    <OrgSelectionModal
      v-model="approval.members"
      style="margin-top: 10px"
      :approvalType="approval.approvalType"
      v-if="approval.approvalType !== 'applicant' && approval.approvalType !== 'applicantLeader'"
    />
  </div>
</template>
<script>
import OrgSelectionModal from '@/lib/bpmnpd/package/penal/comps/OrgSelectionModal.vue';
import TitleRow from '@/components/base/TitleRow';
const options = [
  { label: '发起人自己', value: 'applicant' },
  { label: '发起人直属主管审批', value: 'applicantLeader' },
  { label: '指定人员', value: 'people' },
  { label: '指定角色', value: 'role' },
  { label: '指定部门', value: 'department' },
];
export default {
  name: 'NodeApproverConfigModal',
  components: { OrgSelectionModal, TitleRow },
  props: {
    customProp:{
      type:Object,
      default:()=>({
        approvalType:'applicant',
        members:[]
      })
    }
  },
  model: {
    prop: 'customProp',
    event: 'customEvent',
  },

  watch: {
    // 值绑定逻辑:
    // 父 => 子 :
    // 子 => 父 :
    customProp: {
      handler: function () {
        if (this.customProp && this.customProp.approvalType && this.customProp.members) {
          const {
            approvalType, members ,
          } = this.customProp;
          this.approval.approvalType = approvalType;
          this.approval.members = members;
        }
      },
      immediate: true,
      deep: true,
    },
    'approval.members': {
      handler: function () {
        this.emitChange();
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      approval: {
        approvalType: 'applicant',
        members: [],
      },
      options,
    };
  },
  methods: {
    emitChange() {
      this.$emit('customEvent', {
        approvalType: this.approval.approvalType,
        members:this.approval.members,
      });
    },
  },
};
</script>
<style scoped>
>>> .ant-radio-wrapper {
  line-height: 2;
}
</style>
