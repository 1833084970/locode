<template>
  <div class="model-list">
    <el-card class="box-card" v-for="(value, key) in vmData" :key="key">
      <div slot="header" class="model-list-header">
        <span class="model-list-title">{{ key }}</span>
        <div class="model-list-operate">
          <el-button type="text" @click="addModel(key)">新 增</el-button>
          <el-button type="text" @click="delModel(key)" style="color: #f56c6c"
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

        <el-table-column prop="field" label="属性" header-align="center">
        </el-table-column>
        <el-table-column prop="title" label="说明" header-align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="数据类型"
          header-align="center"
          width="100"
          align="center"
          v-if="key == 'data' || key == 'props'"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createKey, deepClone } from "@/utils/index";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
export default {
  name: "ModelList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["vmData"]),
  },
  mounted() {},

  methods: {
    ...mapMutations(["updateVmData"]),
    onCurrentChange(row, key) {
      if (row) {
        ["data", "props", "computed"].forEach((item) => {
          if (item != key) {
            this.$refs[item][0].setCurrentRow();
          }
        });
      }
      this.$emit("checkedRow", row, key);
    },
    addModel(key) {
      let renderKey = key + "-" + createKey();
      let row = {
        renderKey,
        field: "",
        title: "",
      };
      if (key == "data" || key == "props") {
        row = { ...row, type: "String", default: "" };
      }
      this.$set(this.vmData[key], renderKey, row);
      this.$refs[key][0].setCurrentRow(row);
    },
    delModel(key) {
      const table = this.$refs[key][0];
      let selectRows = table.selection;
      if (selectRows.length <= 0) {
        return;
      }
      selectRows.forEach((row) => {
        this.$delete(this.vmData[key], row.renderKey);
      });
      // this.updateVmData(vmData);
    },
  },
};
</script>

<style lang="scss">
.model-list {
  height: 100%;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-wrap: wrap;
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