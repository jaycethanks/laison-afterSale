<template>
  <div class="components-input-demo-presuffix">
    <a-input
      ref="userNameInput"
      v-model="exposeFields.userName.value"
      v-if="!exposeFields.userName.hidden"
      :disabled="exposeFields.userName.disabled"
      placeholder="Basic usage"
    >
      <a-icon slot="prefix" type="user" />
      <a-tooltip slot="suffix" title="Extra information">
        <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip>
    </a-input>
    <br />
    <br />
    <a-input
      v-model="exposeFields.price.value"
      v-if="!exposeFields.price.hidden"
      :disabled="exposeFields.price.disabled"
      prefix="￥"
      suffix="RMB"
    />
  </div>
</template>

<script>
export default {
  name: 'exposeFields',
  props:['value'],
  data() {
    return {
      name: 'CustomFields',
      exposeFields: {
        userName: {
          value: '',
          disabled: false,
          hidden: false,
        },
        price: {
          value: '',
          disabled: false,
          hidden: false,
        },
      },
    };
  },
  watch:{
    value:{
      handler:function(){
        if(!this.value) return
        const { userName,price } = this.value
        this.exposeFields.userName.value = userName;
        this.exposeFields.price.value = price;
      },
      immediate:true,
      deep:true,
    },
    exposeFields:{
      handler:function(){
        const {userName,price} = this.exposeFields
        this.$emit("change",{userName:userName.value,price:price.value})
      },
      immediate:true,
      deep:true,
    }
  }


};
</script>
