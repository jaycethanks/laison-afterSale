<template>
  <router-view></router-view>
</template>
<script>
export default {};
</script>
<style>
/* 滚动条 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  overflow: auto;
  float: left;
  margin: 0 10px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  background: #f0f0f082;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background: #aaaaaa82;
  border-radius: 10px;
}
</style>
