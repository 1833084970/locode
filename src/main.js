import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import customComponents from "./components";
Vue.use(customComponents);

import "@/icons";

import ElementUI from "@lesso/element-ui";
import "@lesso/element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI, {
//   size: "mini"
// });

import RightMenu from "@right-menu/vue";
Vue.use(RightMenu);

import "@lesso/styles/styles/cover.less";
import "@/style/index.scss";

import draggable from "vuedraggable";
Vue.component("draggable", draggable);

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
Vue.use(VueCodemirror);

import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
Vue.component("AgGridVue", AgGridVue);
// 全局ag-grid组件与v-draging拖拽指令
// import commonInit from "@lesso/common";
// Vue.use(commonInit);

// Vue.component("tinymce", Tinymce);
// index.js
// import { setLocaleData } from "monaco-editor-nls";
// import zh_CN from "monaco-editor-nls/locale/zh-hans";

// setLocaleData(zh_CN);

const monaco = require("monaco-editor/esm/vs/editor/editor.api");
Vue.prototype.$monaco = monaco;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
