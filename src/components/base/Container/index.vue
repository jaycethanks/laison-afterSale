<template>
  <div class="container-root">
    <div class="container" :style="{maxWidth:maxWidth}">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props:{
    maxWidth:{
      type:String,
    }
  }
}
</script>

<style lang="css" scoped>
.container-root {
  height: 100%;
  width: 100%;
  padding: 10px;
}
.container {
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
