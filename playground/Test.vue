<template>
  <div>
    <h1>test</h1>
    <a-button @click="test">test</a-button>
  </div>
</template>
<script>
import { add } from '@/api/system/processFormTemplate.js';
export default {
  data() {
    return {
      current: 0,
    };
  },

  methods: {
    test() {
      add({ templates: 'askjdhaksbdkhas' }).then((r) => {
        console.log('[r]: ', r);
      });
    },
  },
  mounted() {
    // this.$refs.cusf.$data.exposeFields.price.disabled = true;
    // this.$refs.cusf.$data.exposeFields.userName.hidden = true;
    // console.log('[this.$refs.cusf]: ', this.$refs.cusf.$data.exposeFields.price.disabled);
  },
};
</script>
