const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    overlay: false
  },
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.plugin("monaco").use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ["javascript", "html", "css", "json"]
      }
    ]);
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
