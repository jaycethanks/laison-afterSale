<template>
  <div class="login-page-root">
    <!-- <Logo class="logo" /> -->
    <a-card>
      <div class="logo">
        <FlowFormSvgIcon class="logo-svg" />
      </div>
      <!-- <h1>工单中台系统</h1> -->
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox> -->
          <!-- <a class="login-form-forgot" href=""> Forgot password </a> -->
          <a-button
            size="large"
            :disabled="disableLoginBtn"
            block
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登录
          </a-button>

          <!-- <a href=""> register now! </a> -->
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import FlowFormSvgIcon from '@/assets/svg_logo/FlowFormSvgIcon.vue';
import { login, getLoginUser, urlset } from '@/api/login.js';
import { Base64 } from 'js-base64';

export default {
  data() {
    return {
      disableLoginBtn: false,
    };
  },
  components: {
    FlowFormSvgIcon,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    async loginSuccess(res) {
      const _res = await getLoginUser();
      this.$store.commit('SET_USER', _res.data);
      const { realname } = _res.data;
      this.$notification.success({
        message: '欢迎',
        description: '欢迎' + ' :' + realname,
      });
      this.$router.push({ path: '/' }).catch((e, e2) => {
        console.log(e, e2, 999);
        console.log('登录跳转首页出错,这个错误从哪里来的');
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      let that = this;
      that.disableLoginBtn = true;

      this.form.validateFields((err, values) => {
        if (!err) {
          let p = {};
          p.username = values.username;
          let pass = Base64.encode(values.password);
          p.password = pass;
          p.grant_type = 'password';
          p.client_id = 'system';
          p.client_secret = 'system';
          p.scope = 'app';
          login(p)
            .then((res) => {
              if (res.access_token) {
                this.$store.commit('SET_TOKEN', res.access_token);

                this.loginSuccess(res);
              } else {
                let description = res.errors;
                if (res.code == 407) {
                  //禁止登陆
                  description = '禁止登陆';
                } else if (res.code == 406) {
                  //用户名错误
                  description = '用户名错误';
                } else if (res.code == 405) {
                  //密码错误
                  description = '密码错误';
                }
                this.$notification['error']({
                  message: '登陆失败',
                  description: description,
                  duration: 4,
                });
              }
            })
            .finally(() => {
              that.disableLoginBtn = false;
            });

          // let loginParams = `username=${values.username}&password='+pass+'&grant_type=password&client_id=system&client_secret=system&scope=app`
          //
          // that.Login(loginParams).then((res) => {
          //   this.loginSuccess()
          // }).catch((err) => {
          //   that.requestFailed(err);
          // });
        } else {
          that.disableLoginBtn = false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.login-page-root {
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem 0;

    // font-weight: 600;
  }
  .logo {
    // width: 200px;
    // border: 1px solid red;
    text-align: center;
    margin: 1rem 0;
    .logo-svg {
      height: 4rem;
    }
  }
  #components-form-demo-normal-login.login-form {
    max-width: 48rem;
  }
}

/* #components-form-demo-normal-login.login-form-forgot {
  float: right;
}
#components-form-demo-normal-login.login-form-button {
  width: 100%;
} */
</style>
