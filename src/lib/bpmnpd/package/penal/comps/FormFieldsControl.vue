<template>
  <a-table
    style="user-select: none"
    size="small"
    :columns="columns"
    rowKey="key"
    :pagination="false"
    :data-source="cusProp"
    :expandedRowKeys="expandedRowKeys"
  >
    <span slot="visibleTitleSlot">
      <a-checkbox v-model="visibleAll" @change="(e) => toggleAll(e, 'hidden')"></a-checkbox>
      可见</span
    >
    <span slot="editableTitleSlot">
      <a-checkbox v-model="editableAll" @change="(e) => toggleAll(e, 'disabled')"></a-checkbox>
      可编辑</span
    >
    <span slot="visible" slot-scope="visible, record">
      <a-checkbox :checked="!visible" @change="(e) => toggleVisible(e, record)"></a-checkbox>
    </span>
    <span slot="editable" slot-scope="editable, record" v-if="record.type != 'text'">
      <a-checkbox :checked="!editable" @change="(e) => toggleEditable(e, record)"></a-checkbox>
    </span>

    <template v-if="!noExpand" slot-scope="props" slot="expandIcon">
      <a v-if="ifCustom(props.record.type)" class="expand-icon" @click="toggleRowExpand(props.record)">
        <a-icon :type="expandedRows.has(props.record.key) ? 'caret-down' : 'caret-right'" />
      </a>
    </template>

    <template v-if="!noExpand" slot="expandedRowRender" slot-scope="record">
      <!-- 渲染可展开的行 -->
      <FormFieldsControl noExpand v-model="record.exposeFields" style="padding: 2px 0px; background-color: #f3f3f3" />
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '属性名',
    dataIndex: 'label',
    // key: 'key',
    scopedSlots: { customRender: 'name' },
    // align: 'center',
    ellipsis: true,
  },

  {
    dataIndex: 'hidden',
    // key: 'model',
    slots: { title: 'visibleTitleSlot' },
    scopedSlots: { customRender: 'visible' },
    width: '80px',

    // align: 'center',
  },
  {
    // key: 'model'.slice(6),
    dataIndex: 'disabled',
    slots: { title: 'editableTitleSlot' },
    scopedSlots: { customRender: 'editable' },
    // align: 'center',
    width: '80px',
  },
  {
    title: '类型',
    dataIndex: 'type',
    // key: 'key',
    ellipsis: true,
    width: '100px',
  },
];
/**
 * 组件在中的自定义行展开逻辑是为了实现部分行能够展开(仅组件类型为 custom 时才能够被展开)
 */

