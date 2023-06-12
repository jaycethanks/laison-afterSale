const system = {
  state: {
    access_token: undefined,
    user: null,
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.access_token = data;
      cusLocalStorage.setItem('system', 'access_token', data);
    },
    SET_USER: (state, data) => {
      state.user = data;
      cusLocalStorage.setItem('system', 'user', data);
    },
    SET_USER_AVATAR: (state, data) => {
      state.user.avatar = data;
      cusLocalStorage.setItem('system', 'user', state.user);
    },
  },
  getters: {
    // 头像:avatar 性别：sex true|false 电话：phone email:email 部门:deptName 帐号名：realname 角色：roleName
    // getAvatar(state) {
    //   // return state.todos.filter(todo => todo.done)
    // },
  },
};

export default system;
