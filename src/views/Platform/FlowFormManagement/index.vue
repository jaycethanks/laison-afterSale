<template>
  <RootContainer>
    <!-- wrongPage from hanleQuery mixin -->
    <EmptyPage v-if="wrongPage" description="wrong page" />
    <Container v-else>
      <TitleRow title="已选择模板" bold>
        <a-button type="primary" icon="appstore" @click="$refs.FlowFormTemplatesSelectModal.show()">添加模板</a-button>
      </TitleRow>

      <section>
        <template v-if="list.length == 0">
          <a-empty
            description="数据为空"
            style="
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            "
          />
        </template>

        <template v-for="(item, index) in list">
          <TitleRow size="small" :key="item.groupId" :title="item.groupName" bold> </TitleRow>
          <div class="group-wrapper" :key="index">
            <template v-for="_item in item.list">
              <div class="process-item-wrapper" :key="_item.id">
                <div class="process-item">
                  <div class="process-item-content">
                    <!-- description -->
                    <a-tooltip placement="top" v-show="_item.designDes">
                      <template slot="title">
                        {{ _item.designDes }}
                      </template>
                      <ff-icon :icon="_item.designIcon" style="height: 40px; width: 40px" :bgc="_item.designColor" />
                    </a-tooltip>

                    <div class="process-item-label">
                      <p class="process-item-lable-title" :title="_item.designName">
                        {{ ellipsis(_item.designName, 12) }}
                      </p>

                      <p class="process-item-lable-subtitle">
                        {{ ellipsis(_item.designDes, 18) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- settings -->
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                    <a-icon type="ellipsis" style="font-size: 20px" />
                  </a>
                  <!-- <a-button
                    type="link"
                    icon="ellipsis"
                    size="small"

                    @click="(e) => e.preventDefault()"
                  ></a-button> -->
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a-button
                        type="link"
                        icon="eye"
                        size="small"
                        title="流程设计"
                        @click="formPreviewModalTitle=_item.designName;$refs.FormPreviewerModal.show(_item.id)"
                        >预览该模板表单</a-button
                      >
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a-button
                        type="link"
                        icon="edit"
                        size="small"
                        title="流程设计"
                        @click="
                          handleEdit(
                            _item.id,
                            FlowFormDesignerType.PLATFORM_NEW
                          )
                        "
                        >设计发布该模板</a-button
                      >
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="2">
                      <a-button
                        style="color: #ff4d4f"
                        type="link"
                        icon="delete"
                        size="small"
                        @click="
                          handleDeleteTemplate(_item.id, _item.designName)
                        "
                        >删除该模板</a-button
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </template>
          </div>
        </template>
      </section>

      <!-- 已发布流程 Start-->
      <TitleRow title="已发布流程" bold> </TitleRow>

      <section>
        <template v-if="enabled_list.length == 0">
          <a-empty
            description="数据为空"
            style="
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            "
          />
        </template>

        <template v-for="(item, index) in enabled_list">
          <TitleRow size="small" :key="item.groupId" :title="item.groupName" bold> </TitleRow>
          <div class="group-wrapper" :key="index">
            <template v-for="_item in item.list">
              <div class="process-item-wrapper" :key="_item.id">
                <div class="process-item">
                  <div class="process-item-content">
                    <!-- description -->
                    <a-tooltip placement="top">
                      <template slot="title">
                        {{ _item.designDes }}
                      </template>
                      <ff-icon :icon="_item.designIcon" style="height: 40px; width: 40px" :bgc="_item.designColor" />
                    </a-tooltip>

                    <div class="process-item-label">
                      <p class="process-item-lable-title" :title="_item.designName">
                        {{ ellipsis(_item.designName, 12) }}
                      </p>

                      <p class="process-item-lable-subtitle">
                        {{ ellipsis(_item.designDes, 15) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- settings -->
                <a-space direction="vertical" style="align-items: flex-end">
                  <a-switch
                    :loading="switchLoading"
                    style="margin-left: 6px"
                    v-model="_item.enable"
                    @click="handleEnableChange(_item.id, _item.enable)"
                    size="small"
                  ></a-switch>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                      <a-icon type="ellipsis" style="font-size: 20px" />
                    </a>
                    <!-- <a-button
                    type="link"
                    icon="ellipsis"
                    size="small"

                    @click="(e) => e.preventDefault()"
                  ></a-button> -->

                    <a-menu slot="overlay">
                      <a-menu-item key="2">
                        <a-button
                          type="link"
                          icon="edit"
                          size="small"
                          title="流程设计"
                          @click="
                            handleEdit(
                              _item.id,
                              FlowFormDesignerType.PLATFORM_EDIT
                            )
                          "
                          >设计发布</a-button
                        >
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="3">
                        <a-button
                          style="color: #ff4d4f"
                          type="link"
                          icon="delete"
                          size="small"
                          @click="handleDelete(_item.id, _item.designName)"
                          >删除该流程</a-button
                        >
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </a-space>
              </div>
            </template>
          </div>
        </template>
      </section>
      <FormPreviewerModal :title="formPreviewModalTitle" ref="FormPreviewerModal" :footer="null" />
      <FlowFormTemplatesSelectModal ref="FlowFormTemplatesSelectModal" @ok="handleSelect" />
    </Container>
  </RootContainer>
</template>
<script>
import ellipsis from '@/utils/ellipsis.js';
import API from '@/api/ErpConfig.js';
import FormPreviewerModal from '@/packages/FormPreviewerModal/index.vue';
import ffIcon from '@/components/FlowForm/ffIcon/index.vue';
import FlowFormTemplatesSelectModal from '@/components/FlowForm/FlowFormTemplatesSelectModal/index.vue';
import _mock from './_mock';
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';
import Container from '@/components/base/Container/index.vue';
import TitleRow from '@/components/base/TitleRow/index.vue';
import RootContainer from '@/components/base/RootContainer/index.vue';
import { listTemplateAndPublish, addTemplate, operateProcessForm, deleteTemplate } from "@/api/platform/platformOpenAPI.js"
import handleQuery from "@/mixins/handleQuery.js"
import EmptyPage from '@/components/FlowForm/EmptyPage/index.vue';

export default {
  components: { ffIcon, FormPreviewerModal, FlowFormTemplatesSelectModal, Container, TitleRow, RootContainer, EmptyPage },
  mixins: [handleQuery],
  data() {
    return {
      FlowFormDesignerType,
      list: [],
      enabled_list: [],
      switchLoading: false,
      formPreviewModalTitle:'',
      query: {//查看handleQuery的使用文档 src/mixins/handleQuery.md
        uniTenantId: {
          type: String
        },
        bizToken: {
          type: String
        }
      }
    };
  },
  created() {
    this.loadList();
  },
  methods: {

    ellipsis: (str, max) => ellipsis(str, max),
    async handleSelect(id) {
      const res = await addTemplate({ id, uniTenantId: this.computedQuery.uniTenantId })
      if (res.status === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      this.loadList();
    },
    async loadList() {
      // let res = await API.processFormList();
      // if (res.code === 0) {
      //   this.list = res.data;
      // }
      const res = await listTemplateAndPublish({ uniTenantId: this.computedQuery.uniTenantId })
      if (res.status === 200) {
        if ('templateList' in res.data) {
          this.list = res.data.templateList
        }else{
          this.list = []
        }
        if ('publishList' in res.data) {
          this.enabled_list = res.data.publishList
        }else{
          this.enabled_list = []
        }
      }

      // this.list = mock.data;
      // // TODO: 数据中需要有enable字段
      // _mock.data.forEach((item) => {
      //   item.enable = true;
      // });
      // this.enabled_list = _mock.data;
    },

    async handleDeleteTemplate(id, name) {
      let _this = this
      this.$confirm({
        title: `确定要删除 [${name}] 模板吗?`,
        content: '删除模板不会影响到已发布的流程，你可以再次添加新的模板！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const res = await deleteTemplate({ id }, _this.computedQuery.uniTenantId)
          if (res.status === 200) {
            _this.$message.success(res.msg)
          } else {
            _this.$message.error(res.msg)
          }
          _this.loadList();


        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    async handleDelete(id, name) {
      let _this = this
      this.$confirm({
        title: `确定要删除 [${name}] 流程吗?`,
        content: '删除流程不会影响到已在执行的流程， 但是后续将不再能够发起',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const res = await operateProcessForm({ id, deleteStatus: true }, _this.computedQuery.uniTenantId)
          if (res.status === 200) {
            _this.$message.success(res.msg)
          } else {
            _this.$message.error(res.msg)
          }
          _this.loadList();

        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    handleEdit(id, type) {
      this.$router.push({
        path: '/platform/flowformDesigner',
        query: {
          type: type,
          templateId: id,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken
        }
      });
    },
    async handleEnableChange(id, enable) {
      // id,deleteStatus,enableStatus
      this.switchLoading = true
      const res = await operateProcessForm({ id, enableStatus: enable }, this.computedQuery.uniTenantId)
      if (res.status === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      this.switchLoading = false


    }
  },
  mounted() {
    this.loadList();
  },
};
</script>
<style scoped lang="scss">
section {
  // border: 1px solid green;
  // padding: 20px;
  background-color: #fff;
  padding: 2em;
  margin-bottom: 46px;
  // display: flex;
  // gap: 20px;
  // flex-wrap: wrap;
  .group-wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  .process-item-wrapper {
    flex-shrink: 0;
    background: #fff;
    border-radius: 5px;
    position: relative;
    // margin: 10px;
    border: 1px solid #f2f2f2;

    // box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
    width: 296px;
    // height: 100px;
    padding: 22px 30px;
    // border: 1px solid red;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &:hover {
      border: 1px solid #ececec;
      box-shadow: 0 4px 10px 0 #515a561f;
    }
    .process-item {
      // border: 1px solid black;
      display: flex;
      align-items: center;
      gap: 10px;
      .process-item-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        .process-item-label {
          margin-right: 16px;
        }

        p {
          margin: 0;
        }
        .process-item-lable-title {
          color: #2f2f2f;
          font-size: 14px;
          font-weight: bold;
          line-height: 22px;
          margin-bottom: 4px;
        }
        .process-item-lable-subtitle {
          font-size: 12px;
          color: #999;
          line-height: 20px;
        }
      }
    }
  }
  }

}
</style>
