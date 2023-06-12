<template>
  <a-layout id="layout-root">
    <a-layout-sider theme="light" id="layout-aside" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <Logo :style="{ width: collapsed ? '18px' : '32px' }" />
        <div class="logo-text">
          <!-- 工单系统 -->
          <!-- <LogoText :style="{ height: collapsed ? '0' : '16px' }" /> -->
        </div>
      </div>
      <Menu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout id="layout-content-root">
      <LayoutHeader :collapsed="collapsed" @toggleSideEvent="collapsed = !collapsed" />
      <a-layout-content
        id="layout-content"
        :style="{ margin: '10px 10px', padding: '10px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Logo from '@/assets/svg_logo/FlowFormSvgIcon.vue';
import LogoText from '@/assets/svg_logo/FlowFormSvgText.vue';
import LayoutHeader from '../LayoutHeader';
import Menu from '../Menu';
export default {
  components: {
    Logo,
    LogoText,
    Menu,
    LayoutHeader,
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/components/base/base.scss';

#layout-root {
  height: 100vh;
  #layout-aside {
        max-width: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    // background-color: rgb(0, 3, 22);
    // color: $layout-aside-color;
  }
}

#layout-root .logo {
  height: 48px;
  // background: rgba(255, 255, 255, 0.2);
  // margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  svg {
    transition: all 0.3s ease;
  }
  .logo-text {
    // height: 32px;
    font-size: 18px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
