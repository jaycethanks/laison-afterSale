<template>
  <Container>
    <div class="main">
      <a-space direction="vertical">
        <a-card>
          <template>
            <a-descriptions title="用户信息">
              <a-descriptions-item :span="3">
                <div class="account-center-avatarHolder">
                  <div class="ant-upload-preview">
                    <a-upload
                      class="mask"
                      list-type="picture-card"
                      :show-upload-list="false"
                      :action="fileUploadUrl"
                      :before-upload="beforeUpload"
                      @change="handleChange"
                    >
                      <a-icon style="color: #fff; font-size: 36px" type="plus" />
                    </a-upload>
                    <a-avatar shape="square" :size="86" icon="user" :src="avatar !== 'default' ? `${avatar}` : '#'" />
                  </div>
                </div>
              </a-descriptions-item>
              <a-descriptions-item label="帐号名"> {{ realname }}</a-descriptions-item>
              <a-descriptions-item label="性别"> {{ sex }} </a-descriptions-item>
              <a-descriptions-item label="电话"> {{ phone }} </a-descriptions-item>
              <a-descriptions-item label="email"> {{ email }} </a-descriptions-item>
              <a-descriptions-item label="角色"> {{ roleName }} </a-descriptions-item>
              <a-descriptions-item label="部门">
                {{ deptName }}
              </a-descriptions-item>
            </a-descriptions>
          </template>
        </a-card>
      </a-space>
    </div>
  </Container>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Container from '@/components/base/Container/index.vue';
const baseUrl = process.env.VUE_APP_BASE_URL;
const fileUrl = process.env.VUE_APP_FILE_URL;
export default {
  data() {
    return {
      fileUploadUrl: baseUrl + '/file/upload',
    };
  },

  components: {
    Container,
  },
  computed: mapState({
    avatar: (state) => state.system.user.avatar,
    sex: (state) => state.system.user.sex,
    phone: (state) => state.system.user.phone,
    email: (state) => state.system.user.email,
    deptName: (state) => state.system.user.deptName,
    realname: (state) => state.system.user.realname,
    roleName: (state) => state.system.user.roleName,
  }),
  methods: {
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error(this.$t('common.imgtype'));
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t('common.imgsize'));
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        let imgUrl = fileUrl + info.file.response.fileLocation;
        //更新客户头像
        this.$store.commit('SET_USER_AVATAR', imgUrl);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.account-center-avatarHolder {
  .ant-upload-preview {
    // border: 1px solid red;
    position: relative;
    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      position: absolute;
      // border: 2px solid green;
      inset: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;
      ::v-deep .ant-upload.ant-upload-select-picture-card {
        width: 100%;
        height: 100%;
      }
      opacity: 0;
      &:hover {
        opacity: 1;
        ::v-deep .ant-upload.ant-upload-select-picture-card {
          width: 100%;
          height: 100%;
          background-color: #0000006a;
        }
      }
    }
  }
}
</style>
