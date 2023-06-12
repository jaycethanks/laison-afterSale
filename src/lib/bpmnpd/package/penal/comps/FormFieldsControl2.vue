<template>
  <a-table :columns="columns" size="small" rowKey="key" :pagination="false" :data-source="cusProp">
    <span slot="labelSlot" slot-scope="text, record" :style="{ fontSize: fontSize }">
      {{ text }}
    </span>
    <span slot="visibleTitleSlot" :style="{ fontSize: fontSize }">
      <a-checkbox v-model="visibleAll" @change="(e) => toggleAll(e, 'hidden')"></a-checkbox>
      可见</span
    >
    <span slot="editableTitleSlot" :style="{ fontSize: fontSize }">
      <a-checkbox v-model="editableAll" @change="(e) => toggleAll(e, 'disabled')"></a-checkbox>
      可编辑</span
    >
    <span slot="visible" slot-scope="visible, record" :style="{ fontSize: fontSize }">
      <a-checkbox :checked="!visible" @change="(e) => toggleVisible(e, record)"></a-checkbox>
    </span>
    <span slot="editable" slot-scope="editable, record" :style="{ fontSize: fontSize }">
      <a-checkbox :checked="!editable" @change="(e) => toggleEditable(e, record)"></a-checkbox>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '属性名',
    dataIndex: 'label',
    // key: 'key',
    slots: { title: 'labelSlot' },
    scopedSlots: { customRender: 'name' },
    align: 'left',
  },

  {
    dataIndex: 'hidden',
    // key: 'model',
    slots: { title: 'visibleTitleSlot' },
    scopedSlots: { customRender: 'visible' },
    align: 'left',
  },
  {
    // key: 'model'.slice(6),
    dataIndex: 'disabled',
    slots: { title: 'editableTitleSlot' },
    scopedSlots: { customRender: 'editable' },
    align: 'left',
  },
]

export default {
  props: ['cusProp'],
  data() {
    return {
      columns,
      visibleAll: false,
      editableAll: false,
      fontSize: '12px',
    }
  },
  model: {
    event: 'cusEvent',
    prop: 'cusProp',
  },
  watch: {
    ['cusProp']: {
      // 同步selectAll checkbox 状态
      handler: function (val) {
        console.log(this.cusProp, '--line56')
        let exist = this.cusProp.some((it) => it.hidden == true) // true: 存在不可见项
        !exist ? (this.visibleAll = true) : (this.visibleAll = false)
        let _exist = this.cusProp.some((it) => it.disabled == true) // true: 存在不可编辑项
        !_exist ? (this.editableAll = true) : (this.editableAll = false)
      },
      deep: true,
    },
  },
  methods: {
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
      this.updataTableJson()
    },
    findItem(model) {
      return this.cusProp.filter((item) => item.model === model)[0]
    },
    toggleVisible(e, scope) {
      // console.log(scope, '--line116')
      let item = this.findItem(scope.model)
      if (e.target.checked) {
        // 可见
        item.hidden = false
      } else {
        // 不可见 -> 一定不可编辑
        item.hidden = true
        item.disabled = true
      }
      this.updataTableJson()
    },
    toggleEditable(e, scope) {
      let item = this.findItem(scope.model)
      if (e.target.checked) {
        // 可编辑 -> 一定可见
        item.disabled = false
        item.hidden = false
      } else {
        // 不可编辑
        item.disabled = true
      }
      this.updataTableJson()
    },

    updataTableJson() {
      this.$emit('cusEvent', this.cusProp)
    },
  },
}
</script>