export default {
  name: 'FormFieldsControl',
  props: {
    cusProp: {
      type: Array,
    },
    noExpand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns,
      visibleAll: false,
      editableAll: false,
      expandedRows: new Set(),
      expandedRowKeys: [],
    };
  },

  model: {
    event: 'cusEvent',
    prop: 'cusProp',
  },
  watch: {
    ['cusProp']: {
      // 同步selectAll checkbox 状态
      handler: function (val) {
        console.log(this.cusProp, '--line56');
        let exist = this.cusProp.some((it) => it.hidden == true); // true: 存在不可见项
        !exist ? (this.visibleAll = true) : (this.visibleAll = false);
        let _exist = this.cusProp.some((it) => it.disabled == true); // true: 存在不可编辑项
        !_exist ? (this.editableAll = true) : (this.editableAll = false);
      },
      deep: true,
    },
  },
  created() {
    const f = this.pureFieldsControl(JSON.parse(JSON.stringify(this.$store.state.kform.data)));
  },
  methods: {
    ifCustom(type) {
      return ![
        'input',
        'textarea',
        'date',
        'time',
        'number',
        'radio',
        'checkbox',
        'select',
        'rate',
        'switch',
        'slider',
        'uploadImg',
        'uploadFile',
        'cascader',
        'treeSelect',
        'batch',
        'editor',
        'selectInputList',
        'button',
        'alert',
        'text',
        'html',
        'divider',
      ].includes(type);
    },
    toggleRowExpand(record) {
      // 行展开
      const { key } = record;

      if (this.expandedRows.has(key)) {
        this.expandedRows.delete(key);
      } else {
        this.expandedRows.add(key);
      }
      this.expandedRowKeys = Array.from(this.expandedRows);
    },
    pureFieldsControl(formInfo) {
      let _this = this;
      /*
      grid columns
      card list
      tabs columns
      table trs
      */
      let result = [];
      const TYPELIST = ['grid', 'card', 'tabs', 'table']; //布局元素
      recursionFilter(formInfo.list); // 过滤出嵌套在布局元素中的字段，
      function recursionFilter(target) {
        target.map((it) => {
          if (TYPELIST.includes(it.type)) {
            if (it.type === 'grid' || it.type === 'tabs') {
              it.columns.map((_it) => {
                recursionFilter(_it.list);
              });
            } else if (it.type === 'card') {
              recursionFilter(it.list);
            } else if (it.type === 'table') {
              it.trs.map((_it) => {
                _it.tds.map((__it) => {
                  recursionFilter(__it.list);
                });
              });
            }
          } else {
            // 非布局元素
            result.push(_this.structDateObj(it));
          }
        });
      }
      return result;
    },
    structDateObj(it) {
      const obj = {};
      if (it.model != undefined || it.key != undefined) {
        obj.label = it.label || 'empty';
        obj.type = it.type || 'unknown';
        obj.model = it.model || it.key;
        obj.key = it.key;
        obj.hidden = false;
        obj.disabled = false;
        // obj.hidden = it.options.hidden || false
        // obj.disabled = it.options.disabled || false
      }
      if (this.ifCustom(it.type)) {
        //@jayce 23/04/23-13:41:38 : 如果这个控件是一个自定义组件, 那么就预留一个childern 字段, 让 FormFieldsControl 组件去递归控制自定义组件向外暴露的字段
        obj.children = [];
      }
      return obj;
    },
    // -------------------------------------
    toggleAll(e, type) {
      /**
       * 可编辑 => 一定可见
       * 不可见 => 一定不可编辑
       *
       */
      /* prettier-ignore */
      if (type === 'hidden' && e.target.checked) {// 可见
        this.cusProp.forEach((item) => {
          item['hidden'] = false
        })
      } else if (type === 'hidden' && !e.target.checked) { //不可见
        this.cusProp.forEach((item) => {
          item['hidden'] = true
          item['disabled'] = true

        })
      } else if (type === 'disabled' && e.target.checked) {// 可编辑
        this.cusProp.forEach((item) => {
          item['hidden'] = false;
          item['disabled'] = false;
        })
      } else if (type === 'disabled' && !e.target.checked) {//不可编辑
        this.cusProp.forEach((item) => {
          item['disabled'] = true
        })
      }
      this.updataTableJson();
    },
    findItem(key) {
      // 不要用model
      return this.cusProp.filter((item) => item.key === key)[0];
    },
    toggleVisible(e, scope) {
      // return
      let item = this.findItem(scope.key);
      if (e.target.checked) {
        // 可见
        item.hidden = false;
      } else {
        // 不可见 -> 一定不可编辑
        item.hidden = true;
        item.disabled = true;
      }
      this.updataTableJson();
    },
    toggleEditable(e, scope) {
      let item = this.findItem(scope.key);
      if (e.target.checked) {
        // 可编辑 -> 一定可见
        item.disabled = false;
        item.hidden = false;
      } else {
        // 不可编辑
        item.disabled = true;
      }
      this.updataTableJson();
    },

    updataTableJson() {
      this.$emit('cusEvent', this.cusProp);
    },
  },
};
</script>
<style scoped>
::v-deep .ant-table {
  font-size: 12px;
}
::v-deep .ant-table-small {
  border: none;
}
::v-deep col.ant-table-expand-icon-col {
  width: 20px;
  padding: 0;
}

::v-deep td.ant-table-row-expand-icon-cell {
  padding: 0 !important;
}
</style>
