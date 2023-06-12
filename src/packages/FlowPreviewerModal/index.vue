<style lang="less"></style>
<template>
  <j-modal
    :visible="visible"
    :title="title"
    width="90vw"
    switchFullscreen
    @cancel="closeModal"
    @ok="$emit('ok')"
    @fullScreenEvent="isFullScreen = $event"
    :maskClosable="false"
    :footer="footer"
    :body-style="{ maxHeight: isFullScreen ? '' : '70vh', overflowY: 'auto' }"
  >
    <!--流程图-->

    <div class="containers" style="min-height: 400px">
      <div id="canvas" ref="canvas"></div>
      <div id="js-properties-panel" class="panel" style="visibility: hidden"></div>
    </div>
    <!--实时备注信息 时间轴  #00DB00-->

    <!--
     type:
      0:创建-applyOrder
      1-翻单
      2-复制 （订单类型）-CopyTask
      3-编辑-edit
      4-查看-DoneTask
      5-审批-TodoTask
     -->
  </j-modal>
</template>

<script>
import JModal from '@/components/jeecg/JModal/index.vue';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import ModelingModule from 'bpmn-js/lib/features/modeling';

// bpmnviewer 拖动
// https://www.modb.pro/db/32324

export default {
  name: 'FlowPreviewer',
  props: {
    value: {
      type: Object,
      default: () => null,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'title is not defined',
    },
    footer: {
      type: [String, Object],
      default: null,
    },
  },
  components: { JModal },
  data() {
    return {
      modalVisible: true,
      isFullScreen: false,

      cardBodyStyle: {
        padding: '5px',
        marginTop: '10px',
      },
      cardHeadStyle: {
        fontWeight: 'bold',
      },
      showHistory: false,
      showProcess: false,
      showRecord: false,
      type: 0,
      loading: false, // 表单加载状态
      clickable: false,
      formNode: {},
      taskList: [],
      commentTitle: this.$t('order.auditSuggest'),
      // bpmn建模器
      BpmnViewer: null,
      container: null,
      canvas: null,
      xmlUrl: '',
      orderResult: 1,
      taskRecords: [],
      highLightedFlows: null, //连线的id
      highLightedToDoActivities: null, // 待办的活动节点
      highLightedDoneActivities: null, //已完成的活动节点
      highLightedActivities: null, //已完成全部流程活动节点
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
  },
  methods: {
    init() {
      /**
       * 备注信息
       */
      if (this.value) {
        this.orderResult = !this.value.orderInfo ? 1 : this.value.orderInfo.result;
        //历史任务
        this.taskList = this.value.taskProgress;
        this.showHistory = !!this.taskList && this.taskList.length > 0;
        //bpmn的xml
        this.xmlUrl = this.value.procBpmn;
        this.showProcess = !!this.xmlUrl;
        //记录信息
        this.taskRecords = this.value.operateRecord;
        this.showRecord = !!this.taskRecords && this.taskRecords.length > 0;
        //高亮flows
        if (this.value.procHighLight) {
          this.highLightedFlows = this.value.procHighLight.highLightedFlows;
          this.highLightedToDoActivities = this.value.procHighLight.highLightedToDoActivities;
          this.highLightedDoneActivities = this.value.procHighLight.highLightedDoneActivities;
          this.highLightedActivities = this.value.procHighLight.highLightedActivities;
        }
      }
      this.initBpmn();
    },
    closeModal: function () {
      this.$emit('close');
    },

    /**
     * bpmn相关
     */
    initBpmn() {
      // 获取到属性ref为“canvas”的dom节点
      // const canvas = document.getElementById('canvas')
      // 建模\
      try {
        if (this.BpmnViewer === null) {
          this.BpmnViewer = new BpmnViewer({
            container: '#canvas',
            additionalModules: [ModelingModule], //引入修改模块颜色 在Viewer[只读模式]中添加功能
          });
        }
        this.createNewDiagram();
      } catch (e) {
        console.log('initBpmnError', e);
      }
    },
    createNewDiagram() {
      this.transformCanvas(this.xmlUrl);
    },
    transformCanvas(xmlUrl) {
      // 将字符串转换成图显示出来
      let _this = this;
      this.BpmnViewer.importXML(xmlUrl)
        .then(() => {
          _this.bpmnTransformSuccess();
          // 让图能自适应屏幕
          var canvas = this.BpmnViewer.get('canvas');
          canvas.zoom('fit-viewport', 'auto');
        })
        .catch((e) => {
          console.error(e);
        });
    },
    bpmnTransformSuccess() {
      //点击事件
      this.clickModelerListener();
      //需要渲染的列表
      this.setNodeColor();
    },
    //添加点击事件
    clickModelerListener() {
      const that = this;
      const eventBus = this.BpmnViewer.get('eventBus'); // 需要使用 eventBus
      const eventType = ['element.click']; // 需要监听的事件集合
      eventType.forEach((eventType) => {
        eventBus.on(eventType, (e) => {
          // 这里根元素是 bpmn:Process  点击幕布、线、开始、结束节点的时候不触发
          if (
            !e ||
            e.element.type === 'bpmn:Process' ||
            e.element.type === 'bpmn:SequenceFlow' ||
            e.element.type === 'bpmn:StartEvent' ||
            e.element.type === 'bpmn:EndEvent'
          )
            return;
          const elementRegistry = this.BpmnViewer.get('elementRegistry');
          const shape = elementRegistry.get(e.element.id); // 传递 id 进去
          this.info(shape);
        });
      });
    },
    /**
     * 查询历史数据
     */
    info(shape) {
      let taskId = '';
      let taskType;
      if (this.highLightedActivities && this.highLightedActivities.length > 0) {
        this._node = this.highLightedActivities.filter((item) => item.actId === shape.id);
        if (this._node[0] !== undefined || this._node[0] != null) {
          taskId = this._node[0].taskId;
          taskType = 1;
        }
      } else {
        if (this.highLightedDoneActivities && this.highLightedDoneActivities.length > 0) {
          this._node = this.highLightedDoneActivities.filter((item) => item.actId === shape.id);
          if (this._node[0] !== undefined || this._node[0] != null) {
            taskId = this._node[0].taskId;
            taskType = 1;
          }
        }
        if (this.highLightedToDoActivities && this.highLightedToDoActivities.length > 0) {
          this._node = this.highLightedToDoActivities.filter((item) => item.actId === shape.id);
          if (this._node[0] !== undefined || this._node[0] != null) {
            taskId = this._node[0].taskId;
            taskType = 0;
          }
        }
      }

      //taskId查询历史数据
      if (taskId && taskId !== '') {
        //不能点击待办任务
        this.loading = true;
        let condition = { taskId: taskId, taskType: taskType };
        ErpTask.taskFormInfo(condition)
          .then((res) => {
            this.loading = false;
            if (res.code !== 0) {
              this.$message.error(res.errors);
            } else {
              this.unchangeable = true;
              this.formNode = res.data;
              this.showLcfsForm(res.data);
              // this.$refs.lcfs.show()
            }
          })
          .catch((err) => {
            this.loading = false;
          });
      }
    },
    //设置节点颜色
    setNodeColor() {
      const elementRegistry = this.BpmnViewer.get('elementRegistry'); //获得所有节点
      let modeling = this.BpmnViewer.get('modeling');

      //得到所有任务节点和开始节点
      this._nodeList = elementRegistry.filter(
        (item) =>
          item.type === 'bpmn:UserTask' ||
          item.type === 'bpmn:ServiceTask' ||
          item.type === 'bpmn:StartEvent' ||
          item.type === 'bpmn:EndEvent',
      );
      if (this._nodeList && this._nodeList.length > 0) {
        for (let i = 0; i < this._nodeList.length; i++) {
          let node = this._nodeList[i];
          modeling.setColor(node, {
            //给开始节点渲染颜色
            stroke: '#818991',
            fill: '#ffffff',
          });
        }
      }

      //设置默认颜色
      let flows = elementRegistry.filter((item) => item.type === 'bpmn:SequenceFlow');
      if (flows && flows.length > 0) {
        for (let i = 0; i < flows.length; i++) {
          let flowNode = flows[i];
          modeling.setColor(flowNode, {
            //给开始节点渲染颜色
            stroke: '#C8D2D8',
            fill: '#C8D2D8',
          });
        }
      }

      //当流程未完成时 对已完成节点进行渲染
      if (this.highLightedDoneActivities && this.highLightedDoneActivities.length > 0) {
        //渲染 已完成节点
        for (let i = 0; i < this.highLightedDoneActivities.length; i++) {
          this._node = elementRegistry.filter((item) => item.id === this.highLightedDoneActivities[i].actId);
          modeling.setColor(this._node, {
            //给开始节点渲染颜色
            stroke: '#5D8233',
            fill: '#B1E693',
          });
        }
        for (let i = 0; i < this.highLightedFlows.length; i++) {
          //渲染箭头颜色
          let highLightedFlow = this.highLightedFlows[i];
          this._node = elementRegistry.filter((item) => item.id === highLightedFlow.id);
          if (highLightedFlow.state === 0) {
            modeling.setColor(this._node, {
              stroke: '#5D8233',
              fill: '#B1E693',
            });
          } else if (highLightedFlow.state === 1) {
            modeling.setColor(this._node, {
              stroke: '#DF5E5E',
              fill: '#FDD2BF',
            });
          } else {
            modeling.setColor(this._node, {
              stroke: '#DF711B',
              fill: '#FDE49C',
            });
          }
        }

        if (this.highLightedToDoActivities.length > 0) {
          //如果待办的数组中有任务 则改为黄色 没有则将完成的任务中最后一个改为红色
          for (let i = 0; i < this.highLightedToDoActivities.length; i++) {
            this._node = elementRegistry.filter((item) => item.id === this.highLightedToDoActivities[i].actId);
            modeling.setColor(this._node, {
              stroke: '#DF711B',
              fill: '#FDE49C',
            });
          }
        } else {
          for (let i = 0; i < this.highLightedDoneActivities.length; i++) {
            this._node = elementRegistry.filter((item) => item.id === this.highLightedDoneActivities[i].actId);
            if (i === this.highLightedDoneActivities.length - 1) {
              modeling.setColor(this._node, {
                //给开始节点渲染颜色
                stroke: '#DF5E5E',
                fill: '#FDD2BF',
              });
            }
          }
        }
      } else if (this.highLightedActivities.length > 0) {
        //流程已经完成 全部渲染为绿色
        for (let i = 0; i < this.highLightedActivities.length; i++) {
          this._node = elementRegistry.filter((item) => item.id === this.highLightedActivities[i].actId);
          let highNode = this.findNodeById(this._node, this.highLightedActivities);
          let highNodeStatus = highNode && highNode.status ? highNode.status : 1;
          if (highNodeStatus === 3 || highNodeStatus === 6) {
            modeling.setColor(this._node, {
              //给开始节点渲染颜色
              stroke: '#DF5E5E',
              fill: '#FDD2BF',
            });
          } else if (highNodeStatus === 7) {
            modeling.setColor(this._node, {
              //给开始节点渲染颜色
              stroke: '#993399',
              fill: '#F9F0FF',
            });
          } else {
            modeling.setColor(this._node, {
              //给开始节点渲染颜色
              stroke: '#5D8233',
              fill: '#B1E693',
            });
          }
        }
        for (let i = 0; i < this.highLightedFlows.length; i++) {
          //渲染箭头颜色
          let highLightedFlow = this.highLightedFlows[i];
          this._node = elementRegistry.filter((item) => item.id === highLightedFlow.id);
          if (highLightedFlow.state === 0) {
            modeling.setColor(this._node, {
              stroke: '#5D8233',
              fill: '#B1E693',
            });
          } else if (highLightedFlow.state === 1) {
            modeling.setColor(this._node, {
              stroke: '#DF5E5E',
              fill: '#FDD2BF',
            });
          } else {
            modeling.setColor(this._node, {
              stroke: '#DF711B',
              fill: '#FDE49C',
            });
          }
        }
      }
    },
    findNodeById(node, acNodes) {
      for (let i = 0; i < acNodes.length; i++) {
        if (acNodes[i].actId === node[0].id) {
          return acNodes[i];
        }
      }
      return null;
    },
  },
};
</script>

<style>
.containers {
  background-color: #ffffff;
  width: 100%;
  height: calc(25vh - 20px);
}

#canvas {
  width: 100%;
  height: 100%;
}

.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}

/*隐藏右下角logo*/
.bjs-powered-by {
  display: none;
}

/**
 * touch事件  防止 鼠标触碰连线 连线变黑 非只读的时候有效
 */

.djs-shape,
.djs-connection {
  touch-action: none;
}

.djs-segment-dragger,
.djs-bendpoint {
  display: none;
}
</style>
