<template>
  <div id="designer-box" :class="{ 'is-platform': isPlatform }">
    <!-- 通过css 去控制 palette 是否隐藏: @ref:https://forum.bpmn.io/t/how-to-disable-the-properties-panel-and-tools-palette/6498/2 -->
    <!-- <my-process-palette /> -->
    <my-process-designer
      :key="`designer-${reloadIndex}`"
      v-model="xmlString"
      v-bind="controlForm"
      keyboard
      ref="processDesigner"
      @element-click="elementClick"
      @init-finished="initModeler"
      :type="type"
    />

    <!-- <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer> -->
    <my-properties-panel
      :key="`penal-${reloadIndex}`"
      :bpmn-modeler="modeler"
      :prefix="controlForm.prefix"
      class="process-panel"
      :bpmnEditDataInit="bpmnEditDataInit"
      :type="type"
    />

    <!-- demo config -->
    <div v-if="false" class="demo-control-bar">
      <div class="open-control-dialog" @click="controlDrawerVisible = true">
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <el-drawer :visible.sync="controlDrawerVisible" size="400px" title="偏好设置" append-to-body destroy-on-close>
      <el-form :model="controlForm" size="small" label-width="100px" class="control-form" @submit.native.prevent>
        <el-form-item label="流程ID">
          <el-input v-model="controlForm.processId" @change="reloadProcessDesigner" />
        </el-form-item>
        <el-form-item label="流程名称">
          <el-input v-model="controlForm.processName" @change="reloadProcessDesigner" />
        </el-form-item>
        <el-form-item label="流转模拟">
          <el-switch
            v-model="controlForm.simulation"
            inactive-text="停用"
            active-text="启用"
            @change="reloadProcessDesigner"
          />
        </el-form-item>
        <el-form-item label="禁用双击">
          <el-switch
            v-model="controlForm.labelEditing"
            inactive-text="停用"
            active-text="启用"
            @change="changeLabelEditingStatus"
          />
        </el-form-item>
        <el-form-item label="隐藏label">
          <el-switch
            v-model="controlForm.labelVisible"
            inactive-text="停用"
            active-text="启用"
            @change="changeLabelVisibleStatus"
          />
        </el-form-item>
        <el-form-item label="流程引擎">
          <el-radio-group v-model="controlForm.prefix" @change="reloadProcessDesigner(true)">
            <el-radio label="camunda">camunda</el-radio>
            <el-radio label="flowable">flowable</el-radio>
            <el-radio label="activiti">activiti</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工具栏">
          <el-radio-group v-model="controlForm.headerButtonSize">
            <el-radio label="mini">mini</el-radio>
            <el-radio label="small">small</el-radio>
            <el-radio label="medium">medium</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { MyProcessDesigner, MyProcessPenal as MyPropertiesPanel } from '@/lib/bpmnpd/package/index.js';
