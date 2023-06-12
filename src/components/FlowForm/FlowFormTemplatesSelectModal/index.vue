<template>
  <div>
    <a-modal
      @cancel="visible=false"
      :bodyStyle="{  overflow: 'hidden',padding:'10px' }"
      :visible="visible"
      title="选择模板"
      :footer="null"
    >
      <a-input v-model="searchText" placeholder="按照名称过滤" @focus="showFilterList = true">
        <!-- <a-icon slot="addonAfter" type="close"></a-icon> -->
        <!-- <a-button slot="addonAfter">清除</a-button> -->
        <a-button
          @click="searchText='';showFilterList = false"
          size="small"
          type="link"
          icon="close-circle"
          slot="addonAfter"
        ></a-button>
      </a-input>

      <a-tabs
        v-show="!showFilterList"
        size="small"
        class="tab-wrapper"
        :default-active-key="defaultActiveKey"
        tab-position="left"
        @prevClick="() => {}"
        @nextClick="() => {}"
      >
        <a-tab-pane class="tab-pane" v-for="group in list" :key="group.groupId" :tab="ellipsis(group.groupName, 10)">
          <a-list size="small" item-layout="horizontal" :data-source="group.list">
            <a-list-item class="list-item" @click="handleSelect(item.id)" slot="renderItem" slot-scope="item, index">
              <a-button
                @click.prevent.stop="handlePreview(item.id,item.designName)"
                slot="actions"
                type="link"
                icon="eye"
                >预览模板</a-button
              >
              <a-list-item-meta style="font-size:12px">
                <span slot="description" style="font-size:12px">{{ellipsis(item.designDes, 10)}}</span>
                <span slot="title" :title="item.designName" style="white-space: nowrap;">{{
            ellipsis(item.designName, 8)
                }}</span>
                <ff-icon size="small" slot="avatar" :icon="item.designIcon" :bgc="item.designColor" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>

      <a-list
        class="filter-list"
        v-show="showFilterList"
        style="height: 400px;overflow-y:auto"
        size="small"
        item-layout="horizontal"
        :data-source="flatenArray"
      >
        <a-list-item class="list-item" @click="handleSelect(item.id)" slot="renderItem" slot-scope="item, index">
          <a-button @click.prevent.stop="handlePreview(item.id,item.designName)" slot="actions" type="link" icon="eye"
            >预览模板</a-button
          >
          <a-list-item-meta style="font-size:12px">
            <span slot="description" style="font-size:12px">{{ellipsis(item.designDes, 10)}}</span>
            <span slot="title" :title="item.designName" style="white-space: nowrap;">{{
            ellipsis(item.designName, 8)
            }}</span>
            <ff-icon size="small" slot="avatar" :icon="item.designIcon" :bgc="item.designColor" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <FormPreviewerModal :title="previewModalTitle" ref="FormPreviewerModal" :footer="null" @close="()=>{}" />
  </div>
</template>
<script>
import ffIcon from '@/components/FlowForm/ffIcon/index.vue';
import ellipsis from '@/utils/ellipsis';
import FormPreviewerModal from '@/packages/FormPreviewerModal/index.vue';
import {listAllTemplate} from "@/api/platform/platformOpenAPI.js"
import icons from '@/assets/flowform_icons/index.js';

export default {
  components: { ffIcon,FormPreviewerModal },
  computed: {
    flatenArray: function () {
      let _this = this
      const _flatenList = this.list
        .map((group) => group.list)
        .reduce((prev, curr) => {
          return prev.concat(curr);
        }, []);
      if(this.searchText.trim === ""){
        return _flatenList
      }else{
        return _flatenList.filter((item=>(item.designName.includes(_this.searchText) || item.designDes.includes(_this.searchText))))
      }

    },
  },
  data() {
    return {
      list: [],
      showFilterList: false,
      defaultActiveKey:"",
      searchText:"",
      visible: false,
      previewModalTitle:""
    };
  },

  methods: {
    ellipsis: (str, max) => ellipsis(str, max),
    handleSearchFilter({target:{value}}){
      console.log('[value]: ',value)

    },
    async show(){
      const res = await listAllTemplate()
      if(res.status === 200){
        this.list = res.data
        if(res.data.length > 0){
          this.defaultActiveKey = res.data[0].groupId
        }
        this.visible = true;
      }else{
        this.$message.error(res.msg)
      }
    },
    handleSelect(id){
      this.visible = false
      this.$emit("ok",id)
    },
    handlePreview(id,name){
      this.previewModalTitle = name
      this.$refs.FormPreviewerModal.show(id)
    }
    //   showModal() {
    //     this.visible = true;
    //   },
    //   handleOk(e) {
    //     console.log(e);
    //     this.visible = false;
    //   },
  },
};
</script>
<style scoped lang="scss">

.tab-wrapper{
  height: 400px;
  // overflow: auto;
  margin-top:10px;

  .tab-pane{
    ::v-deep .ant-list-items{
      height: 400px;
      overflow-y: auto;
    }
  }
}
.filter-list{
  margin-top:10px;
}
.list-item{
  cursor: pointer;
  margin-block: 10px;
  padding: 4px 12px;
  border: none;
  &:hover{
    background-color: rgb(247, 247, 247);
  }
}
::v-deep .ant-list-item-meta{
  align-items: center;
}
::v-deep .ant-list-item-action{
  margin: 0;
}
::v-deep .ant-list-item-meta-title{
    line-height: 14px;
  }
::v-deep .ant-list-item-meta-description{
    line-height: 14px;
    font-size: 12px;
}
</style>
