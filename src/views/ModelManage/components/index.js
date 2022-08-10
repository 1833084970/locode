let components = {
  ModelList: () => import("./ModelList.vue"), //左边的 数据模型列表
  ModelOptions: () => import("./ModelOptions.vue") //右边的 数据模型配置面板
};

export default components;
