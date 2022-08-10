let components = {
  ElementPanel: () => import("./ElementPanel"), //左边的 组件面板
  DrawPanel: () => import("./DrawPanel"), //中间的绘制面板
  OptionsPanel: () => import("./OptionsPanel/index.vue") //右边的配置面板
};

export default components;
