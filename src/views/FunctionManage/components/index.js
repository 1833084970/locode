let components = {
  FunctionList: () => import("./FunctionList.vue"), //左边的 方法列表
  FunctionOptions: () => import("./FunctionOptions.vue") //右边的 方法配置面板
};

export default components;
