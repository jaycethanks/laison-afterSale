import { axios } from '@/utils/request';

export default {
  test: function test() {
    return axios({
      url: '/hello',
      method: 'post',
      data: {
        hello: 123,
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  },
};
