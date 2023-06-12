<template>
  <Container>
    <a-table
      size="small"
      :columns="group_columns"
      :expandRowByClick="true"
      :data-source="list"
      rowKey="groupId"
      :pagination="false"
    >
      <template slot="groupName" slot-scope="text, group">
        <a-space>
          <a-input
            size="small"
            :style="{ border: group.notEditable ? 'none' : '', useSelect: 'none' }"
            :disabled="group.notEditable"
            @click.prevent.stop
            @change.stop.prevent
            v-model="group.groupName"
          />
          <a-button
            v-show="!group.notEditable"
            icon="check"
            type="link"
            :loading="group.ifloadingCheck"
            @click.prevent.stop="handleGroupNameEdit(group)"
          ></a-button>
        </a-space>
      </template>
      <!-- <a slot="action" slot-scope="text, group"> -->
      <a-space v-if="false" slot="action" slot-scope="text, group">
        <a-button
          size="small"
          v-show="group.notEditable"
          icon="edit"
          type="link"
          @click.prevent.stop="group.notEditable = false"
          >重命名</a-button
        >
      </a-space>
      <!-- </a> -->
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0;">
        <a-table
          style="background-color:#fff"
          :columns="columns"
          :data-source="record.list"
          rowKey="id"
          size="small"
          :pagination="false"
        >
          <template slot="id" slot-scope="text, record">
            <ffIcon size="small" :bgc="record.designColor" :icon="record.designIcon" />
            <!-- <div class="icon-box" :style="{ backgroundColor: record.designColor }">
              <img :src="getIcon(record.designIcon)" alt="" />
            </div> -->
          </template>
          <a slot="enable" slot-scope="text, record">
            <a-switch
              :loading="loadingSwitch"
              @change="(e) => onSwitchChange(e, record.id)"
              :checked="record.enable"
              size="small"
            />
          </a>
          <a slot="action" slot-scope="text, record">
            <a-space>
              <a-button type="link" icon="edit" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-popconfirm placement="rightBottom" ok-text="Yes" cancel-text="No" @confirm="handleDelete(record.id)">
                <template slot="title"> 确定删除？ </template>
                <a-button style="color: #ff4d4f" type="link" icon="delete" size="small">删除</a-button>
              </a-popconfirm>
            </a-space>
          </a>
        </a-table>
      </p>
    </a-table>
  </Container>
