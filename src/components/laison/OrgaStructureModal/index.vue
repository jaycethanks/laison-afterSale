<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width + '%'"
    :modal-append-to-body="false"
    :before-close="handleClose"
    style="padding: 0 !important"
  >
    <div class="org-container">
      <el-card
        v-if="selectable"
        style="margin-bottom: 10px"
        class="box-card"
        shadow="never"
        :body-style="{
          padding: '10px',
          maxHeight: '15vh',
          overflowY: 'auto',
          minHeight: tagWrapperMinHeight + 'px',
        }"
      >
        <span v-for="(item, index) in tags" :key="index">
          <!-- prettier-ignore -->
          <el-tag
          v-for="tag in item.taglist"
          :key="tag.id"
          :size="elementSize"
          closable
          :type="item.type === 'dept' ? 'success' : item.type === 'role' ? 'warning' : item.type === 'person' ? 'info' : 'error'"
          :style="{ margin: tagMargin }"
          @close="handleTagClose(item.type,tag)"
        >
          {{tag['name']}}
        </el-tag>
        </span>
      </el-card>
      <!-- ********************************************** Top Card End ********************************************** -->

      <el-card class="box-card" shadow="never" :body-style="{ padding: '10px' }">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <el-radio-group v-model="radio" :size="elementSize" @change="onRadioChange">
            <el-radio-button v-if="!disableDept" label="dept">部门</el-radio-button>
            <el-radio-button v-if="!disableRole" label="role">角色</el-radio-button>
            <el-radio-button v-if="!disablePerson" label="person">人员</el-radio-button>
          </el-radio-group>
          <el-input
            style="width: 200px"
            :placeholder="serachPlaceHolder"
            prefix-icon="el-icon-search"
            v-model="tree.filterText"
            :size="elementSize"
            clearable
            @clear="handleSearchClear"
          >
          </el-input>
        </div>

        <div :class="{ 'person-display-mode': tree.personControlFlag }">
          <div style="margin: 10px; overflow-y: auto; max-height: 38vh;min-height: 38vh; flex: 1">
            <div
              v-if="tree.personControlFlag"
              style="height: 26px"
              class="all-member-item"
              @click="handlerAllMemberItemClick"
            >
              <!-- <i
                :style="{
                  color: '#409EFF',
                }"
                class="el-icon-collection"
              ></i> -->
              <!-- prettier-ignore -->
              <svg style="vertical-align: middle;" t="1641873835753" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3532" width="16" height="16"><path d="M804.08 612.936c15.12 7.56 22.68 20.424 22.68 38.56l0 146.296 0 26.096c0 11.328-3.4 21.16-10.2 29.48-6.808 8.312-15.504 12.488-26.088 12.488L233.616 865.856c-9.832 0-18.152-4.168-24.952-12.488-6.808-8.32-10.208-18.152-10.208-29.48l0-26.096L198.456 651.504c0-18.144 7.56-31 22.688-38.56l156.504-72.584L438.888 512c-28.728-17.392-50.656-42.336-65.776-74.848-14.368-28.736-21.552-59.352-21.552-91.864 0-9.832 0.752-19.28 2.272-28.352s3.4-17.768 5.672-26.088c10.584-38.552 29.672-70.312 57.272-95.264 27.592-24.944 59.536-37.424 95.832-37.424 37.048 0 69.568 12.848 97.536 38.552 27.976 25.712 46.88 58.216 56.704 97.536 3.792 18.896 5.68 35.912 5.68 51.032 0 30.24-6.056 59.36-18.144 87.328-15.128 34.024-37.056 59.736-65.784 77.12l64.64 30.624L804.08 612.936 804.08 612.936zM198.456 565.304c-16.632 7.552-29.672 19.096-39.128 34.584-9.448 15.504-14.176 32.704-14.176 51.608l0 146.296L28.336 797.792c-8.32 0-15.128-3.2-20.416-9.64-5.296-6.424-7.944-14.544-7.944-24.376L-0.024 625.416c0-16.64 6.048-27.224 18.144-31.76L193.92 512c-21.168-12.848-38.176-31.184-51.032-55.008-12.848-23.816-19.28-50.472-19.28-79.952 0-20.416 3.4-39.88 10.208-58.408 6.808-18.52 16.072-34.592 27.784-48.2 11.72-13.608 25.328-24.384 40.832-32.32 15.496-7.936 32.32-11.904 50.472-11.904 12.096 0 23.44 1.888 34.024 5.664 10.584 3.784 20.792 8.696 30.616 14.752-12.848 31.752-19.28 64.64-19.28 98.664 0 26.472 3.784 51.984 11.344 76.552 7.56 24.568 18.144 46.688 31.752 66.344-8.312 9.08-17.008 16.256-26.08 21.544L198.456 565.304zM1010.48 593.656c12.096 6.048 18.152 16.64 18.152 31.76l0 138.368c0 9.832-2.648 17.952-7.936 24.376-5.296 6.44-12.104 9.64-20.424 9.64l-120.208 0L880.064 651.504c0-18.904-4.736-36.112-14.176-51.608-9.456-15.504-22.12-27.032-37.992-34.592L715.616 512c-10.584-6.048-20.8-14.744-30.624-26.088 12.856-19.656 22.872-41.4 30.056-65.208 7.184-23.824 10.776-48.952 10.776-75.424 0-17.384-1.504-34.024-4.528-49.896-3.032-15.872-7.56-31.376-13.608-46.496 9.832-6.808 20.408-12.288 31.76-16.448 11.336-4.16 23.056-6.232 35.16-6.232 18.152 0 35.16 3.968 51.032 11.904 15.88 7.936 29.68 18.712 41.4 32.32s20.976 29.68 27.784 48.2c6.816 18.52 10.208 37.992 10.208 58.408 0 28.728-6.432 55-19.28 78.824s-29.112 42.16-48.768 55.008L1010.48 593.656 1010.48 593.656z" p-id="3533" fill="#409EFF"></path></svg>
              全部人员
            </div>
            <el-tree
              @node-expand="nodeExpand"
              @node-collapse="nodeCollapse"
              @check="handleNodeCheck"
              @node-click="handleNodeClick"
              ref="tree"
              :filter-node-method="filterNode"
              :props="tree.dynamicProps"
              :data="tree.nodes"
              :expand-on-click-node="!tree.personControlFlag"
              :show-checkbox="selectable && !tree.personControlFlag"
              default-expand-all
              :icon-class="tree.nodeIcon"
              node-key="id"
            >
            </el-tree>
          </div>
          <div
            v-if="tree.personControlFlag"
            class="person-list"
            style="margin: 10px; overflow-y: auto; max-height: 38vh;min-height: 38vh; flex: 1"
            :style="{ overflowY: isloading ? 'hidden' : 'auto' }"
          >
            <div class="person-list-wrapper">
              <!-- prettier-ignore -->
              <el-checkbox-group ref='per' :min="minPerson" :max="maxPerson"  v-model="tree.data.person.checkedlist" style="font-size: unset;" @change="handlePersonCheckGroupChange">
                <!-- 加载状态Start -->
               
                <div v-if="isloading" v-loading="isloading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" style="height:40px;padding-bottom:10px;display:flex;justify-content:center;align-items:center"></div>
                <div v-if="!isloading && tree.data.person.checkSrc.length === 0" style="margin:10px;height:20px;text-align:center">数据为空</div>
                  <!-- 加载状态End -->

                <div class="list-item" v-for="i in tree.data.person.checkSrc" :key="i.id">
                  <el-checkbox :label="i"><i :style="{color:i.sex ? '#93b5cf' : '#93b5cf',marginRight:'10px'}" class="el-icon-user-solid"></i>{{i.name}}
                  </el-checkbox>
                    <div v-if="ifShowPersonPhone" class="phone-label">{{ i.phoneNumber }}</div>
                    <div v-if="i.manageFlag" class="position-label">部门领导</div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </el-card>

      <!--  ********************************************** Bottom Card End  **********************************************-->
    </div>
    <span slot="footer" class="dialog-footer" v-if="selectable">
      <el-button :size="elementSize" @click="handleClose">取 消</el-button>
      <el-button :size="elementSize" type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'OrgaStructureModal',
  props: {
    value: {
      type: Array,
    },
    title: {
      type: String,
      default: '组织架构',
    },
    elementSize: {
      type: String,
      default: 'mini',
    },
    breadcrumbFontSize: {
      type: String,
      default: '14px',
    },
    breadcrumbOmit: {
      type: Number,
      default: 5,
    },
    width: {
      type: Number,
      default: 50,
    },
    serachPlaceHolder: {
      type: String,
      default: '请输入内容',
    },
    tagMargin: {
      type: String,
      default: '0 5px 5px 0',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    ifShowPersonPhone: {
      type: Boolean,
      default: true,
    },
    tagWrapperMinHeight: {
      type: Number,
      default: 48,
    },

    disableDept: {
      type: Boolean,
      default: false,
    },
    disableRole: {
      type: Boolean,
      default: false,
    },
    disablePerson: {
      type: Boolean,
      default: false,
    },
    initType: {
      // 要定义在disable x Type 之后才能访问到！
      type: String,
    },
    minPerson: {
      type: Number,
    },
    maxPerson: {
      type: Number,
    },
    deptType: {
      type: String,
      default: undefined,
    },
  },
  model: {
    event: 'cusEvent',
    prop: 'value',
  },
  data() {
    return {
      visible: false,
      radio: undefined, //init 哪一个tab首次显示，以及后续控制
      isloading: false,
      tree: {
        filterText: '',
        filterTargetField: '',
        personControlFlag: this.radio === 'person' ? true : false,
        nodeIcon: '',
        // tree Start
        nodes: [],
        defaultExpandedKeys: [],
        dynamicProps: {
          children: 'children',
          label: (data, node) => {
            return data.name;
          },
        },
        data: {
          dept: { src: [], checkedlist: [] },
          role: { src: [], checkedlist: [] },
          person: { src: [], checkSrc: [], checkedlist: [] },
        },
        checked2: false,
      },
      tags: [
        { type: 'dept', taglist: [] },
        { type: 'role', taglist: [] },
        { type: 'person', taglist: [] },
      ],
      outValue: [],

      allUserList: [],
    };
  },

  watch: {
    'tree.filterText': {
      handler: function (val) {
        if (val == '') {
          this.tree.data.person.checkSrc = this.allUserList;
        }
        if (this.radio === 'person') {
          this.tree.data.person.checkSrc = this.allUserList.filter((it) => it.name.includes(val));
          return;
        }
        this.$refs.tree.filter(val);
      },
    },
    'tree.data.person.checkedlist': {
      //同步person checked list to person taglist
      handler: function (val) {
        this.tags[this.tags.length - 1].taglist = val;
      },
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    show() {
      this.init();
      this.visible = true;

      // tags 置空
      this.tags.forEach((v) => {
        v.taglist = [];
      });

      // checkbox group 置空
      for (let key in this.tree.data) {
        this.tree.data[key].checkedlist.splice(0, this.tree.data[key].checkedlist.length);
      }

      if (this.value && this.value.length === 0) {
        // 如果没有传入初始值,那么将缓存置为空
        this.outValue = [];
        // 并停止后续操作
        return;
      } else if (this.value && this.value.length > 0) {
        this.outValue = this.value;
      }

      // reset 回显值
      let typeArray = ['dept', 'role', 'person'];
      if (this.outValue && this.outValue.length > 0) {
        let index = 0;
        this.outValue.forEach((h) => {
          index = 3 - h.type;
          // set tags
          this.tags[index].taglist.push(h);
          // [bugfix]checkbox 绑定的是一个对象, 所以这里要从原始数据中找到对应的对象去回显
          let target;
          if (h.type === 1) {
            // person
            target = this.tree.data[typeArray[index]].checkSrc.find((a) => a.id == h.id);
          } else if (h.type === 2) {
            // role
            target = this.tree.data[typeArray[index]].src.find((a) => a.id == h.id);
          } else if (h.type === 3) {
            // dept
            target = h;
          }
          this.tree.data[typeArray[index]].checkedlist.push(target);
        });
        // 如果是角色和部门,需要额外调用 setCheckedNodes
        this.$nextTick(() => {
          console.log('[this.radio]: ', this.radio);
          if (this.radio === 'role') {
            this.setCheckedKeys(this.tree.data.role.checkedlist.map((it) => it.id));
          } else if (this.radio === 'dept') {
            this.setCheckedKeys(this.tree.data.dept.checkedlist.map((it) => it.id));
          }
          // this.setCheckedNodes(this.tree.data.role.checkedlist);
          // this.setCheckedNodes(this.tree.data.dept.checkedlist);
        });
      }
    },

    computedInitType() {
      if (this.initType) {
        return this.initType;
      }
      // 如未指定initType prop
      let arr = ['dept', 'role', 'person'];
      this.disableDept && deleteElement(arr, 'dept');
      this.disableRole && deleteElement(arr, 'role');
      this.disablePerson && deleteElement(arr, 'person');
      function deleteElement(arr, target) {
        let _i = arr.findIndex((it) => it === target);
        arr.splice(_i, 1);
      }
      return arr[0];
    },
    async loadData() {
      const {departments,roles,users} = this.$store.state.flowform.organizationStructure
      // let res = (await getDeptListByType({ deptType: this.deptType })).data
      // this.tree.data.dept.src = res
      // this.tree.data.role.src = (await getRoleList()).data
      // this.tree.data.person.src = JSON.parse(JSON.stringify(res))
        this.tree.data.dept.src = departments;
        this.tree.data.role.src = roles;
        this.tree.data.person.src = departments;

        this.allUserList = users;
        this.tree.data.person.checkSrc = this.allUserList;
    },
    init() {
      this.radio = this.computedInitType();
      this.setFilterTargetField('name');
      this.tree.nodes = this.tree.data[this.radio].src;
      this.tree.personControlFlag = this.computedInitType() === 'person' ? true : false;
    },
    handleClose(done) {
      this.visible = false;
    },
    handleOk() {
      this.outValue = this.getOutvalue();
      this.$emit('cusEvent', this.outValue);
      this.visible = false;
    },
    getOutvalue() {
      let arr = [];
      let tempTags = JSON.parse(JSON.stringify(this.tags));
      tempTags.forEach((it) => {
        const taglist = it.taglist;
        switch (it.type) {
          case 'dept':
            taglist.forEach((item) => {
              item.type = 3;
            });
            break;
          case 'role':
            taglist.forEach((item) => {
              item.type = 2;
            });
            break;
          case 'person':
            taglist.forEach((item) => {
              item.type = 1;
            });
            break;
        }
        arr = arr.concat(taglist);
      });
      return arr;
    },
    reset() {
      this.radio = this.computedInitType();
      this.tree.personControlFlag = this.computedInitType() === 'person' ? true : false;
      this.tree.data = {
        dept: { src: [], checkedlist: [] },
        role: { src: [], checkedlist: [] },
        person: { src: [], checkSrc: [], checkedlist: [] },
      };
      this.tags = [
        { type: 'dept', taglist: [] },
        { type: 'role', taglist: [] },
        { type: 'person', taglist: [] },
      ];
      this.setCheckedNodes([]);
    },

    setFilterTargetField(label) {
      this.tree.filterTargetField = label;
    },
    /**
     *
     ***********************************************  Custom Methods END **********************************************
     *
     * */

    onRadioChange(e) {
      this.setFilterTargetField('name'); // set label
      this.tree.nodes = this.tree.data[e].src; // set current tree nodes

      this.$nextTick(() => {
        this.setCheckedNodes(this.tree.data[e].checkedlist); //回显当前tree 选中状态
      });
      this.tree.personControlFlag = e === 'person' ? true : false;
    },
    handleSearchClear() {
      if (this.radio === 'person') {
        this.tree.data.person.checkSrc = mockmember.data;
      }
    },
    /**
     *
     *********************************************** Radio Component Methods END **********************************************
     *
     * */

    nodeExpand(currentNode, nodeStatus, nodeInstance) {
      let label = currentNode[this.tree.filterTargetField];
    },
    nodeCollapse(currentNode, nodeStatus, nodeInstance) {
      let label = currentNode[this.tree.filterTargetField];
    },
    filterNode(value, data) {
      // label 值是变化的
      if (!value) return true;
      return data[this.tree.filterTargetField].indexOf(value) !== -1;
    },
    handleNodeCheck(currentNode, nodeStatus) {
      //nodeStatus : checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys
      // prettier-ignore

      this.tree.data[this.radio].checkedlist = this.getCheckedNodes(); //更新checklist
      let tag = this.tags.find((it) => it.type === this.radio);
      tag.taglist = nodeStatus.checkedNodes; //更新taglist
    },
    setCheckedNodes(arr) {
      this.$refs.tree.setCheckedNodes(arr);
    },
    setCheckedKeys(arr) {
      this.$refs.tree.setCheckedKeys(arr);
    },
    getCheckedNodes() {
      this.$forceUpdate();
      return this.$refs.tree.getCheckedNodes();
    },
    async handleNodeClick(currentNode, node, nodeInstance) {
      if (this.radio === 'person') {
        this.isloading = true;
        this.tree.data.person.checkSrc = [];
        // let res = (await getUserListByDeptId(currentNode.id)).data;
        // setTimeout(() => {
        this.isloading = false;
        this.tree.data.person.checkSrc = this.computeUseUnderDepartment(currentNode.id);
        this.tree.data.person.checkedlist = this.tags[this.tags.length - 1].taglist;

        // problem solve
        // checkbox 关联的值是一个个对象， 是引用类型， 接口返回的对象，和已存在taglist 中的对象引用不同，因此无法回显
        // 解决办法,将接口返回的对象替换
        // 每次点击都会返回一个数组， 长度不定， 但是taglist 已经选择列表是确定的，需要做的是 判断如果taglist 中有元素存在于返回列表，就将返回列表中对应的元素替换掉
        // 本地checklist 和taglist 是同步的，因此无需操作。
        this.tags[this.tags.length - 1].taglist.forEach((it) => {
          let targetIndex = res.findIndex((_it) => _it.id === it.id);
          if (targetIndex != -1) {
            res[targetIndex] = it;
          }
        });
        // 以上解决仅解决了 点击tree节点项时的回显 从全部人员list 中选取的情况， 接口返回的和taglist checklist 中选取的不同，
        // 还需要解决 点击全部人员list 从tree节点点击选取的回显，
      }

      return;
    },
    computeUseUnderDepartment(id) {
      return this.allUserList.filter((it) => it.deptId === id);
    },

    /**
     *
     *********************************************** Tree Component Methods END **********************************************
     *
     * */

    handlePersonCheckGroupChange(val) {
      // console.log(val, "--line303");
    },
    handlerAllMemberItemClick() {
      this.tree.data.person.checkSrc = this.allUserList;
      // problem solve
      // 解决 点击全部人员list 从tree节点点击选取的不回显问题
      this.tags[this.tags.length - 1].taglist.forEach((it) => {
        let targetIndex = this.tree.data.person.checkSrc.findIndex((_it) => _it.id === it.id);
        if (targetIndex != -1) {
          this.tree.data.person.checkSrc[targetIndex] = it;
        }
      });
      // this.tree.data.person.checkSrc.forEach()
    },
    /**
     *
     *********************************************** CheckboxGroup Component Methods END **********************************************
     *
     * */

    handleTagClose(itemType, targetNode) {
      // problem solve
      // 解决处于其他radio时，删除其他radio 下的tag 问题
      let currentNodes;
      if (itemType !== this.radio) {
        currentNodes = this.tree.data[itemType].checkedlist;
      } else {
        currentNodes = this.getCheckedNodes();
      }

      /** 删除某个节点(tag)时有一些规则：*/
      if (itemType === 'person') {
        /** 1.radio 为 person 时的逻辑不同于两外的radio */
        let index = this.tree.data.person.checkedlist.findIndex((it) => it.id === targetNode.id);
        this.tree.data.person.checkedlist.splice(index, 1); // tags 中的数据由watch tree.data.person.checkedlist 自动刷新， 因此仅需要删除 checkedlist 中对应的项即可完成同步。 checkbox group 和 tags 都是按值驱动的
      } else if (!targetNode.isLeaf && targetNode.isLeaf != undefined) {
        /** 2.如果删除的是父节点，先删除该父节点，然后删除该节点下的所有子节点 */
        this.deleteTargetTag(targetNode, itemType);
        this.deleteCheckedNode(targetNode, currentNodes, itemType);
        // prettier-ignore
        targetNode.children != undefined && targetNode.children.forEach((subitem) => {//isLeaf 为false 时， children 属性存在
            this.deleteTargetTag(subitem,itemType);
            this.deleteCheckedNode(subitem,currentNodes,itemType);
          });
      } else {
        /** 3.如果删除的是某个子节点时，父节点需要一并删除  */
        // let currentNodes = this.getCheckedNodes()
        // prettier-ignore
        let fatherNode = currentNodes.find((it) => it.id === targetNode.parentId); //找到父节点，并删除
        this.deleteCheckedNode(targetNode, currentNodes, fatherNode, itemType);
        this.deleteTargetTag(targetNode, itemType, fatherNode);
      }
    },
    deleteTargetTag(targetNode, itemType, fatherNode) {
      let tagObj = this.tags.find((it) => it.type === itemType);
      // let tagObj = this.tags.find((it) => it.type === this.radio)
      // prettier-ignore
      let index;
      index = tagObj.taglist.findIndex((it) => it.id === targetNode.id);
      index != -1 && tagObj.taglist.splice(index, 1);
      if (fatherNode != undefined) {
        index = tagObj.taglist.findIndex((it) => it.id === fatherNode.id);
        console.log(index, '--line289');
        index != -1 && tagObj.taglist.splice(index, 1);
      }
    },
    deleteCheckedNode(targetNode, currentNodes, fatherNode, itemType) {
      // let currentNodes = this.getCheckedNodes()
      let index;
      index = currentNodes.findIndex((it) => it.id === targetNode.id);
      index != -1 && currentNodes.splice(index, 1);
      if (fatherNode != undefined) {
        index = currentNodes.findIndex((it) => it.id === fatherNode.id);
        index != -1 && currentNodes.splice(index, 1);
      }
      this.$nextTick(() => {
        if (itemType === this.radio) {
          this.setCheckedNodes(currentNodes); // 如果删除的tag是当前radio对应的， 那么就重新setCheckedNodes, 否则， 就不要去set
        }
      });
    },

    /**
     *
     *********************************************** Tag Components Methods END **********************************************
     *
     * */

    /**
     *
     *********************************************** utils function **********************************************
     *
     * */
    omit(str) {
      if (str.length > this.breadcrumbOmit) {
        return str.slice(0, this.breadcrumbOmit) + '...';
      } else {
        return str;
      }
    },
  },
};
</script>
<style scoped>
>>> .el-dialog__header {
  padding: 10px;
  padding-bottom: 0;
}
>>> .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
>>> .el-dialog__footer {
  padding: 10px;
  padding-top: 0;
}
>>> .el-dialog__body {
  padding: 10px;
}
>>> .el-dialog__body ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  overflow: auto;
  float: left;
  margin: 0 10px;
  border-radius: 5px;
}
>>> .el-dialog__body ::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 5px;
}
.org-container {
  width: 100%;
  height: auto;

  /* background-color: #f40; */
  /* display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  flex-direction: column; */
  /* gap: 10px; */
}
>>> .el-radio-group {
  /* display: flex; */
}
>>> label.el-radio-button {
  /* flex: 1; */
}
>>> span.el-radio-button__inner {
  /* display: block; */
  user-select: none;
}
.person-display-mode {
  display: flex;
  justify-content: center;
  align-items: space-between;
}
.person-list {
  background-color: #f6f6f6ad;
  height: 100%;
  /* padding: 10px; */
}
.list-item {
  width: calc(100% - 10px);
  background-color: #fff;
  border-radius: 5px;
  height: 45px;
  margin: 5px 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-right: 20px; */
}
.list-item:hover,
.all-member-item:hover {
  background-color: #f5f7fa;
}
.phone-label {
  color: rgb(165, 165, 165);
}
.position-label {
  color: #409eff;
}
.all-member-item {
  color: #606266;
  padding: 2px 10px;
}
</style>
