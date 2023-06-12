<!--
 * @Description: 日期选择器
 * @Author: kcz
 * @Date: 2020-01-11 15:38:28
 * @LastEditors: kcz
 * @LastEditTime: 2020-03-28 17:37:49
    //@jayce 23/05/11-14:46:12 : 支持多语言
 -->

<template>
  <!-- 月份选择 -->
  <a-month-picker
    :style="`width:${record.options.width}`"
    v-if="record.type === 'date' && record.options.format === 'YYYY-MM' && record.options.range === false"
    :disabled="record.options.disabled || parentDisabled"
    :allowClear="record.options.clearable"
    :placeholder="record.options.placeholder"
    :format="record.options.format"
    @change="handleSelectChange"
    :value="date"
    :locale="locales[formConfig.currentLang]"
  />

  <!-- 日期选择 -->
  <a-date-picker
    :style="`width:${record.options.width}`"
    v-else-if="record.type === 'date' && record.options.range === false"
    :disabled="record.options.disabled || parentDisabled"
    :show-time="record.options.showTime"
    :allowClear="record.options.clearable"
    :placeholder="record.options.placeholder"
    :format="record.options.format"
    @change="handleSelectChange"
    :value="date"
    :locale="locales[formConfig.currentLang]"
  />
  <!-- @jayce 23/05/11-15:23:05 : +locale -->
  <!-- 范围日期选择 -->
  <a-range-picker
    :style="`width:${record.options.width}`"
    v-else-if="record.type === 'date' && record.options.range === true"
    :show-time="record.options.showTime"
    :disabled="record.options.disabled || parentDisabled"
    :allowClear="record.options.clearable"
    :placeholder="record.options.rangePlaceholder"
    :format="record.options.format"
    @change="handleSelectChange"
    :value="date"
    :locale="locales[formConfig.currentLang]"
  />
</template>
<script>
import moment from 'moment';
import zh from 'ant-design-vue/es/date-picker/locale/zh_CN';
import en from 'ant-design-vue/es/date-picker/locale/en_US';
import fr from 'ant-design-vue/es/date-picker/locale/fr_FR';
import pt from 'ant-design-vue/es/date-picker/locale/pt_BR';
import ar from 'ant-design-vue/es/date-picker/locale/ar_EG';
import 'moment/locale/zh-cn';
import 'moment/locale/en-ca';
import 'moment/locale/ar';
import 'moment/locale/fr';
import 'moment/locale/pt';
export default {
  // eslint-disable-next-line vue/require-prop-types
  //@jayce 23/05/11-15:01:36 : + props.formConfig
  props: ['record', 'value', 'parentDisabled', 'formConfig'],

  data() {
    return {
      // date: undefined
      locales: {
        //@jayce 23/05/11-15:41:33 : +locale
        zh,
        en,
        fr,
        pt,
        ar,
      },
    };
  },
  //@jayce 23/05/11-15:41:08 : custom start
  watch: {
    'formConfig.currentLang': {
      handler: function () {
        switch (this.formConfig.currentLang) {
          case 'en':
            moment.locale('en-ca');
            break;
          case 'zh':
            moment.locale('zh-cn');
            break;
          case 'ar':
            moment.locale('ar');
            break;
          case 'fr':
            moment.locale('fr');
            break;
          case 'pt':
            moment.locale('pt');
            break;
          default:
            moment.locale('zh-cn');
        }
      },
      deep: true,
      immediate: true,
    },
  },
  //@jayce 23/05/11-15:41:08 : custom end

  computed: {
    date() {
      if (!this.value || (this.record.options.range && this.value.length === 0)) {
        return undefined;
      } else if (this.record.options.range) {
        return this.value.map((item) => moment(item, this.record.options.format));
      } else {
        return moment(this.value, this.record.options.format);
      }
    },
  },
  methods: {
    handleSelectChange(val) {
      let date;
      if (!val || (this.record.options.range && val.length === 0)) {
        date = '';
      } else if (this.record.options.range) {
        date = val.map((item) => item.format(this.record.options.format));
      } else {
        date = val.format(this.record.options.format);
      }
      this.$emit('change', date);
      this.$emit('input', date);
    },
  },
};
</script>