import translations from '@/lib/bpmnpd/src/translations';
// 自定义渲染（隐藏了 label 标签）
import CustomRenderer from '@/lib/bpmnpd/src/modules/custom-renderer';
// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from '@/lib/bpmnpd/package/designer/plugins/content-pad';
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from '@/lib/bpmnpd/package/designer/plugins/palette';
import xmlObj2json from '@/lib/bpmnpd/src/utils/xml2json';
import MyProcessPalette from '@/lib/bpmnpd/package/palette/ProcessPalette';
// 自定义侧边栏
// import MyProcessPanel from "@/lib/bpmnpd/package/process-panel/ProcessPanel";
// import { xmlStr } from '@/bpmnJs/mockBpmnXml/bpmnMockXml'
//@jayce 23/05/22-11:17:38 : custom Start
import FlowFormDesignerType from '@/constants/FlowFormDesignerType.js';
export default {
  name: 'FlowDesigner',
  components: { MyProcessPalette, MyProcessDesigner, MyPropertiesPanel },
  props: {
    bpmnEditDataInit: {
      type: null,
    },
    type: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      // prettier-ignore
      //如果bpmnEditDataInit 不为null, 说明是 edit,进行数据回显初始化
      xmlString: this.bpmnEditDataInit != null && !!this.bpmnEditDataInit.xmldata ? this.bpmnEditDataInit.xmldata : '',
      modeler: null,
      reloadIndex: 0,
      controlDrawerVisible: false,
      translationsSelf: translations,
      controlForm: {
        processId: '',
        processName: '',
        simulation: true,
        labelEditing: false,
        labelVisible: false,
        prefix: 'camunda', //camunda,activiti
        headerButtonSize: 'mini',
        // additionalModel: []
        additionalModel: [CustomContentPadProvider, CustomPaletteProvider],
      },
      addis: {
        CustomContentPadProvider,
        CustomPaletteProvider,
      },
    };
  },
  watch:{
    bpmnEditDataInit:{
      handler:function(){
        if(this.bpmnEditDataInit){
          this.xmlString = this.bpmnEditDataInit.xmldata
        }
      },
      deep:true,
      immediate:true
    }
  },


  computed: {
    //@jayce 23/05/22-11:17:12 : custom Start
    isPlatform: function () {
      return this.type === FlowFormDesignerType.PLATFORM_NEW || this.type === FlowFormDesignerType.PLATFORM_EDIT;
    },
    isSystem: function () {
      return this.type === FlowFormDesignerType.SYSTEM_NEW || this.type === FlowFormDesignerType.SYSTEM_EDIT;
    },
  },
  methods: {
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler;
      }, 10);
    },
    reloadProcessDesigner(deep) {
      this.controlForm.additionalModel = [];
      for (let key in this.addis) {
        if (this.addis[key]) {
          this.controlForm.additionalModel.push(this.addis[key]);
        }
      }
      deep && (this.xmlString = undefined);
      this.reloadIndex += 1;
      this.modeler = null; // 避免 panel 异常
      // if (deep) {
      //   this.xmlString = undefined;
      //   this.$refs.processDesigner.processRestart();
      // }
    },
    changeLabelEditingStatus(status) {
      this.addis.labelEditing = status ? { labelEditingProvider: ['value', ''] } : false;
      this.reloadProcessDesigner();
    },
    changeLabelVisibleStatus(status) {
      this.addis.customRenderer = status ? CustomRenderer : false;
      this.reloadProcessDesigner();
    },

    elementClick(element) {
      this.element = element;
      // !this.elementOverlayIds && (this.elementOverlayIds = {})
      // !this.overlays && (this.overlays = this.modeler.get('overlays'))
      // !this.contextPad && (this.contextPad = this.modeler.get('contextPad'))
      // this.modeler.on('element.hover', ({ element }) => {
      //   if (
      //     !this.elementOverlayIds[element.id] &&
      //     element.type !== 'bpmn:Process'
      //   ) {
      //     this.elementOverlayIds[element.id] = this.overlays.add(element, {
      //       position: { left: 0, bottom: 0 },
      //       html: `<div class="element-overlays">
      //       <p>Elemet id: ${element.id}</p>
      //       <p>Elemet type: ${element.type}</p>
      //     </div>`,
      //     })
      //   }
      // })

      // this.modeler.on('element.out', ({ element }) => {
      //   if (element) {
      //     this.overlays.remove({ element })
      //     this.elementOverlayIds[element.id] = null
      //   }
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.is-platform .djs-palette {
  display: none;
}
body {
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
}
#designer-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-flex;
  // grid-template-columns: 100px auto max-content;// 100px 是自定义左侧栏的宽度
  grid-template-columns: auto max-content;
}
.demo-control-bar {
  position: fixed;
  right: 8px;
  bottom: 8px;
  z-index: 1;
  .open-control-dialog {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 32px;
    background: rgba(64, 158, 255, 1);
    color: #ffffff;
    cursor: pointer;
  }
}

.control-form {
  .el-radio {
    width: 100%;
    line-height: 32px;
  }
}
.element-overlays {
  box-sizing: border-box;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: #fafafa;
}
.process-panel {
  border-left: 1px solid #e8e8e8;
}

body,
body * {
  /* 滚动条 */
  &::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }
  &::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
  }
  &::-webkit-scrollbar-thumb:vertical {
    /*垂直滚动条的样式*/
    height: 50px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.3);
    -webkit-border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.5);
    -webkit-border-radius: 4px;
  }
}
</style>
