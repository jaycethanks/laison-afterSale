<template>
  <div class="icon-box" :class="[size]" :style="{ backgroundColor: bgc }">
    <img :src="getIcon(icon)" alt="" />
  </div>
</template>
<script>
import icons from '@/assets/flowform_icons/index.js';

export default {
  props: {
    bgc: {
      type: String,
    },
    size:{
      type: String,
      default:""
    },
    icon: {
      type: String,
    },
  },
  methods: {
    getIcon(iconName) {
      let iconObj = icons.find((it) => it.name === iconName);
      if (iconName && iconObj && iconObj.file) {
        return iconObj.file;
      }
      return null;
    },
  },
};
</script>
<style scoped lang="scss">
.icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: relative;
  img {
    width: 24px;
  }
}
.icon-box.small{
  width: 36px;
  height: 36px;
  img {
    width: 24px;
  }
}
</style>
