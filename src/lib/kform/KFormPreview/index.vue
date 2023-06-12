<template>
  <j-modal
    title="预览"
    :visible="visible"
    @ok="handleGetData"
    @cancel="handleCancel"
    okText="获取数据"
    cancelText="关闭"
    style="top: 10px"
    :destroyOnClose="true"
    :width="1300"
    switchFullscreen
    @fullScreenEvent="isFullScreen = $event"
    :body-style="{ maxHeight: isFullScreen ? '' : '75vh', overflowY: 'auto' }"
  >
    <!-- @jayce -->
    <div align="right">
      <a-tooltip title="打印预览" v-if="jsonData.config != undefined && jsonData.config.enablePrint">
        <a-button type="link" v-print="'#print-target-id'">
          <a-icon type="printer" style="font-size: 20px" />
        </a-button>
      </a-tooltip>
    </div>
    <div
      id="print-target-id"
      :class="{'enable-print-simple-style':jsonData.config != undefined && jsonData.config.enablePrintSimpleStyle}"
    >
      <k-form-build
        :value="jsonData"
        @submit="handleSubmit"
        @input="handleInput"
        ref="KFormBuild"
        @change="handleChange"
      />
      <jsonModel ref="jsonModel" />
    </div>
  </j-modal>
  <!-- 
  <a-modal
    title="预览"
    :visible="visible"
    @ok="handleGetData"
    @cancel="handleCancel"
    okText="获取数据"
    cancelText="关闭"
    style="top: 10px"
    :destroyOnClose="true"
    :width="1300"
  >

  </a-modal> -->
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
import jsonModel from '../KFormDesign/module/jsonModal';
import KFormBuild from '../KFormBuild';
import JModal from '@/components/jeecg/JModal/index.vue';
export default {
  name: 'KFormPreview',
  data() {
    return {
      visible: false,
      previewWidth: 1000,
      jsonData: {},
      isFullScreen: false,
    };
  },
  components: {
    jsonModel,
    KFormBuild,
    JModal,
  },
  created() {
    window.aa = this;
  },
  mounted() {
    // @jayce jsEnhance
    // try {
    //   if (this.jsonData.config && this.jsonData.config.jsEnhance) {
    //     Function('"use strict";' + this.jsonData.config.jsEnhance)();
    //   }
    // } catch (err) {
    //   console.error('accur error duaring jsEnhance execution:', err);
    // }
  },
  methods: {
    handleSubmit(p) {
      p.then((res) => {
        console.log(res, '获取数据成功');
        this.$refs.jsonModel.jsonData = res;
        this.$refs.jsonModel.visible = true;
      }).catch((err) => {
        console.error(err, '获取数据失败');
      });
    },
    handleGetData() {
      this.$refs.KFormBuild.getData()
        .then((res) => {
          console.log(res, '获取数据成功');
          this.$refs.jsonModel.jsonData = res;
          this.$refs.jsonModel.visible = true;
        })
        .catch((err) => {
          console.log(err, '获取数据失败');
        });
    },
    handleCancel() {
      this.visible = false;
    },
    handleInput(value, key) {
      console.log('有收到input 吗', value, key);
      console.log(this.jsonData);
      window.kfp = this;
    },
    handleChange(value, key) {
      // console.log('有收到change吗', value, key)
      // console.log(this.jsonData)
      //window.kfp = this
    },

    // ---------------------------------------custom start-----------------------------------

  },
};
</script>

<style scoped lang="scss">

@import '@/lib/kform/styles/simple-print-style.scss'
</style>
