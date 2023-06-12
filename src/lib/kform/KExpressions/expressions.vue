<template>
  <div class="expression-root">
    <a-tag @click="handleTagClick(item)" v-for="item in fields" :key="item">{{ item }}</a-tag>
    <div class="operation-row">
      <main class="operation-box">
        <div class="operation-inner" v-for="i in cusProp" :key="i.key">
          <a-textarea ref="textarea" @click="activeKey = i.key" class="textarea" v-model="i.expression" />
          <a-button @click="handleDelete(i.key)" size="small" class="delete-icon" type="link">删除</a-button>
        </div>
        <a-button class="a-button" @click="handleAdd" type="link" size="small" icon="plus">新增</a-button>
      </main>
      <aside class="tool-function-box">
        <a-collapse default-active-key="1" :bordered="false">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel :key="fn.key" :header="fn.type" :style="customStyle" v-for="fn in fns">
            <ul class="expression-function-wrapper">
              <li @click="handleFnClick(name, desc)" v-for="{ name, desc } in fn.list" :key="name">{{ name }}</li>
            </ul>
          </a-collapse-panel>
        </a-collapse>
      </aside>
    </div>
    <a-alert style="margin-top: 10px" :description="desc" type="info" />
    <a-alert
      style="margin-top: 10px"
      description="注:仅支持简单表达式, 输入参数使用英文逗号','隔开,例如:sum=MULTIPLY(price,count), 不支持嵌套表达式如 'SUM(SUBTRACT())'"
      type="warning"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      fns: [
        {
          key: '1',
          type: '数学',
          list: [
            {
              name: 'SUM',
              desc: `加法：将每个参数相加`,
              fn: function () {},
            },
            {
              name: 'SUBTRACT',
              desc: `减法：将第一个数减去后面所有的数`,

              fn: function () {},
            },
            {
              name: 'MULTIPLY',
              desc: `乘法：将每个参数相乘`,

              fn: function () {},
            },
            {
              name: 'DIVIDE',
              desc: `除法：将第一个数除以后面所有的数`,

              fn: function () {},
            },
          ],
        },
      ],
      desc: '',
      activeKey: undefined,
      expressions: [
        // { expression: '', key: 2 },
      ],
      fields: [],
      customStyle: 'white-space: nowrap;font-size:12px;border-radius: 4px;border: 0;overflow: hidden',
    };
  },
  model: {
    prop: 'cusProp',
    event: 'cusEvent',
  },
  props: ['cusProp'],
  watch: {
    expressions: {
      handler: function () {
        this.$emit('cusEvent', this.expressions);
      },
      deep: true,
    },
  },

  methods: {
    rightPanelClicked(form) {
      // console.log('[form>>>]: ', form);
      const formfields = form.getFieldsValue();
      this.fields = Object.keys(formfields);
    },
    handleTagClick(item) {
      if (!this.activeKey) return; // 如果当前activeKey 为空,则不继续操作
      const index = this.expressions.findIndex((exp) => exp.key === this.activeKey);
      const _item = !this.expressions[index].expression ? item + '=' : item;
      this.insertContentToCursor(this.$refs['textarea'][index].$el, _item, index, false);
      // this.$refs['textarea'][index].focus();
    },

    handleAdd() {
      const key = new Date().getTime();
      this.activeKey = key; // 将当前活动textarea标记
      this.expressions.push({
        key: key,
        expression: '',
      });
    },
    handleDelete(key) {
      const index = this.expressions.findIndex((exp) => exp.key === key);
      this.expressions.splice(index, 1);
      // 如果当前activeKey和被删除的项key一致, 将activeKey置为空
      if (this.activeKey === key) {
        this.activeKey = undefined;
      }
    },

    handleFnClick(fnname, desc) {
      this.desc = desc;
      if (!this.activeKey) return; // 如果当前activeKey 为空,则不继续操作
      const index = this.expressions.findIndex((exp) => exp.key === this.activeKey);
      this.insertContentToCursor(this.$refs['textarea'][index].$el, fnname + '()', index, true);
    },

    /**
     * @params { HTMLTextAreaElement } textarea -  文本框(ref.$el)
     * @params { String } content  - 待插入的文本内容
     * @params { Number } index - expression 在 expressions 中的索引
     * @params { Boolean } isFunctionName - 是否是函数,如果是函数最后focus有-1位的偏移
     */
    insertContentToCursor(textarea, content, index, isFunctionName) {
      // debugger;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const frontContent = textarea.value.substring(0, start);
      const backContent = textarea.value.substring(end);
      this.expressions[index].expression = frontContent + content + backContent;

      let position = (frontContent + content).length;
      if (isFunctionName) {
        position = position - 1;
      }
      this.setCursorFocusPosition(textarea, position);
    },

    setCursorFocusPosition(textarea, index) {
      textarea.focus();
      this.$nextTick(() => {
        textarea.setSelectionRange(index, index);
      });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .ant-collapse-header {
  padding: 0px 18px !important;
  // padding-left: 16px !important;
}
::v-deep .ant-collapse-content.ant-collapse-content-active {
  white-space: break-spaces;
}

::v-deep .ant-collapse-arrow {
  left: 4px !important;
}
::v-deep .ant-btn-sm {
  font-size: 12px;
}
::v-deep .ant-alert-description {
  font-size: 12px !important;
}
.expression-root {
  background-color: #f5f6f6;
  padding: 5px 5px;
  min-height: 200px;
  div.operation-row {
    // margin-top: 5px;
    // width: 100px;
    // border: 1px solid green;

    display: flex;
    flex-wrap: nowrap;
    gap: 4px;
    main.operation-box {
      box-sizing: border-box;
      background-color: #fff;
      padding: 10px;

      line-height: 1.5;
      flex: 1;
      // width: 40%;
      .a-button {
        margin-bottom: 4px;
      }
      .operation-inner {
        display: flex;
        ::v-deep .ant-input {
          border-radius: unset;
        }
        .textarea {
        }
        .delete-icon {
          font-size: 10px;
          color: #ff4d4f;
          padding: 2px;
          // right: 10px;
          // top: 10px;
          // z-index: 1;
          // display: inline-block;
        }
      }
    }
    aside.tool-function-box {
      box-sizing: border-box;
      // border: 1px solid blue;
      width: 30%;
      min-width: 100px;
      .expression-function-wrapper {
        user-select: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        li {
          font-size: 10px;
          margin: 0;
          padding: 2px 4px;
          list-style: none;
          cursor: pointer;
          display: inline-block;
          width: 100%;
          background-color: #ececec;
          margin-top: 4px;
          border-radius: 5px;
          &:hover {
            background-color: #e0e0e0;
          }
        }
      }
    }
  }
}
</style>
