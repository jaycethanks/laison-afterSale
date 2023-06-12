<template template>
  <!-- 标签页布局 -->
  <a-tabs
    v-if="record.type === 'tabs' && !laisonHiddenFlag && !record.options.hidden"
    class="grid-row"
    :default-active-key="0"
    :tabBarGutter="record.options.tabBarGutter"
    :type="record.options.type"
    :size="record.options.size"
    :tabPosition="record.options.tabPosition"
    :animated="record.options.animated"
    v-model="activeKey"
  >
    <a-tab-pane
      v-for="(tabItem, index) in record.columns"
      :key="index"
      :tab="this.$t(tabItem.label)"
      :forceRender="true"
    >
      <buildBlocks
        ref="nestedComponents"
        @handleReset="$emit('handleReset')"
        @change="handleChange"
        v-for="item in tabItem.list"
        :showType="showType"
        :sunOfProps="sunOfProps"
        :rootCompent="rootCompent"
        :disabled="disabled"
        :stockRecord="stockRecord"
        :dynamicData="dynamicData"
        :key="item.key"
        :record="item"
        :formConfig="formConfig"
        :config="config"
      />
    </a-tab-pane>
  </a-tabs>
  <!-- 栅格布局 -->
  <a-row
    v-else-if="record.type === 'grid' && !laisonHiddenFlag && !record.options.hidden"
    class="grid-row"
    :gutter="record.options.gutter"
  >
    <a-col class="grid-col" v-for="(colItem, idnex) in record.columns" :key="idnex" :span="colItem.span || 0">
      <buildBlocks
        ref="nestedComponents"
        @handleReset="$emit('handleReset')"
        @change="handleChange"
        v-for="item in colItem.list"
        :disabled="disabled"
        :showType="showType"
        :stockRecord="stockRecord"
        :sunOfProps="sunOfProps"
        :rootCompent="rootCompent"
        :dynamicData="dynamicData"
        :key="item.key"
        :record="item"
        :formConfig="formConfig"
        :config="config"
      />
    </a-col>
  </a-row>
  <!-- 卡片布局 -->
  <a-card
    v-else-if="record.type === 'card' && !laisonHiddenFlag && !record.options.hidden"
    class="grid-row"
    :title="this.$t(record.label)"
  >
    <buildBlocks
      ref="nestedComponents"
      @handleReset="$emit('handleReset')"
      @change="handleChange"
      v-for="item in record.list"
      :showType="showType"
      :disabled="disabled"
      :dynamicData="dynamicData"
      :stockRecord="stockRecord"
      :sunOfProps="sunOfProps"
      :rootCompent="rootCompent"
      :key="item.key"
      :record="item"
      :formConfig="formConfig"
      :config="config"
    />
  </a-card>
  <!-- 表格布局 -->
  <table
    v-else-if="record.type === 'table' && !laisonHiddenFlag && !record.options.hidden"
    :id="record.key"
    class="kk-table-9136076486841527"
    :class="{
      bright: record.options.bright,
      small: record.options.small,
      bordered: record.options.bordered,
    }"
    :style="record.options.customStyle"
  >
    <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
      <td
        class="table-td"
        v-for="(tdItem, tdIndex) in trItem.tds.filter((item) => item.colspan && item.rowspan)"
        :key="tdIndex"
        :colspan="tdItem.colspan"
        :rowspan="tdItem.rowspan"
      >
        <buildBlocks
          ref="nestedComponents"
          @handleReset="$emit('handleReset')"
          @change="handleChange"
          v-for="item in tdItem.list"
          :disabled="disabled"
          :showType="showType"
          :sunOfProps="sunOfProps"
          :stockRecord="stockRecord"
          :rootCompent="rootCompent"
          :dynamicData="dynamicData"
          :key="item.key"
          :record="item"
          :formConfig="formConfig"
          :config="config"
        />
      </td>
    </tr>
  </table>

  <!-- <KFormItem
    v-else-if="!record.options.hidden"
    :class="{ 'no-display-fields': !fieldShow(record) }"
    ref="nestedComponents"
    @handleReset="$emit('handleReset')"
    @change="handleChange"
    :disabled="disableField(record)"
    :dynamicData="dynamicData"
    :key="record.key"
    :record="record"
    :formConfig="formConfig"
    :config="config"
  /> -->
  <!-- 改成下面的  v-show -->
  <KFormItem
    v-else-if="!record.options.hidden && !laisonHiddenFlag"
    ref="nestedComponents"
    @handleReset="$emit('handleReset')"
    @change="handleChange"
    :disabled="disabled"
    :dynamicData="dynamicData"
    :sunOfProps="sunOfProps"
    :rootCompent="rootCompent"
    :stockRecord="stockRecord"
    :key="record.key"
    :record="record"
    :showType="showType"
    :formConfig="formConfig"
    :config="config"
  />
