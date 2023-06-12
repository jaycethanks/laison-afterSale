<template>
  <!-- <a-icon type="check-circle" /> -->
  <div
    class="infoText"
    :class="{
      bordered,
      [type]: true,
      [size]: true,
    }"
  >
    <div class="text">
      <span>{{ text }}</span>
      <a-icon
        v-if="!noIcon"
        :type="
      type === 'success' ? 'check-circle' : 
      type === 'info' ? 'info' : 
      type === 'warn' ? 'warning' :
      type === 'error' ? 'close-circle' :
      type === 'light' ? 'exclamation' :
      type === 'primary' ? 'warn-bulb' :
      'alert' 
      "
      ></a-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'empty description text!'
    },
    type: {
      type: String,
      default: 'light'
    },
    size: {
      type: String,
      default: 'default'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
.infoText {
  border-radius: 0.375rem;
  &.small {
    padding: 0.3rem 0.5rem;
    font-size: 12px;
  }
  &.default {
    padding: 0.8rem 1rem;
    font-size: 14px;
  }
  &.large {
    padding: 1rem 1.5rem;
    font-size: 16px;
  }
  .text {
    span {
      margin-right: 0.4rem;
    }
  }
  &.success {
    background-color: #d1e7dd;
    color: #0a3622;
    &.bordered {
      border: 1px solid #a3cfbb;
    }
  }

  &.warn {
    background-color: #fff3cd;
    color: #664d03;
    &.bordered {
      border: 1px solid #ffe69c;
    }
  }

  &.error {
    background-color: #f8d7da;
    color: #58151c;
    &.bordered {
      border: 1px solid #f1aeb5;
    }
  }

  &.info {
    background-color: #cfe2ff;
    color: #052c65;
    &.bordered {
      border: 1px solid #9ec5fe;
    }
  }
  &.light {
    background-color: #fcfcfd;
    color: #495057;
    &.bordered {
      border: 1px solid #e9ecef;
    }
  }

  &.primary {
    background-color: #cfe2ff;
    color: #052c65;
    &.bordered {
      border: 1px solid #9ec5fe;
    }
  }
  &.secondary {
    background-color: #e2e3e5;
    color: #2b2f32;
    &.bordered {
      border: 1px solid #c4c8cb;
    }
  }
}
</style>
