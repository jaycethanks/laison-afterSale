<template>
  <RootContainer>
    <a-form layout="inline" @keyup.enter.native="handleQuery" @submit.prevent="handleQuery">
      <a-row :gutter="24" style="margin: 0">
        <a-form-item label="工单编号">
          <a-input v-model="pageInfo.condition.name"></a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            style="min-width:100px"
            v-model="pageInfo.condition.status"
            :allowClear="true"
            :options="statusOptions"
          >
          </a-select>
        </a-form-item>
      </a-row>

      <a-row type="flex" justify="space-between" :gutter="24" style="margin: 0">
        <a-col>
          <a-form-item>
            <a-button type="primary" html-type="submit" icon="search">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="resetSearch" icon="reload">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-card :bordered="false" style="margin-top:1rem">
      <a-table
        size="small"
        :loading="pageInfo.loading"
        @change="handleTableChange"
        :columns="columns"
        :data-source="dataSource"
        rowKey="id"
        :pagination="pageInfo.pagination"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="result" slot-scope="text">
          <ff-status :statusCode="text" isTag />
        </span>

        <span slot="status" slot-scope="text">
          <ff-status :statusCode="text" />
        </span>

        <template slot="action" slot-scope="text, record">
          <a-space>
            <template v-if="record.status !== 0">
              <a @click="handleCheckDetail(record)">查看</a>
            </template>

            <!-- <a-divider type="vertical" /> -->
            <template v-if="record.status == 0">
              <a @click="handleRowEdit(record)">编辑</a>
              <!-- <a-divider type="vertical" /> -->
              <a @click="$refs.modal.show()">提交</a>
            </template>
            <a-popconfirm placement="rightBottom" ok-text="Yes" cancel-text="No" @confirm="handleDelete(record)">
              <template slot="title"> 确定删除？ </template>
              <a-button style="color: #ff4d4f" type="link">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <submitInfoModal :title="modalTitle" ref="modal" @ok="handleSubmitInfoOk" />

    <!-- <Container> -->
  </RootContainer>
</template>
<script>
import Container from "@/components/base/Container"
import RootContainer from "@/components/base/RootContainer"
import searchTableMixin from '@/mixins/searchTableMixin.js';
import { findPage, saveOrUpdate } from '@/api/system/platformManage.js';
import handleQuery from '@/mixins/handleQuery.js';
import PreviewFormType from "@/constants/PreviewFormType.js"
import { myTodo } from "@/api/platform/processOpenAPI.js"
import ffStatus from "@/components/FlowForm/ffStatus/index.vue"
import submitInfoModal from "@/components/FlowForm/SubmitInfoModal/submitInfoModal.vue"
import { deleteById } from "@/api/platform/businessOpenAPI.js"
const statusOptions = [
  {label:'草稿',value:0},
  {label:'待审批',value:1},
  {label:'处理结束',value:2},
  {label:'已撤回',value:3},
  {label:'审批中',value:4},
  {label:'驳回',value:5},
  {label:'变更',value:6},
]



const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '工单编号',
    dataIndex: 'businessId',
    key: 'businessId',
  },
  {
    title: '工单类型',
    dataIndex: 'orderType',
    key: 'orderType',
  },


  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width:100,
    scopedSlots: { customRender: 'status' },

  },
  // {
  //   title: '结果',
  //   dataIndex: 'result',
  //   key: 'result',
  //   width:100,
  //   scopedSlots: { customRender: 'result' },

  //   ellipsis: true,
  // },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    key: 'updateBy',
  },
    {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '委托人',
    dataIndex: 'delegator',
    key: 'delegator',
  },

  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];


export default {
  name: "myTodo",
  mixins: [searchTableMixin, handleQuery],
  components: {
    Container,
    RootContainer,
    ffStatus,
    submitInfoModal
  },
  data() {
    return {
      columns,
      statusOptions,
      findPage: myTodo,
      modalTitle: '发起流程',
      query: {
        // 查看handleQuery的使用文档 src/mixins/handleQuery.md
        // query 的初始化全部值，都必须在这里指定， 如果需要指明那一个query字段是必须的，
        // 那么，需要将该字段初始化为一对象,例如 type: {value: 初始化值}
        uniTenantId: {
          type: String
        },
        bizToken: {
          type: String
        },
      },
    };
  },
  mounted() {
    this.loadData({
      uniTenantId: this.computedQuery.uniTenantId,
      bizToken: this.computedQuery.bizToken,
    });
  },
  methods: {
    handleQuery() {
      this.loadData({
        uniTenantId: this.computedQuery.uniTenantId,
        bizToken: this.computedQuery.bizToken,
      });
    },
    handleCheckDetail({businessId,publishId, procDefId}){
        this.$router.push({
        path: '/platform/formPreviewer',
        query: {
          type: PreviewFormType.VIEW,
          publishId,
          procDefId,
          businessId,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
        }
      });
    },
    handleRowEdit({businessId,publishId, procDefId}){
        this.$router.push({
        path: '/platform/formPreviewer',
        query: {
          type: PreviewFormType.APPLY,
          publishId,
          procDefId,
          businessId,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
        }
      });
    },
    async handleDelete(record){
      const {businessId} = record
      const res = await deleteById({
          businessId,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
      })
      if(res.status === 200){
        this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
      this.loadData({
        uniTenantId: this.computedQuery.uniTenantId,
        bizToken: this.computedQuery.bizToken,
      });
    },
    handleSelect({ publishId, procDefId }) {
      this.$router.push({
        path: '/platform/formPreviewer',
        query: {
          type: PreviewFormType.APPLY,
          publishId,
          procDefId,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
        }
      });
    },


    async handleOk(formFieldsValue, isEdit) {
      let fn = saveOrUpdate;
      const res = await fn(formFieldsValue);
      if (res.status === 200) {
        this.$message.success('添加成功');
        this.$refs.modal.hide();
      } else {
        this.$message.warn(res.msg);
      }
      this.loadData({
        uniTenantId: this.computedQuery.uniTenantId,
        bizToken: this.computedQuery.bizToken,
      });

    },

    async handleSubmitInfoOk(submitInfo){
      // const formData = await this.getFormData()
      // const res = await submit({
      //   businessId:this.computedQuery.businessId || '',// 业务ID，从草稿提交时需要携带
      //   formData,
      //   curTaskId:this.computedQuery.curTaskId || '',// 审批时需要携带
      //   uniTenantId: this.computedQuery.uniTenantId,
      //   publishId:this.computedQuery.publishId,
      //   bizToken: this.computedQuery.bizToken,
      //   submitInfo
      // })
      // console.log('[res]: ',res)
    },
  },
};
</script>
<style></style>