</template>
<script>
import { debounce } from 'min-dash';
/*
 * author kcz
 * date 2019-11-20
 */
import KFormItem from '../KFormItem/index';
import { simpleDebounce } from '@/utils/util.js';
export default {
  name: 'buildBlocks',
  props: {
    record: {
      type: Object,
      required: true,
    },

    showType: {
      type: Number,
      default: 0,
    },
    fieldConfig: {
      type: Object,

      default() {
        return {};
      },
    },
    formConfig: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    dynamicData: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sunOfProps: {
      type: Boolean,
      default: false,
    },
    stockRecord: {
      type: Object,
      default: () => {
        return null;
      },
    },
    rootCompent: {
      //根组件 可以从根组件获取完整的数据结构
      type: Object,
      default: () => {
        return null;
      },
    },
    validatorError: {
      type: [Object, null],
      default: () => ({}),
    },
  },
  components: {
    KFormItem,
  },
  created() {
    //函数防抖    //时间太多如果输入框切换太快 修改的字段就不会更新  这说明虽然实力不是同一个但是方法是同一个
    this.handleChange = simpleDebounce(this.handleChange, 150);
    this.handelFieldDisableAndHidden(this.record);
  },
  data() {
    return {
      activeKey: 0,
      laisonHiddenFlag: false,
      laisonDisabledFlag: false,
      tempValue: null,
      tempKey: null,
      // copyOfProp:null
    };
  },
  methods: {
    // fieldShow(record) {
    //   // let i=0
    //   //  console.log("计算了"+record)
    //   // if(record.key=="dial"){
    //   //   ++i
    //   //     console.log("计算了"+i)
    //   // }
    //   // if (record.model == 'contractFile') {
    //   //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', record)
    //   // }

    //   let show = !record.options.hidden

    //   if (show) {
    //     if (this.fieldConfig[record.model]) {
    //       //这个字段由单独的 显式配置
    //       let culumeConfig = this.fieldConfig[record.model]

    //       if (culumeConfig.hidden) {
    //         show = false
    //       }
    //     }
    //   }
    //   // console.log('是不是显示', record, show)
    //   return show
    // },

    /**
     *  处理下这个字段是否需要隐藏和禁用
     */
    handelFieldDisableAndHidden(record) {
      if (record.label === '订单预估交期') {
      }
      //先去执行流程设计里面的显示配置
      if (this.fieldConfig[record.model]) {
        //这个字段由单独的 显式配置
        let culumeConfig = this.fieldConfig[record.model];
        if (culumeConfig.disable) {
          this.$set(record.options, 'disabled', true);
        }

        if (culumeConfig.hidden) {
          this.$set(record.options, 'hidden', true);
        }
      }

      if (this.showType == 2) {
        //当这个是翻单编辑的时候 去判断要不要禁用
        // console.log('yyyyssss', record, this.showType)
        if (!['预收款备注', '期望出货日期'].includes(record.label)) {
          this.$set(record.options, 'disabled', true);
        } else {
          this.$set(record.options, 'disabled', false);
          // this.$set(this._props, 'disabled', false)
          this._props.disabled = false;
          return false;
        }
      }

      if (this.showType == 3) {
        //审批
        /**
         * 针对 LaisonStockList 组件的配置 start
         * 如果是审核  那么要处理LaisonOrderPropShow里面的 kformbuild
         */
        if (
          ['BOM版本', '固件版本', '特规零部件清单', 'BOM文件', '工艺卡文件', '客户化工具'].includes(record.label) &&
          this.$store.getters.userInfo.username == 'jianwb'
        ) {
          this.$set(record.options, 'disabled', false);
          //this.$set(this._props, 'disabled', false)
          this._props.disabled = false;
        } else if (['生产选项'].includes(record.label) && this.$store.getters.userInfo.username == 'xiaoh') {
          this.$set(record.options, 'disabled', false);
          this._props.disabled = false;
          console.log('record.label', record.label, this.disabled);
        } else {
          //怎么判断自己时propshow 的子组件
          if (this.sunOfProps) {
            //如果时存货属性 则禁用其他属性  因为存货属性无法通过流程设计里的配置控制表单显示
            this.$set(record.options, 'disabled', true);
          } else {
            //什么都不做 走的是fieldConfig 进行 disable和hidden
          }

          //t
        }
        /**
         * 针对 LaisonStockList 组件的配置 end
         */

        // if (record.label === '工艺卡文件') {
        //   window.xx = this
        // }
        // console.log(record.label, record.options.disabled, '--line281')
      }
    },
    hiddenThis() {
      this.laisonHiddenFlag = true;
    },
    disableThis() {
      this.laisonDisabledFlag = true;
    },
    validationSubform() {
      // 验证动态表格
      const nestedComponents = this.$refs.nestedComponents;
      if (typeof nestedComponents === 'object' && nestedComponents instanceof Array) {
        for (let i = 0; nestedComponents.length > i; i++) {
          if (!nestedComponents[i].validationSubform()) {
            return false;
          }
        }
        return true;
      } else if (typeof nestedComponents !== 'undefined') {
        return nestedComponents.validationSubform();
      } else {
        return true;
      }
    },
    //@jayce 22/08/18-14:11:28 : 支持自定义组件为 表单时的验证

    validateKFormItem() {
      let cusCompList = [];
      /**
       * @description: 递归查找 含有validateCurrentForm 方法的子组件
       * @param {*} target
       * @return {*}
       */
      function digCusComp(target) {
        if (typeof target === 'object' && target instanceof Array && target.length > 0) {
          // 如果为数组， 则说明是布局组件， 那么去查询每一项, 如果能找到定义有 `validateCurrentForm` 方法 的自定义组件，那么将该组件收集起来， 否则就递归重新执行 digCusComp 方法
          for (let i = 0; i < target.length; i++) {
            if (target[i].$refs && target[i].$refs.cusComp) {
              if (target[i].$refs.cusComp.$refs.actualCusComp.validateCurrentForm) {
                cusCompList.push(target[i].$refs.cusComp.$refs.actualCusComp);
              }
            } else {
              digCusComp(target[i].$children);
            }
          }
        } else if (
          // 如果不是数组， 则说明说明，当前项就是一个组件，去判断它是否为我们符合条件的自定义组件， 是的话同样，收集到 cusCompList
          typeof target === 'object' &&
          !(target instanceof Array) && //不是数组， 这里可能是空数组
          target.$refs &&
          target.$refs.cusComp &&
          target.$refs.cusComp.$refs.actualCusComp &&
          target.$refs.cusComp.$refs.actualCusComp.validateCurrentForm
        ) {
          cusCompList.push(target.$refs.cusComp.$refs.actualCusComp);
        }
      }
      const nestedComponents = this.$refs.nestedComponents || [];
      digCusComp(nestedComponents);
      // 去handle 我们收集的组件集合， 然后触发 定义的 `validateCurrentForm` 方法，他们将返回西岸Promise, 我们交由 Promise.all 处理，并返回到上层。
      const promiseall = cusCompList.map((it) => it.validateCurrentForm());
      return Promise.all(promiseall);
    },

    handleChange(value, key) {
      this.$emit('change', value, key);
    },

    //调用this.$debounce  更好  支持传参

    handleInput(value) {},
  },

  watch: {
    /**
     * @author: lizhichao<meteoroc@outlook.com>
     * @description: 监视validatorError对象，当检测到Tabs中有表单校验无法通过时，切换到最近校验失败的tab页。
     */
    validatorError: {
      deep: true,
      handler: function (n) {
        const errorItems = Object.keys(n);
        if (errorItems.length) {
          if (!this.record.columns) return false;
          for (let i = 0; i < this.record.columns.length; i++) {
            const err = this.record.columns[i].list.filter((item) => errorItems.includes(item.model));
            if (err.length) {
              this.activeKey = i;
              break;
            }
          }
        }
      },
    },

    record: {
      handler: function (n, o) {
        this.handelFieldDisableAndHidden(this.record);
      },
    },
  },
};
</script>

<style scoped>
.no-display-fields {
  display: none !important;
}
</style>
