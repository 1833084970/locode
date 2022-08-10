const modulesFiles = require.context("", true, /\.vue$/);

export default {
  install(Vue) {
    modulesFiles.keys().forEach((modulePath) => {
      // set './app.js' => 'app'
      const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
      const value = modulesFiles(modulePath);
      Vue.component(moduleName, value.default);
    });
  }
};
