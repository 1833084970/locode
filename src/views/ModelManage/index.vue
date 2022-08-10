<template>
  <div class="model-manage">
    <div class="model-manage-left">
      <el-scrollbar style="height: 100%">
        <ModelList @checkedRow="checkedRow" />
      </el-scrollbar>
    </div>
    <div class="model-manage-right">
      <el-scrollbar style="height: 100%">
        <ModelOptions :currentRow="currentRow" :modelType="modelType" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import components from "./components";

export default {
  name: "ModelManage",
  components,
  data() {
    return {
      currentRow: null,
      modelType: "",
    };
  },

  mounted() {},

  methods: {
    checkedRow(row, type) {
      this.currentRow = row;
      this.modelType = type;
    },
  },
};
</script>

<style lang="scss">
.model-manage {
  display: flex;
  height: 100%;
  &-left {
    width: 800px;
    border-right: 1px solid #d9d9d9;
  }
  &-right {
    flex: 1;
  }
  .el-card__body {
    padding: 0 10px 10px;
  }
  .el-card__header {
    border-bottom: none;
  }
}
</style>