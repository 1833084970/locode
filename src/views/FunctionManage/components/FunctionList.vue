<template>
  <div class="function-list">
    <el-scrollbar style="height: 100%">
      <el-card class="box-card" v-for="(value, key) in vmFunctions" :key="key">
        <div slot="header" class="function-list-header">
          <span class="function-list-title">{{ key }}</span>
          <div class="function-list-operate">
            <el-button type="text" @click="addFunction(key)">新 增</el-button>
            <el-button
              type="text"
              @click="delFunction(key)"
              style="color: #f56c6c"
              >删 除</el-button
            >
          </div>
        </div>
        <el-table
          :ref="key"
          :data="Object.values(value)"
          tooltip-effect="dark"
          style="width: 100%"
          border
          size="small"
          :highlight-current-row="true"
          header-align="center"
          @current-change="onCurrentChange($event, key)"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column prop="field" label="方法名称" header-align="center">
          </el-table-column>
          <el-table-column prop="title" label="中文名称" header-align="center">
          </el-table-column>
          <el-table-column
            prop="params"
            label="形参"
            header-align="center"
            width="100"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import { createKey, deepClone } from "@/utils/index";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
export default {
  name: "FunctionList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["vmFunctions"]),
  },
  mounted() {},

  methods: {
    ...mapMutations(["updateVmFunctions"]),
    onCurrentChange(row, key) {
      if (row) {
        ["methods"].forEach((item) => {
          if (item != key) {
            this.$refs[item][0].setCurrentRow();
          }
        });
      }
      this.$emit("checkedRow", row, key);
    },
    addFunction(key) {
      let renderKey = key + "-" + createKey();
      let row = {
        renderKey,
        field: "",
        title: "",
        description: "",
        params: "",
      };
      this.$set(this.vmFunctions[key], renderKey, row);
      this.$refs[key][0].setCurrentRow(row);
    },
    delFunction(key) {
      const table = this.$refs[key][0];
      let selectRows = table.selection;
      if (selectRows.length <= 0) {
        return;
      }
      selectRows.forEach((row) => {
        this.$delete(this.vmFunctions[key], row.renderKey);
      });
      // this.updateVmFunctions(vmFunctions);
    },
  },
};
</script>

<style lang="scss">
.function-list {
  height: 100%;
  .el-scrollbar__view {
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-title {
    font-size: 16px;
    font-weight: bold;
  }
  &-operate {
    button {
      min-width: auto;
      padding: 0 4px;
    }
  }
  .el-card {
    width: 100%;
  }
}
</style>