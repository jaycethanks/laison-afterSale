<template>
  <iframe :src="src" frameborder="0"></iframe>
</template>
<script>
const FLOWFORM_PLATFORM_ADDRESS = process.env.VUE_APP_FLOWFORM_ADDRESS
const UNI_TENANT_ID = process.env.VUE_APP_UNITENANT
export default {
  computed:{
    src:function(){
      const token = cusLocalStorage.getItem('system', 'access_token');
      return FLOWFORM_PLATFORM_ADDRESS + `/platform/workorder/mydone?uniTenantId=${UNI_TENANT_ID}&bizToken=${token}`
    }
  },
}
</script>
<style scoped>
iframe{
  width: 100%;
  height: 100%;
}
</style>
