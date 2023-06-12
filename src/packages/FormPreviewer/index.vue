<template>
  <!-- <div class="form-previewer-root"> -->
  <RootContainer noLogo :loading="pageLoading">
    <Container>
      <EmptyPage
        v-if="wrongPage || formInfo == null"
        :description="wrongPage ? 'Wrong Page!' : 'Error When Parse Form!'"
      />

      <!-- @jayce -->
      <div id="operation-row">
        <a-button type="link" icon="rollback" @click="$router.go(-1)">返回</a-button>
        <a-tooltip
          title="打印预览"
          v-if="
            formInfo &&
            formInfo.config != undefined &&
            formInfo.config.enablePrint
          "
        >
          <a-button type="link" v-print="'#print-target-id'">
            <a-icon type="printer" style="font-size: 20px" />
          </a-button>
        </a-tooltip>
      </div>

      <main class="form-preview-content-area">
        <a-row type="flex" justify="center">
          <a-col :xs="24" :xl="18">
            <section
              class="form"
              id="print-target-id"
              :class="{
                'enable-print-simple-style':
                  formInfo &&
                  formInfo.config != undefined &&
                  formInfo.config.enablePrintSimpleStyle,
              }"
            >
              <k-form-build
                v-if="!wrongPage && formInfo"
                :style="computedQuery.style"
                class="form-previewer"
                @mount="handleMount"
                :value="formInfo"
                ref="kfb"
                :disabled="this.computedQuery.type === PreviewFormType.VIEW"
              />
            </section>
          </a-col>
          <a-col :xs="24" :xl="6" v-if="operations != null">
            <aside class="timeline">
              <TimeLine :operations="operations" />
            </aside>
          </a-col>
        </a-row>
      </main>
    </Container>

    <footer v-if="ifShowFooter" id="operation-footer-row">
      <a-space>
        <a-button type="primary" @click="handleSubmit">
          <span v-if="computedQuery.type === PreviewFormType.APPLY">
            <SvgIconSend style="height: 14px" /> 提交并发起</span
          >
          <span v-if="computedQuery.type === PreviewFormType.TODO">
            <a-icon type="check"></a-icon>
            审批通过</span
          >
          <span v-if="computedQuery.type === PreviewFormType.ARCHIVE"
            ><SvgIconArchive style="height: 14px" /> 归档</span
          >
        </a-button>
        <a-button v-if="computedQuery.type === PreviewFormType.APPLY" @click="handleSaveAsDraft">
          <span> <SvgIconSaveDraft style="height: 14px" /> 保存为草稿</span>
        </a-button>
        <a-button type="primary" v-if="computedQuery.type === PreviewFormType.TODO">
          <span>
            <a-icon type="enter" rotate="180"></a-icon>
            委托</span
          >
        </a-button>
        <a-button type="danger" v-if="computedQuery.type === PreviewFormType.TODO">
          <span>
            <a-icon type="close"></a-icon>
            驳回</span
          >
        </a-button>
      </a-space>
    </footer>

    <submitInfoModal :title="modalTitle" ref="modal" @ok="handleSubmitInfoOk" />
    <!-- </div> -->
  </RootContainer>
</template>

