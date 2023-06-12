<template>
  <div class="title-row">
    <span
      class="title"
      :class="{ bold: bold, small: size === 'small', default: size === 'default', large: size === 'large' }"
      >{{ title }}</span
    >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.title {
  color: #252e36;
}
.title.bold {
  font-weight: bold;
}
.title.small {
  font-size: 14px;
}
.title.default {
  font-size: 16px;
}
.title.large {
  font-size: 17px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 0;
  /* border: 1px solid red; */
}
</style>
