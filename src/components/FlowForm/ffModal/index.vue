<template>
  <a-modal v-model="visible" title="Basic Modal" @ok="handleOk" @cancel="handleCancle">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script>
// import modalMixin from '@/mixins/modalMixin.js';
export default {
  mixins: [modalMixin],
  data() {
    return {
      visible: false,
    };
  },
  props: {
    modalVisable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    handleOk(e) {
      this.$emit('ok');
    },
    handleCancle() {
      this.$emit('cancel');
    },
  },
};
</script>
