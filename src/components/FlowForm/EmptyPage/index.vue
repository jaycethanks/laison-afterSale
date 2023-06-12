<template>
  <a-empty :image="simpleImage" :description="description" />
</template>
<script>
import { Empty } from 'ant-design-vue';
export default {
  props: {
    description: {
      type: String,
      default: 'no data',
    },
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
};
</script>
<style scoped lang="scss">
::v-deep.ant-empty {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>
