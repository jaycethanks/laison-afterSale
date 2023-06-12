<template>
  <div>
    <!-- <el-card shadow="never" :body-style="{ padding: '0' }"> -->
    <div class="person-incharge-wrapper" @click="handleClick" :style="{ minHeight: minHeight + 'px' }">
      <template v-for="item in sonCustomProp">
        <el-tag
          size="small"
          style="margin: 0 5px 5px 0"
          :type="item.type === 3 ? 'success' : item.type === 2 ? 'warning' : item.type === 1 ? 'info' : 'error'"
          :key="item.id"
          >{{ item.name }}</el-tag
        >
      </template>
      <!-- prettier-ignore -->
      <div class="add-person-inchage-icon-mask" >
          <i class="el-icon-plus"></i>
        </div>
    </div>
    <!-- </el-card> -->

    <orga-structure-modal
      :disableDept="disableDept"
      :disableRole="disableRole"
      :disablePerson="disablePerson"
      v-model="sonCustomProp"
      ref="orgaModal"
    />
  </div>
</template>
<script>
import OrgaStructureModal from '@/components/laison/OrgaStructureModal/index.vue';

export default {
  name: 'OrgSelectionModal',
  components: {
    OrgaStructureModal,
  },
  computed: {},
  props: ['customProp', 'minHeight', 'approvalType'],
  model: {
    prop: 'customProp',
    event: 'customEvent',
  },
  data() {
    return {
      visible: false,
      sonCustomProp: null,
      disableDept: true,
      disableRole: true,
      disablePerson: true,
      cache: null,
    };
  },
  watch: {
    customProp: {
      handler: function () {
        if (this.sonCustomProp !== this.customProp && this.customProp) {
          this.sonCustomProp = JSON.parse(JSON.stringify(this.customProp));
        }
      },
      immediate: true,
    },
    sonCustomProp: {
      handler: function () {
        this.$emit('customEvent', this.sonCustomProp);
      },
      immediate: true,
    },
    approvalType: {
      handler: function () {
        this.disablePerson = true;
        this.disableDept = true;
        this.disableRole = true;
        if (this.sonCustomProp && this.sonCustomProp.length > 0) {
          // 缓存初始值
          this.cache = { [this.sonCustomProp[0].type]: this.sonCustomProp };
        }
        this.$emit('customEvent', []);
        switch (this.approvalType) {
          // 提高该组件复用性,单独使用时,如果需要允许多类型选择,可以通过传入静态的 approvalType:'multiple'开启
          case 'multiple':
          // case 'applicant':
            this.disablePerson = false;
            this.disableDept = false;
            this.disableRole = false;

          case 'people':
            this.disablePerson = false;
            if (this.cache && '1' in this.cache) {
              this.$emit('customEvent', this.cache['1']);
            }
            break;
          case 'role':
            this.disableRole = false;
            if (this.cache && '2' in this.cache) {
              this.$emit('customEvent', this.cache['2']);
            }
            break;
          case 'department':
            this.disableDept = false;
            if (this.cache && '3' in this.cache) {
              this.$emit('customEvent', this.cache['3']);
            }
            break;
        }
      },
      immediate: true,
    },
  },

  methods: {
    handleClick() {
      this.$refs.orgaModal.show();
    },
  },
};
</script>
<style scoped>
.person-incharge-wrapper {
  position: relative;
  border: 1px dashed #d9d9d9;
  padding: 16px;
}
.person-incharge-wrapper:hover {
  /* background-color: #00000009; */
  border: 1px dashed #008eff;
}
.add-person-inchage-icon-mask {
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff0a;
}
.add-person-inchage-icon-mask i {
  color: #00000066;
  font-size: 19px;
  /* font-weight: bold; */
}
.add-person-inchage-icon-mask:hover {
  transition: all 0.3s;
  background-color: #ffffff26;
  backdrop-filter: blur(1px);
  transition: all 0.3s ease;
}
.add-person-inchage-icon-mask:hover i {
  color: #008eff;
}
</style>
