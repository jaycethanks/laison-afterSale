<template>
  <!-- wrapClassName 用于设定modal的最大宽度 -->
  <j-modal
    width="1200px"
    :visible="visible"
    switchFullscreen
    :title="title"
    @ok="()=>{}"
    @cancel="closeModal"
    :maskClosable="false"
    :footer="footer"
    @fullScreenEvent="isFullScreen = $event"
    :body-style="{ maxHeight: isFullScreen ? '' : '70vh', overflowY: 'auto' }"
    :ok-button-props="{ props: { disabled: this.okBtnDisabled } }"
  >
    <!-- <div align="right">
      <a-tooltip title="打印预览" v-if="formInfo.config != undefined && formInfo.config.enablePrint">
        <a-button
          type="link"
          @click="getPdf('#pdfDom', (formdataObj.orderNo || '') + ' 质检计划')"
          :loading="loading"
          :disabled="loading"
        >
          <a-icon :type="loading ? '' : 'printer'" style="font-size: 20px" />
        </a-button>
      </a-tooltip>
    </div> -->
    <div style="padding: 20px" id="pdfDom">
      <k-form-build @mount="handleMount" :value="formInfo" :disabled="allDisabled" ref="kfb" />
    </div>
  </j-modal>
</template>

<script>
// import { JeecgListMixin } from '@/mixins/JeecgListMixin';
// import { activitiMixin } from '@/views/activiti/mixins/activitiMixin';
import KFormBuild from '@/lib/kform/KFormBuild/index';
import JModal from '@/components/jeecg/JModal/index.vue';
import { message } from 'ant-design-vue';
//import '@/assets/SourceHanSansCN-Regular-normal'
import { queryTemplate } from "@/api/platform/platformOpenAPI.js"
export default {
  name: 'FormPreviewerModal',
  // mixins: [JeecgListMixin, activitiMixin],
  components: {
    KFormBuild,
    JModal,
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: {
      type: String,
      default: 'title is not defined',
    },
    footer: {
      type: [String, Object],
      // default: null,
    },
    opts: {
      type: Object,
      default: () => {
        type: 0;
      },
    },
  },
  data() {
    return {
      // title:'',
      visible:false,
      okBtnDisabled: true,
      allDisabled: true,
      formInfo: {}, //表单定义
      formdataObj: {}, //表单数据
      isFullScreen: false,
    };
  },

  methods: {
    closeModal: function () {
      // this.$emit('close');
      this.visible = false;

    },

    async show(id) {
      const res = await queryTemplate({id})
      if(res.status === 200){
        const { formInfo } = res.data
        this.formInfo = JSON.parse(formInfo)
      }else{
        this.$message.error(res.msg)
      }
      this.visible = true;
    },

    // async handleOk() {
    //   // 验证整表表单
    //   if (this.okBtnDisabled) {
    //     this.$message.warning(this.$t('order.submitapp'));
    //     return;
    //   }
    //   try {
    //     await this.$refs.kfb.form.validateFields();
    //   } catch (e) {
    //     let errmsg = e.errors[Object.keys(e.errors)[0]].errors[0].message;
    //     this.$message.error(errmsg);
    //     return;
    //   }
    //   // div#LaisonStockList
    //   if (this.$refs.kfb.form.formItems.LaisonStockList) {
    //     // LaisonStockList 组件存在前提下
    //     // prettier-ignore
    //     // 验证LaisonStockList组件，table 折叠行中嵌入的k-form-design 表单
    //     const KFB_instance_In_LaisonOrderPropShow = this.$refs.kfb.form.formItems.LaisonStockList.$children[0].$children[0].$children[0].KFB_instance_In_LaisonOrderPropShow
    //     let hasError = false;
    //     await KFB_instance_In_LaisonOrderPropShow.forEach(async (kfb_instance) => {
    //       try {
    //         let res = await kfb_instance.form.validateFields();
    //       } catch (e) {
    //         let errmsg = e.errors[Object.keys(e.errors)[0]].errors[0].message;
    //         this.$message.error(errmsg);
    //         hasError = true;
    //         throw new Error(); // 为了终止forEach循环
    //       }
    //     });

    //     if (hasError) {
    //       return;
    //     }
    //   }
    //   window.xxx = this.$refs.kfb;
    //   this.$refs.kfb
    //     .getData()
    //     .then((values) => {
    //       // prettier-ignore
    //       // 如果存在LaisonStockList这个组件的前提下，且其存货为空
    //       if (this.$refs.kfb.form.formItems.LaisonStockList && values.LaisonStockList.tableData.length == 0) {
    //         this.$message.error('请至少选择一个存货')
    //         return
    //       } else if (this.$refs.kfb.form.formItems.LaisonStockList && values.LaisonStockList.tableData.length > 0) {
    //         window.kfkf = this.$refs.kfb.form.formItems.LaisonStockList

    //       }
    //       // console.log(this.formdataObj)
    //       for (let key in values) {
    //         this.formdataObj[key] = values[key];
    //       }
    //       let newValue = this.value;
    //       if (newValue.erpFormVal) {
    //         newValue.erpFormVal.formData = this.formdataObj;
    //       } else {
    //         newValue.erpFormVal = { formData: this.formdataObj };
    //       }
    //       //
    //       this.$emit('input', newValue); //其实这个就是更新value
    //       console.log(newValue);
    //       this.$emit('apply_success', newValue);
    //       this.visible = false;
    //     })
    //     .catch((e) => {
    //       console.error(e, '--line240');
    //     });

    //   // return
    //   /* old version */
    //   // let children = this.$refs.kfb.$children[0].$children[0].$children[0].$children[0].$children
    //   // await children.forEach(async (i) => {
    //   //   try {
    //   //     if (i.$children[0].$children[0].$children[0].$children[0].$children[0].$children[0]) {
    //   //       let node = i.$children[0].$children[0].$children[0].$children[0].$children[0].$children[0]
    //   //       if (node.$vnode.tag.includes('LaisonStockList')) {
    //   //         //LaisonStockList组件
    //   //         let stockListForm =
    //   //           node.$children[0].$children[0].$children[0].$children[0].$children[0].$children[0]
    //   //             .$children[0].$children[1].$children[0]
    //   //         stockListForm.$children.forEach(async (ii) => {
    //   //           if (
    //   //             ii.$vnode.key &&
    //   //             typeof ii.$vnode.key == 'string' &&
    //   //             ii.$vnode.key.includes('extra-row')
    //   //           ) {
    //   //             try {
    //   //               let res = await ii.$children[1].$children[0].$children[0].form.validateFields()
    //   //               console.log(res)
    //   //             } catch (e) {
    //   //               iserror = true
    //   //               Object.keys(e.errors).every((key) => {
    //   //                 console.log('错误时', e)
    //   //                 errMes = e.errors[key].errors[0].message
    //   //                 //console.log('errMes=', errMes)
    //   //                 return
    //   //               })
    //   //               throw new Error('有错误直接退出')
    //   //             }
    //   //           }
    //   //         })
    //   //       }
    //   //     }
    //   //   } catch (error) {}
    //   // })
    //   // return

    //   // console.log(iserror)
    //   // if (iserror) {
    //   //   this.$message.error(errMes)
    //   //   return
    //   // }

    //   // this.$refs.kfb
    //   //   .getData()
    //   //   .then((values) => {
    //   //     console.log('获取的值是', values)
    //   //     if (values.LaisonStockList.tableData.length == 0) {
    //   //       this.$message.error('请至少选择一个存货')
    //   //       return
    //   //     }
    //   //     console.log(this.formdataObj)
    //   //     for (let key in values) {
    //   //       this.formdataObj[key] = values[key]
    //   //     }
    //   //     let newValue = this.value

    //   //     if (newValue.erpFormVal) {
    //   //       newValue.erpFormVal.formData = this.formdataObj
    //   //     } else {
    //   //       newValue.erpFormVal = { formData: this.formdataObj }
    //   //     }
    //   //     //
    //   //     this.$emit('input', newValue) //其实这个就是更新value
    //   //     console.log(newValue)
    //   //     this.$emit('apply_success', newValue)
    //   //     this.visible = false
    //   //   })
    //   //   .catch((e) => {
    //   //     console.error(e, '--line240')
    //   //   })
    // },

    handleCancel() {
      this.visible = false;
      window.kfb = this.$refs.kfb;
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

<style scoped>
>>> .laison_modal-preview > .ant-modal {
  /* max-width: 1400px; */
}
</style>
