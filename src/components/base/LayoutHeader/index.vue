<template>
  <a-layout-header id="layout-header-root">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => $emit('toggleSideEvent')" />
    <aside>
      <a-dropdown>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()"> 欢迎, 管理员 </a>
        <a-menu class="menu" slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1" @click="logoutHandle"> <a-icon type="logout" /> 退出 </a-menu-item>
        </a-menu>
      </a-dropdown>
    </aside>
  </a-layout-header>
</template>
<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleMenuClick() {},
    logoutHandle() {
      this.$store.commit('SET_TOKEN', undefined);
      this.$store.commit('SET_USER', null);

      this.$router.push('/login');
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/components/base/base.scss';
#layout-header-root {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: $layout-header-height;
  font-size: 12px;
  .ant-dropdown-link {
    padding: 1rem;
    &:hover {
      background-color: $hover-bg;
    }
  }
}
::v-deep .ant-dropdown-menu-item {
  font-size: 12px;
}
.trigger {
  font-size: 18px;
  line-height: $layout-header-height;
  height: $layout-header-height;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
