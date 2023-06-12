<template>
  <div class="root">
    <!-- <Container> -->
    <a-form layout="inline" @keyup.enter.native="handleQuery" @submit.prevent="handleQuery">
      <a-row :gutter="24" style="margin: 0">
        <a-form-item label="平台名称">
          <a-input v-model="pageInfo.condition.name"></a-input>
        </a-form-item>
        <a-form-item label="租户id">
          <a-input v-model="pageInfo.condition.bizTenantId"></a-input>
        </a-form-item>
        <!-- <a-col :md="6" :sm="8"> </a-col>
        <a-col :md="6" :sm="8">
          <span style="float: left; overflow: hidden" class="table-page-search-submitButtons"> </span>
        </a-col> -->
        <a-form-item>
          <a-button type="primary" html-type="submit" icon="search">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="resetSearch" icon="reload">重置</a-button>
        </a-form-item>
      </a-row>

      <a-row :gutter="24" style="margin: 0">
        <a-form-item label="">
          <a-button
            type="primary"
            @click="
              modalTitle = '新增';
              $refs.modal.show();
            "
            icon="plus"
            >新增
          </a-button>
        </a-form-item>
      </a-row>
    </a-form>
    <a-table
      :loading="pageInfo.loading"
      @change="handleTableChange"
      :columns="columns"
      :data-source="dataSource"
      rowKey="id"
      :pagination="pageInfo.pagination"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="delFlag" slot-scope="text">
        <a-tag :color="text ? 'red' : 'green'">{{ text ? '已删除' : '正常' }} </a-tag>
      </a>

      <template slot="action" slot-scope="text, record">
        <a-space>
          <a
            slot="action"
            @click="
              modalTitle = '编辑 - ' + record.name;
              $refs.modal.show(record);
            "
            >编辑</a
          >
        </a-space>
      </template>
    </a-table>
    <platformRegistrationModal :title="modalTitle" ref="modal" @ok="handleOk" submitLoading />
    <!-- </Container> -->
  </div>
</template>
<script>
import platformRegistrationModal from '@/views/System/PlatformManagement/PlatformRegistration/platformRegistrationModal.vue';
import searchTableMixin from '@/mixins/searchTableMixin.js';
import { findPage, saveOrUpdate } from '@/api/system/platformManage.js';
import Container from "@/components/base/Container"
const columns = [
  {
    title: '平台id',
    dataIndex: 'uniTenantId',
    key: 'uniTenantId',
  },
  {
    title: '平台名称',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '租户ID',
    dataIndex: 'bizTenantId',
    key: 'bizTenantId',
  },
  {
    title: 'baseUrl',
    dataIndex: 'baseUrl',
    key: 'baseUrl',
  },

  {
    title: '时区',
    dataIndex: 'timezone',
    key: 'timezone',
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'delFlag',
    key: 'delFlag',
    scopedSlots: { customRender: 'delFlag' },

    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: 'PlatformRegistration',
  mixins: [searchTableMixin],
  components: {
    platformRegistrationModal,
    Container
  },
  data() {
    return {
      columns,
      findPage,
      modalTitle: '新增',
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    handleQuery() {
      this.loadData();
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
      this.loadData();
    },
  },
};
</script>
<style></style>
