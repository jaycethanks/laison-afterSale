<template>
  <div class="success-page-root">
    <header class="header-slot-area">
      <slot />
    </header>
    <div class="success-page-content">
      <successSvg style="width:200px;height:200px" />
      <InfoText :text="description" bordered type="success" size="small" />
    </div>
  </div>
</template>
<script>
import successSvg from  "./SuccessSvg.vue"
import InfoText from  "@/components/FlowForm/InfoText/index.vue"
export default {
  props: {
    description: {
      type: String,
      default: 'no data',
    },
  },
  data(){
    return {

    }
  },
  components:{
    successSvg,InfoText
  },

};
</script>
<style scoped lang="scss">
.success-page-root{
  position: relative;
  width: 100%;
  .header-slot-area{
    // position: absolute;

  }
  .success-page-content{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

}
</style>
