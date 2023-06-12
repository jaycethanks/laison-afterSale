<template>
  <a-menu :inline-collapsed="collapsed" theme="light" class="menu-root" mode="inline" :default-selected-keys="['1']">
    <template v-for="{ path, icon, name, children } in menuConfig">
      <a-menu-item class="menu-item" :key="path" v-if="children.length === 0">
        <router-link :to="path">
          <a-icon :type="icon" />
          <span>{{ name }}</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu class="menu-root" v-if="children.length > 0" :key="path">
        <span slot="title"><a-icon :type="icon" />{{ collapsed ? '' : name }} </span>
        <template v-for="{ path: _path, icon: _icon, name: _name, hidden } in children">
          <a-menu-item class="menu-item" :key="_path" v-if="!hidden">
            <router-link :to="path + '/' + _path">
              <a-icon :type="_icon ? _icon : 'file'" />
              <span>{{ _name }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script>
import menuConfig from './menu.config';
console.log('[menuConfig]: ', menuConfig);
export default {
  props: ['collapsed'],
  components: {},
  data() {
    return {
      menuConfig: menuConfig,
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/components/base/base.scss';
::v-deep .ant-menu-item > a {
  color: inherit;
}
.menu-root {
  user-select: none;
  background-color: inherit;
  border: unset;
  color: inherit;
  .menu-item {
    color: inherit;
    background-color: inherit;
    &:hover {
      // font-weight: bold;
      background-color: $layout-aside-hover-bg;
    }
  }
}
</style>
