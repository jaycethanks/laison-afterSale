const kform = {
  state: {
    data: null,
    organizationStructure: null,
    group: null,
  },
  mutations: {
    SET_FLOWFORM_DATA: (state, data) => {
      state.data = data;
    },
    SET_FLOWFORM_organizationStructure: (state, data) => {
      state.organizationStructure = data;
    },
    SET_FLOWFORM_group: (state, data) => {
      state.group = data;
    },

    RESET_FLOWFORM: (state) => {
      state.data = null;
      state.group = null;
      state.orgStruct = null;
    },
  },
};

export default kform;
