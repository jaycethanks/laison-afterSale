const kform = {
  state: {
    data: null,
  },
  mutations: {
    SET_KFORM_DATA: (state, data) => {
      state.data = data;
      cusLocalStorage.setItem('kform', 'data', data);
    },
    RESET_KFORM: (state) => {
      state.data = null;
      cusLocalStorage.setItem('kform', 'data', null);
    },
  },
};

export default kform;
