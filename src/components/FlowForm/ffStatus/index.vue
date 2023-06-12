<template>
  <span v-if="isTag">
    <a-tag :color="circulateStatus.color.bg_light"
      ><span :style="{color:circulateStatus.color.text}">{{ circulateStatus.label }}</span>
    </a-tag>
  </span>
  <span v-else>
    <div
      class="color-dot"
      :style="{
      display: 'inline-block',
      marginRight:'.5em',
      borderRadius:'100%',
      width:'10px',
      height:'10px',
      backgroundColor:circulateStatus.color.bg,
      outline:`2px solid ${circulateStatus.color.bg_light}`
      }
      "
    ></div>
    <span :style="{color:circulateStatus.color.text,fontSize:'12px'}">{{ circulateStatus.label }}</span>
  </span>
</template>
<script>
import baseStyle from "@/components/base/baseStyle.js"
const statuses = {
  0:{label:'草稿',color:baseStyle.$secondary},
  1:{label:'待审批',color:baseStyle.$primary},
  2:{label:'处理结束',color:baseStyle.$dark},
  3:{label:'已撤回',color:baseStyle.$warning},
  4:{label:'审批中',color:baseStyle.$info},
  5:{label:'驳回',color:baseStyle.$danger},
  6:{label:'变更',color:baseStyle.$success},
};
export default {
  props:{
    statusCode:{
      type:[String,Number]
    },
    isTag:{
      type:Boolean,
      default:false
    }

  },
  computed:{
    circulateStatus:function(){
      return statuses[this.statusCode]
    }
  },

}
</script>
<style></style>
