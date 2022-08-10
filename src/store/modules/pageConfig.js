import Vue from "vue";
const state = {
  vmComponents: [],
  vmData: {
    data: {},
    props: {
      // {
      //   field: "",
      //   title: "",
      //   type: "",
      //   defaultValue: ""
      // }
    },
    computed: {
      // {
      //   field: "",
      //   title: "",
      //   getVal: "",
      //   setVal: ""
      // }
    }
  },
  vmFunctions: {
    methods: {
      // {
      //   field: "",
      //   title: "",
      //   description: "",
      //   params: "",
      //   value: "",
      // }
    }
    // watch: {
    //   field: "",
    //   description: "",
    //   immediate: false,
    //   deep: false,
    //   value: ""
    // }
  },
  vmLifeCycle: {
    beforeCreate: {},
    created: {},
    beforeMount: {},
    mounted: {},
    beforeDestroy: {},
    destroyed: {}
  },
  activeElementId: "",
  cutElementId: "",
  copyElement: null
};

const mutations = {
  setCutElementId(state, cutElementId) {
    state.cutElementId = cutElementId;
  },
  setCopyElement(state, copyElement) {
    state.copyElement = copyElement;
  },
  setActiveElementId(state, activeElementId) {
    state.activeElementId = activeElementId;
  },
  updateVmComponents(state, vmComponents) {
    state.vmComponents = vmComponents;
  },
  updateVmData(state, vmData) {
    state.vmData.data = vmData?.data || {};
    state.vmData.props = vmData?.props || {};
    state.vmData.computed = vmData?.computed || {};
  },
  updateVmFunctions(state, vmFunctions) {
    state.vmFunctions.methods = vmFunctions?.methods || {};
    // state.vmFunctions.watch = vmFunctions?.watch || {};
  },
  setVmData(state, options) {
    let { type, params } = options;
    Vue.set(state.vmData[type], params.renderKey, params);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
