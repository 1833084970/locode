<template>
  <div class="container">
    <div class="operate-btns">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <el-tabs v-model="active" @tab-click="tabChange" type="card">
      <el-tab-pane label="页面设计器" name="页面设计器" lazy>
        <PageDesigner />
      </el-tab-pane>
      <el-tab-pane label="数据模型" name="数据模型" lazy>
        <ModelManage />
      </el-tab-pane>
      <el-tab-pane label="方法" name="方法" lazy>
        <FunctionManage />
      </el-tab-pane>
      <el-tab-pane label="样式" name="样式" lazy> 样式 </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PageDesigner from "./PageDesigner";
import ModelManage from "./ModelManage";
import FunctionManage from "./FunctionManage";
import { parse, stringify } from "@/utils/index";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
export default {
  name: "Home",
  components: {
    PageDesigner,
    ModelManage,
    FunctionManage,
  },
  data() {
    return {
      active: "页面设计器",
    };
  },
  created() {
    let vmData = localStorage.getItem("vmData");
    let vmFunctions = localStorage.getItem("vmFunctions");
    let vmComponents = localStorage.getItem("vmComponents");
    vmData && this.updateVmData(parse(vmData));
    vmFunctions && this.updateVmFunctions(parse(vmFunctions));
    vmComponents && this.updateVmComponents(parse(vmComponents));
  },
  mounted() {},

  methods: {
    ...mapMutations([
      "updateVmComponents",
      "updateVmData",
      "updateVmFunctions",
    ]),
    tabChange() {},
    handleSave() {
      let { vmComponents, vmData, vmFunctions, vmLifeCycle } = mapState([
        "vmComponents",
        "vmData",
        "vmFunctions",
        "vmLifeCycle",
      ]);
      localStorage.setItem("vmComponents", stringify(vmComponents.call(this)));
      localStorage.setItem("vmData", stringify(vmData.call(this)));
      localStorage.setItem("vmFunctions", stringify(vmFunctions.call(this)));
      localStorage.setItem("vmLifeCycle", stringify(vmLifeCycle.call(this)));
    },
  },
};
</script>
<style lang="scss">
.container {
  position: relative;
  padding: 10px 10px 0;
  height: 100%;
  > .el-tabs {
    height: 100%;
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      height: calc(100% - 41px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .operate-btns {
    position: absolute;
    right: 10px;
    height: 40px;
    line-height: 40px;
    z-index: 2;
  }
}
</style>