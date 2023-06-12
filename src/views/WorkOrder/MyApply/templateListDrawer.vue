<template>
  <a-drawer
    width="400"
    title="选择流程"
    placement="right"
    :closable="false"
    :visible="visible"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <template>
      <section v-for="group in list" :key="group.groupId">
        <TitleRow size="small" :title="group.groupName" bold />
        <a-list item-layout="horizontal" :data-source="group.list">
          <a-list-item
            @click="handleFlowSelect(item.id,item.procDefId)"
            class="list-item"
            slot="renderItem"
            slot-scope="item, index"
          >
            <a-list-item-meta :description="item.designDes">
              <p style="margin:0" slot="title">{{item.designName}}</p>
              <!-- <TitleRow slot="title" size="small" :title="item.designName" bold /> -->
              <ffIcon slot="avatar" :bgc="item.designColor" :icon="item.designIcon" size="small" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </section>
    </template>
  </a-drawer>
</template>
<script>
import { myApplyList } from "@/api/platform/processOpenAPI.js"
import ffIcon from "@/components/FlowForm/ffIcon/index.vue"
import TitleRow from "@/components/base/TitleRow/index.vue"
import handleQuery from '@/mixins/handleQuery.js';

export default {
  name: "TemplateListDrawer",
  mixins: [handleQuery],

  components: {
    ffIcon, TitleRow
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      list: [],
      query: {
        // 查看handleQuery的使用文档 src/mixins/handleQuery.md
        // query 的初始化全部值，都必须在这里指定， 如果需要指明那一个query字段是必须的，
        // 那么，需要将该字段初始化为一对象,例如 type: {value: 初始化值}
        uniTenantId: {
          type:String
        },
        bizToken: {
          type:String
        },
      },
    }
  },
  methods: {
    afterVisibleChange(val) {
      if (val === true) {
        this.loadData()
      }
    },
    onClose() {
      this.$emit("close")
    },
    async loadData() {
      const res = await myApplyList({
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
      })
      if(res.status === 200){
        this.list = res.data
      }else{
        this.$message.error(res.msg)
      }
    },
    handleFlowSelect(publishId,procDefId){
      this.$emit("close")
      this.$emit("select",{publishId,procDefId})
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .ant-list-item{
  padding: 6px 0;
  border:none
}
::v-deep .ant-list-item-meta{
  align-items: center;
}
::v-deep .ant-list-item-meta-title{
    line-height: 14px;
  }
::v-deep .ant-list-item-meta-description{
    line-height: 14px;
    font-size: 12px;
}
.list-item{
  cursor: pointer;
  padding: 8px 12px;
  &:hover{
    background-color: rgb(247, 247, 247);
  }
}
section{
  margin-bottom: 2em;
}
</style>
