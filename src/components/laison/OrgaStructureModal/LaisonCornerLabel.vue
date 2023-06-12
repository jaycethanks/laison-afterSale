<template>
  <div
    class="label-corner-slot"
    :text="text"
    :style="{
      '--pseudoElementFtColor': ftColor,
      '--pseudoElementFtSize': ftSize,
      '--pseudoElementbgColor': bgColor,
      '--pseudoElementScale': scale,
    }"
  ></div>
</template>
<script>
export default {
  name: 'LaisonCornerLabel',
  props: {
    text: {
      type: String,
      default: 'hello',
    },
    ftColor: {
      type: String,
      default: '#f40',
    },
    bgColor: {
      type: String,
      default: '#000',
    },
    ftSize: {
      type: String,
      default: '12px',
    },
    scale: {
      type: String,
      default: '0.8',
    },
  },
  created() {
    console.log(this.$attrs, '--line8')
  },
}
</script>

<style scoped>
/* 参考：https://blog.csdn.net/qq_43363884/article/details/104059654 */

/* 特别注意，该组件需要设定相对元素position 为relative */
.label-corner-slot {
  /* border: 1px solid red; */
}
.label-corner-slot::before {
  transform: rotate(311deg) scale(var(--pseudoElementScale));
  box-shadow: -1px 2px 2px 0px #00000030;
  top: 5px;
  left: -33px;
  padding: 0px 35px;
  content: attr(text);
  position: absolute;
  color: var(--pseudoElementFtColor);
  background-color: var(--pseudoElementbgColor);
  width: auto;
  font-size: var(--pseudoElementFtSize);
}
</style>