<script>
import mock from "./mock"
import KFormBuild from '@/lib/kform/KFormBuild/index';
import JModal from '@/components/jeecg/JModal/index.vue';
import { parseFormWithNodeConfig } from '@/utils/kformRelatedUtils.js';
//import '@/assets/SourceHanSansCN-Regular-normal'
import EmptyPage from '@/components/FlowForm/EmptyPage/index.vue';
import PreviewFormType from '@/constants/PreviewFormType.js';
import handleQuery from '@/mixins/handleQuery.js';
import SvgIconSend from '@/assets/svgIcon/SvgIconSend.vue';
import SvgIconSaveDraft from '@/assets/svgIcon/SvgIconSaveDraft.vue';
import SvgIconArchive from '@/assets/svgIcon/SvgIconArchive.vue';
import { queryProcessNodeForm } from "@/api/platform/platformOpenAPI.js";
import { create, submit, edit } from "@/api/platform/businessOpenAPI.js"
import RootContainer from "@/components/base/RootContainer/index.vue";
import submitInfoModal from "@/components/FlowForm/SubmitInfoModal/submitInfoModal.vue"
import Container from "@/components/base/Container/index.vue";
import TimeLine from "./TimeLine.vue"
export default {
  name: 'FormPreviewer',
  mixins: [handleQuery],
  components: {
    KFormBuild,
    JModal,
    EmptyPage,
    SvgIconSend,
    SvgIconSaveDraft,
    SvgIconArchive,
    TimeLine,
    RootContainer,
    Container,
    submitInfoModal
  },
  data() {
    return {
      PreviewFormType,
      pageLoading: false,
      formInfo: null, //表单定义
      formData: null, // 表单数据
      formdataObj: {}, //表单数据
      isFullScreen: false,
      operations: null,
      kfb: {
        disabled: false,
      },
      fn: {
        query: null
      },
      query: {
        // query 的初始化全部值，都必须在这里指定， 如果需要指明那一个query字段是必须的，
        // 那么，需要将该字段初始化为一对象,例如 type: {value: 初始化值}
        maxWidth: 'auto',
        minWidth: 'auto',
        type: {
          type: Number,
        },
        uniTenantId: {
          type: String
        },
        bizToken: {
          type: String
        },
        publishId: {
          type: String
        },
        procDefId: {//流程定义ID
          type: String
        },
        lang: '',
        businessId: '',
        nodeId: ''
      },
    };
  },
  computed: {
    ifShowFooter:function(){
      return !this.wrongPage && !(this.computedQuery.type === PreviewFormType.COPY) && !(this.computedQuery.type === PreviewFormType.VIEW)
    },
    modalTitle: function () {
      const titles = {
        [PreviewFormType.APPLY]: "发起流程",
        [PreviewFormType.TODO]: "流程审批",
      };
      return titles[this.computedQuery.type] || "未定义modal title 值！"
    }
  },
  watch: {
    formData: {
      handler: function () {
        if (!this.formData) return;
        this.setFormData()
      }
    }
  },
  created() {
    this.pageLoading = true
    this.handleType(this.computedQuery.type);
    this.loadOperations()
  },
  methods: {
    async loadOperations() {
      this.operations = mock
    },
    closeModal: function () {
      this.$emit('close');
    },
    async setFormData() {
      // this.formData 数据在 created 阶段拉取， 在watch 中监听有值以后触发
      this.formData = typeof this.formData === 'string' ? JSON.parse(this.formData) : this.formData;
      this.$nextTick(async () => {
        const result = await this.$refs.kfb.setData(this.formData)
      })

    },
    async loadflowformData() {
      try{
      const res = await queryProcessNodeForm({
        businessId: this.computedQuery.businessId,
        publishId: this.computedQuery.publishId,
        procDefId: this.computedQuery.procDefId,
        nodeType: this.computedQuery.type,
        nodeId: this.computedQuery.nodeId || ''
      })
      if (res.status === 200) {
        // 真正展示的时候,需要先知道当前审批结点的类型, 是任务审批结点, 还是抄送结点,还是查看结点, 不同的结点配置对字段的控制不同, 所以需要将formInfo 按照规则洗一遍
        const { formInfo, formConfigs, formData } = res.data
        this.formData = formData;
        const formWithNodeConfig = {
          formInfo,
          formConfigs,
        }
        const parsedFormInfo = parseFormWithNodeConfig(formWithNodeConfig, this.computedQuery.lang);
        this.formInfo = parsedFormInfo;
      } else {
        this.$message.error(res.msg)
      }
      }finally{
      this.pageLoading = false

      }




    },

    handleType(type) {
      switch (type) {
        case PreviewFormType.APPLY:
          // query 为拉取发起结点配置接口
          // this.fn.query = queryApplyNodeConfig
          break;
        case PreviewFormType.TODO:
          // query 为拉取审批结点配置接口
          // this.fn.query = queryApproveNodeConfig
          break;
        case PreviewFormType.COPY:
          // this.fn.query = queryCopyNodeConfig
          this.kfb.disabled = true;
          break;
        case PreviewFormType.ARCHIVE:

          break;
        default:
          break;
      }
      this.loadflowformData()

    },

    async handleOk() {
      // 验证整表表单
      if (this.okBtnDisabled) {
        this.$message.warning(this.$t('order.submitapp'));
        return;
      }
      try {
        await this.$refs.kfb.form.validateFields();
      } catch (e) {
        let errmsg = e.errors[Object.keys(e.errors)[0]].errors[0].message;
        this.$message.error(errmsg);
        return;
      }
      // div#LaisonStockList
      if (this.$refs.kfb.form.formItems.LaisonStockList) {
        // LaisonStockList 组件存在前提下
        // prettier-ignore
        // 验证LaisonStockList组件，table 折叠行中嵌入的k-form-design 表单
        const KFB_instance_In_LaisonOrderPropShow = this.$refs.kfb.form.formItems.LaisonStockList.$children[0].$children[0].$children[0].KFB_instance_In_LaisonOrderPropShow
        let hasError = false;
        await KFB_instance_In_LaisonOrderPropShow.forEach(async (kfb_instance) => {
          try {
            let res = await kfb_instance.form.validateFields();
          } catch (e) {
            let errmsg = e.errors[Object.keys(e.errors)[0]].errors[0].message;
            this.$message.error(errmsg);
            hasError = true;
            throw new Error(); // 为了终止forEach循环
          }
        });

        if (hasError) {
          return;
        }
      }
      window.xxx = this.$refs.kfb;
      this.$refs.kfb
        .getData()
        .then((values) => {
          // prettier-ignore
          // 如果存在LaisonStockList这个组件的前提下，且其存货为空
          if (this.$refs.kfb.form.formItems.LaisonStockList && values.LaisonStockList.tableData.length == 0) {

            this.$message.error('请至少选择一个存货')
            return
          } else if (this.$refs.kfb.form.formItems.LaisonStockList && values.LaisonStockList.tableData.length > 0) {
            window.kfkf = this.$refs.kfb.form.formItems.LaisonStockList

          }
          // console.log(this.formdataObj)
          for (let key in values) {
            this.formdataObj[key] = values[key];
          }
          let newValue = this.value;
          if (newValue.erpFormVal) {
            newValue.erpFormVal.formData = this.formdataObj;
          } else {
            newValue.erpFormVal = { formData: this.formdataObj };
          }
          //
          this.$emit('input', newValue); //其实这个就是更新value
          console.log(newValue);
          this.$emit('apply_success', newValue);
        })
        .catch((e) => {
          console.error(e, '--line240');
        });
    },
    async handleSubmitInfoOk(submitInfo) {
      const formData = await this.getFormData()
      const res = await submit({
        businessId: this.computedQuery.businessId || '',// 业务ID，从草稿提交时需要携带
        formData,
        curTaskId: this.computedQuery.curTaskId || '',// 审批时需要携带
        uniTenantId: this.computedQuery.uniTenantId,
        publishId: this.computedQuery.publishId,
        bizToken: this.computedQuery.bizToken,
        submitInfo
      })

      if (res.status === 200) {
        this.$message.success(res.msg)
        this.$router.go(-1)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleSubmit() {
      this.$refs.modal.show()
    },
    async handleSaveAsDraft() {
      const formData = await this.getFormData()
      let res;
      if (this.computedQuery.businessId) {
        // 如果 businessId 存在， 则说明是编辑，走编辑接口， 否则，走创建
        res = await edit({
          businessId: this.computedQuery.businessId,
          formData,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken,
        })
      } else {
        res = await create({
          publishId: this.computedQuery.publishId,
          formData,
          uniTenantId: this.computedQuery.uniTenantId,
          bizToken: this.computedQuery.bizToken,
        })
      }

      if (res.status === 200) {
        this.$message.success(res.msg)
        this.$router.go(-1)
      } else {
        this.$message.error(res.msg)
      }
    },
    async getFormData() {
      let formData = null;
      try {
        formData = await this.$refs.kfb.getData()
      } catch (e) {
        formData = null;
        this.$message.error("获取表单数据异常,请先检查表单是否按要求填写！")
        throw Error("获取表单数据异常")
      }
      return formData
    },
    handleMount(laisonRootFormInstance) {
      /**
       * 将根表单 注册到window 对象，以便在 src/components/kform/KFormBuild/index.vue
       * 中能够访问到根表单数据，这样，就可以写一些需求逻辑
       * 例如在，doInitJs 的时候，把根表单作为页面注入的函数钩子的参数，这样就能在注入函数
       * 中去访问，从而写一些判断逻辑
       */
      window.rootKForm = laisonRootFormInstance;
    },
  },
};
</script>

<style scoped lang="scss">
$operation-row-height: 4rem;
// .form-previewer-root {
//   width: 100vw;
//   padding: 20px;
//   min-height: 100vh;
//   position: relative;
#operation-row{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#operation-footer-row {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  height: $operation-row-height;
  background-color: #fff;
  box-shadow: 0px 0px 7px 3px #f4f4f4;
  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
main {
  // display: flex;
  // justify-content: center;
  // flex-wrap: wrap;
  // gap: 1rem;

  section {
    padding: 10px;
    .form-previewer {
      background-color: white;
      padding: 4rem;
      margin: 0 auto;
      // max-width: 100%;
      box-shadow: 0px 0px 7px 3px #f4f4f4;
    }
  }
  aside {
    padding: 10px;
  }
}

// }
</style>

<style scoped lang="scss">
@import "@/lib/kform/styles/simple-print-style.scss";
</style>
