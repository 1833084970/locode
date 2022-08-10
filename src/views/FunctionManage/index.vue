<template>
  <div class="function-manage">
    <div class="function-manage-left">
      <FunctionList @checkedRow="checkedRow" />
    </div>
    <div class="function-manage-right">
      <FunctionOptions :currentRow="currentRow" :functionType="functionType" />
    </div>
  </div>
</template>

<script>
import components from "./components";

export default {
  name: "FunctionManage",
  components,
  data() {
    return {
      currentRow: null,
      functionType: "",
    };
  },

  mounted() {},

  methods: {
    checkedRow(row, type) {
      this.currentRow = row;
      this.functionType = type;
    },
  },
};
</script>

<style lang="scss">
.function-manage {
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