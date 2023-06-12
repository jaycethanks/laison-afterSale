const bpmn = {
  state: {
    data: null,
  },
  mutations: {
    SET_BPMN_DATA: (state, data) => {
      state.data = data;
    },
    RESET_BPMN: (state) => {
      state.data = null;
      cusLocalStorage.setItem('bpmn', 'data', null);
    },
  },
};

export default bpmn;