</template>
<script>
import EmptyPage from '@/components/FlowForm/EmptyPage/index.vue';
import { listPlatformGroup, update, deleteById, listDesignGroup } from '@/api/system/processFormTemplate.js';
import icons from '@/assets/flowform_icons/index.js';
import ffIcon from "@/components/FlowForm/ffIcon/index.vue"
import ellipsis from '@/utils/ellipsis';
import FlowFormDesignerType from "@/constants/FlowFormDesignerType.js"
import Container  from "@/components/base/Container/index.vue"
const columns = [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: 180,

    scopedSlots: { customRender: 'id' },
  },
  {
    title: '模板名称',
    dataIndex: 'designName',
    key: 'designName',

    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'designDes',
    key: 'designDes',
    ellipsis: true,
  },

  {
    title: '启用状态',
    dataIndex: 'enable',
    key: 'enable',
    scopedSlots: { customRender: 'enable' },
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
];
const group_columns = [
  // {
  //   title: '',
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 180,
  // },
  {
    title: '分组名称',
    dataIndex: 'groupName',
    key: 'groupName',
    scopedSlots: { customRender: 'groupName' },

    // width: 200,
  },
    {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]

export default {
  name:"FlowFormTemplatesList",
  components: { EmptyPage,ffIcon,Container },
  data() {
    return {

      expandedRowKeys:[],
      columns,
      group_columns,
      list: [],
      icons,
      loadingSwitch: false,
      customStyle: 'background-color:#fff;border-bottom:1px solid #e5e5e5;overflow: hidden;padding:0',
      drawer: {
        visible: false,
      },
    };
  },
  computed: {
    // allSelectedRowKeys: function () {
    //   return this.list
    //     .map((group) => group.selectedRowKeys)
    //     .reduce((prev, curr) => {
    //       return prev.concat(curr);
    //     }, []);
    // },
    // filteredSelectedRow: function () {
    //   return this.list
    //     .map((item) => item.formTemplates)
    //     .reduce((prev, curr) => {
    //       return prev.concat(curr);
    //     }, [])
    //     .filter((formTemplate) => this.allSelectedRowKeys.includes(formTemplate.designKey));
    // },
  },
  methods: {
    ellipsis: (str, max) => ellipsis(str, max),
    // handleRemoveListItem(designKey) {
    //   this.list.forEach((group) => {
    //     const index = group.selectedRowKeys.findIndex((key) => key === designKey);
    //     if (index !== -1) {
    //       group.selectedRowKeys.splice(index, 1);
    //     }
    //   });
    // },
    onDrawerClose() {
      this.drawer.visible = false;
    },

    async loadList() {
      const res = await listPlatformGroup();
      if (res.status === 200) {
        res.data.forEach((item) => {
          // !!notEditable & selectedRowKeys 仅前端运行时有效，提交后台之前，数据中的这两个字段应该移除
          item.notEditable = true;
          item.ifloadingCheck = false

        });
        this.list = res.data;
      }
    },
    handleGroupNameEdit(group) {
      // TODO：  后端需要新增接口 handle groupName 分组名称的修改
      const { groupName, groupId } = group;
      group.ifloadingCheck = true,
      setTimeout(() => {
        group.notEditable = true;
        group.ifloadingCheck = false;
      }, 2000);
      console.log(groupName, groupId);
    },
    getIcon(iconName) {
      let iconObj = this.icons.find((it) => it.name === iconName);
      if (iconName && iconObj && iconObj.file) {
        return iconObj.file;
      }
      return null;
    },
    onSwitchChange(status, id) {
      this.changeStatus(status, id);
    },
    async changeStatus(status, id) {
      this.loadingSwitch = true;
      let res = await update({ enable: status, id: id });
      if (res.status === 200) {
        this.$message.success('修改状态成功');
      } else {
        this.$message.error('修改状态失败!');
      }
      this.loadList();
      this.loadingSwitch = false;
    },
    async handleDelete(id) {
      let res = await deleteById(id);
      if (res.status === 200) {
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
      this.loadList();
    },
    handleEdit(record) {
      this.$router.push({
        path: '/system/flowformDesign/flowformDesigner',
        query: {
          type: FlowFormDesignerType.SYSTEM_EDIT,
          templateId: record.id,
        }
      });
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>
<style scoped lang="scss">
// ::v-deep .ant-collapse {
//   overflow-y: auto;
// }

// ::v-deep .ant-collapse-header {
//   padding: 0;
// }
::v-deep .ant-table-small{
border: none;
}
::v-deep .ant-input[disabled] {
  color: unset;
  width: auto;
  background-color: unset;
  cursor: unset;
  opacity: unset;
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
// .process-list-root {
//   padding-top: 10px;
//   display: flex;
//   justify-content: center;
//   position: relative;
//   user-select: none;
//   // overflow-y: scroll;
//   // .head-operation-wrapper {
//   //   overflow-y: scroll;
//   //   width: 30%;
//   //   min-width: 300px;
//   //   flex: 1;
//   //   padding: 4px 12px;
//   //   position: relative;
//   // }
//   .collapse-wrapper {
//     height: 100%;
//     overflow-y: scroll;
//     .collapse-content {
//       // border: 1px solid red;
//       // overflow-y: scroll;
//     }

//     flex: 3;
//     // border: 1px solid red !important;
//   }

//   .a-drawer-wapper {
//   }
//   .show-details-wrap {
//     font-size: 14px;
//     cursor: pointer;
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     height: 30px;
//     width: 100%;
//     background-color: #f8f8f8;
//     display: flex;
//     gap: 20px;
//     justify-content: center;
//     align-items: center;
//   }
//   &::-webkit-scrollbar {
//     width: 2px;
//     height: 6px;
//   }

//   .icon-box {
//     width: 36px;
//     height: 36px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 5px;
//     position: relative;
//     img {
//       width: 24px;
//     }
//   }
// }
</style>
