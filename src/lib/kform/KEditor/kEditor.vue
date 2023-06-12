<!--
 * @Description: 对vue-quill-editor封装
 * @Author: kcz
 * @Date: 2020-03-30 12:44:03
 * @LastEditors: your name
 * @LastEditTime: 2022-06-22 14:40:12
 -->
<template>
  <quillEditor
    :style="{ height: `${record.options.height}px` }"
    :value="value"
    ref="vueQuillEditor"
    class="ql-editor-class"
    :class="{
      chinesization: record.options.chinesization,
      'disabled-editor': record.options.disabled || parentDisabled,
    }"
    :options="editorOption"
    :disabled="record.options.disabled || parentDisabled"
    @paste.native.stop="imagePaste"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  >
  </quillEditor>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// @jayce
import API from '@/api/upload.js';

// 三方插件
/**
 * 参考：
 * https://github.com/surmon-china/vue-quill-editor/issues/322#issuecomment-490780441
 * https://github.com/visualjerk/quill-magic-url
 */
import Quill from 'quill';
import MagicUrl from 'quill-magic-url';
Quill.register('modules/magicUrl', MagicUrl);

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],
  // ['clean'], // remove formatting button
  ['image'],
];

export default {
  name: 'editor',
  props: ['value', 'record', 'parentDisabled'],
  components: { quillEditor },
  data() {
    return {
      editorOption: {
        placeholder: this.record.options.placeholder,
        modules: {
          // 预览状态无toolbar,编辑状态有toolbar
          toolbar: toolbarOptions,
          // 这里不能响应式控制，改用css 加类名实现toolbar的编辑显示，和预览隐藏
          // toolbar: this.record.options.disabled || this.parentDisabled ? false : toolbarOptions,
          magicUrl: {
            // Regex used to check URLs during typing
            urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
            // Regex used to check URLs on paste
            globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
          },
        },
      },
    };
  },
  mounted() {
    this.overWriteToolbarImageHandler();
    window.quillEditor_jayce = this.$refs['vueQuillEditor'];
  },
  methods: {
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {
      console.log(this.record.options.disabled, this.parentDisabled, '--line90');
    }, // 获得焦点事件
    onEditorChange(e) {
      this.$emit('change', e.html);
    },

    /**
     * 图片粘贴处理
     * 参考： https://github.com/surmon-china/vue-quill-editor/issues/364
     * @param event
     */
    imagePaste(event) {
      var items = event.clipboardData && event.clipboardData.items;
      var file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          console.log(items[i]);
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if (file && file.type.match(/^image\//i)) {
        event.preventDefault();
        this.uploadImage(file, true);
      }
    },
    /*
     * 图片上传
     */
    async uploadImage(data, isPaste) {
      let formData = new FormData();
      formData.append('file', data.file || data);
      // let params = {
      //   action: 'uploadimage',
      //   target: this.configData.type,
      // }
      let res = await API.upload(formData);
      let url = window.location.href.split(window.location.port)[0];
      url += window.location.port;
      url += '/file';
      // window.open(file.url ? file.url : url + file.response.fileLocation, '_blank')
      // return
      let resURL = url + (res.success == true && res.fileLocation);
      this.insertContent(resURL);
    },
    insertContent(resURL) {
      let quill = this.$refs['vueQuillEditor'].quill;
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', resURL);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },

    /**
     * 覆写 工具栏 image handler
     * https://github.com/surmon-china/vue-quill-editor/issues/43#issuecomment-1147189697
     */
    overWriteToolbarImageHandler() {
      let quill = this.$refs['vueQuillEditor'].quill;
      var toolbar = quill.getModule('toolbar');
      console.log(this.$refs['vueQuillEditor'], '--line133');
      // 如果没有toolbar，则是在预览状态，也就不需要去重写ImageHandler
      if (!toolbar) return;

      // toolbar.handlers.image = function () {
      //   console.log(this)
      // }
      let _this = this; //vue instance
      toolbar.addHandler('image', function () {
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', async function () {
          if (fileInput.files != null && fileInput.files[0] != null) {
            let formData = new FormData();
            formData.append('file', fileInput.files[0]);
            let res = await API.upload(formData);
            let url = window.location.href.split(window.location.port)[0];
            url += window.location.port;
            url += '/file';
            let resURL = url + (res.success == true && res.fileLocation);
            _this.insertContent(resURL);
          }
        });
        this.container.appendChild(fileInput);
        fileInput.click();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.ql-editor-class {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  padding: 0 0 66px;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
/deep/ .ql-snow .ql-editor img {
  max-width: 35% !important;
}
/deep/ pre.ql-syntax {
  height: auto !important;
}

/deep/ .ql-container {
  font-size: 16px;
}
.disabled-editor {
  height: 50vh !important; // 当为预览，即disable状态时，高度定死为 50vh
  /deep/ .ql-toolbar {
    display: none !important;
  }
  /deep/ .ql-container {
    border: none !important;
  }
  /deep/ .ql-editor {
    padding: 14px;

    // margin: 12px 0;
    line-height: 1.8;
  }
  /deep/ .ql-snow .ql-editor blockquote {
    margin: 12px 0;
  }
}
</style>
