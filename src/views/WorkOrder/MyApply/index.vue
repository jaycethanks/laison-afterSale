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
      return FLOWFORM_PLATFORM_ADDRESS + `/platform/workorder/myapply?uniTenantId=${UNI_TENANT_ID}&bizToken=${token}`
    }
  },
}
</script>
<style scoped>
iframe{
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23000000" x="50%" y="50%" font-family="\'Loading...\', sans-serif" font-size="24" text-anchor="middle">PLACEHOLDER</text></svg>') 0px 0px no-repeat;
}
</style>
