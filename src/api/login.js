import { axios } from '@/utils/request';
export const urlset = {
  dingding: `https://login.dingtalk.com/oauth2/auth?redirect_uri=${location.origin}/auth&response_type=code&client_id=ding2zajegp3gjv0adpw&scope=openid&prompt=consent`,
};
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/oauth/token',
    method: 'post',
    params: parameter,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

export function bind(data) {
  return axios({
    url: '/test/bind',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

export function ddlogin() {
  return axios({
    url: '/test/ddlogin',
    method: 'get',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

export function auth(authCode) {
  return axios({
    url: '/test/auth?authCode=' + authCode,
    method: 'get',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

export function getLoginUser() {
  return axios({
    url: '/getLoginUser',
    method: 'get',
  });
}
export function phoneLogin(parameter) {
  return axios({
    url: '/sys/phoneLogin',
    method: 'post',
    data: parameter,
  });
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter,
  });
}

// export function getInfo() {
//   return axios({
//     url: '/api/user/info',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

export function logout(logoutToken) {
  return axios({
    url: '/logout/' + logoutToken,
    method: 'delete',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8',
    //   'X-Access-Token':  logoutToken
    // }
  });
}

/**
 * 第三方登录
 * @param token
 * @param thirdType
 * @returns {*}
 */
export function thirdLogin(token, thirdType) {
  return axios({
    url: `/sys/thirdLogin/getLoginUser/${token}/${thirdType}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
