<template>
  <a-upload
    :action="fileUrl"
    :before-upload="beforeUpload"
    :file-list="fileList"
    @preview="handlePreview"
    @change="handleChange"
    v-bind="$attrs"
  >
    <a-button :type="buttonType"> <a-icon type="link" /> 上传附件 </a-button>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-upload>
</template>
<script>
const _baseUrl = process.env.VUE_APP_BASE_URL;
const _fileUrl = process.env.VUE_APP_FILE_URL;

import {downloadFile} from "@/utils/downloadFile.js"

export default {
  name: 'ffUploader',
  props: {
    limitedSize: {
      type: Number,
      default: 2// 单位 :m
    },
    buttonType:{
      type: String,
      default: 'link'
    },
    cusProp:{
      type:String
    }
  },
  model:{
    prop:"cusProp",
    event:"cusEvent",
  },
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      defaultFileList:[]
    }
  },
  computed: {
    fileUrl: () => _baseUrl + '/file/upload',

  },

  methods: {
    handleChange(info) {
      this.fileList = info.fileList
      this.fileList.forEach((element) => {
        if (!element.status) {
          element.status = 'error'
        }
      })
      let newValue = this.value
      if (info.file.status === 'removed' || info.file.status === 'done') {
        newValue = ''
        this.fileList.forEach((element) => {
          if (element.url) {
            //原先的文件
            newValue = newValue + element.url + '|'
          } else if (element.response && element.response.fileLocation) {
            newValue = newValue + element.response.fileLocation + '|'
          }
        })
        newValue = newValue.substring(0, newValue.length - 1)

        // emit ok
        this.$emit('cusEvent',newValue)

      }
      if (info.file.status === 'error') {
        this.$message.error(info.file.name + this.$t('common.uploaderror'))
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.limitedSize
      if (!isLt2M) {
        this.$message.error(this.$t('文件大小超出限制:') + this.limitedSize + 'M')
        return false
      }
      return true
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    isImage(file) {
      return file.type.startsWith('image/');
    },
    async handlePreview(file) {
      // 如果是图片，直接modal 预览，否则，直接下载
      if(this.isImage(file)){
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      }else{
        const url = _fileUrl + file.url;
        downloadFile(url,url.substring(url.lastIndexOf('/') + 1))
      }



      // let url = window.location.href.split(window.location.port)[0]
      // url += window.location.port
      // url += '/file'
      // window.open(file.url ? file.url : url + file.response.fileLocation, '_blank')
    }
  }
}
</script>
<style></style>
