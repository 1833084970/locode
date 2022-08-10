<template>
  <el-dialog
    title="数据选择"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    @open="onOpen"
    top="0"
    class="data-modal"
  >
    <el-button @click="handleAdd" style="margin-bottom: 10px">新 增</el-button>
    <el-table
      ref="data"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="renderKey"
      height="300"
      border
      size="small"
      :highlight-current-row="true"
      header-align="center"
      @current-change="onCurrentChange"
    >
      <el-table-column
        prop="field"
        label="属性"
        header-align="center"
        width="300"
        :formatter="cellFormatter"
      >
      </el-table-column>
      <el-table-column prop="title" label="说明" header-align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="数据类型"
        header-align="center"
        align="center"
        width="100"
      >
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
    <el-dialog
      title="新增属性"
      :visible.sync="addDialogVisible"
      width="40%"
      :append-to-body="true"
      class="data-modal-dialog"
      top="0"
    >
      <!-- <el-scrollbar style="height: 50vh"> -->
      <component
        ref="dataModelForm"
        :is="ModelOptions"
        modelType="data"
        :currentRow="addDataModel"
      ></component>
      <!-- </el-scrollbar> -->
      <span slot="footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave"> 保 存 </el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>
<script>
import ModelOptions from "@/views/ModelManage/components/ModelOptions.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
import { createKey } from "@/utils/index";
import { _typeof } from "../utils";

let rowMap = {};
export default {
  name: "DataModal",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      activeRow: null,
      addDialogVisible: false,
      addDataModel: null,
      tableData: [],
    };
  },
  computed: {
    ...mapState(["vmData"]),
    ModelOptions() {
      return ModelOptions;
    },
  },
  methods: {
    ...mapMutations(["updateVmData"]),
    cellFormatter(row, column, cellValue, index) {
      if (cellValue?.includes(".")) {
        let entityList = cellValue.split(".");
        return entityList[entityList.length - 1];
      }
      return cellValue;
    },
    onCurrentChange(row) {
      this.activeRow = row;
    },
    handleCancel() {
      this.addDataModel = null;
      this.addDialogVisible = false;
    },
    handleSave() {
      this.$refs.dataModelForm.$refs.elForm.validate((valid) => {
        if (valid) {
          this.$set(
            this.vmData.data,
            this.addDataModel.renderKey,
            this.addDataModel
          );
          this.formatTableData();
          this.activeRow = rowMap[this.addDataModel.renderKey];
          this.addDataModel = null;
          this.addDialogVisible = false;
          this.$nextTick(() => {
            this.$refs.data.setCurrentRow(this.activeRow);
          });
        }
      });
    },
    handleAdd() {
      let row = {
        renderKey: "data-" + createKey(),
        field: "",
        title: "",
        type: "String",
        defaultValue: "",
      };
      this.addDialogVisible = true;
      this.addDataModel = row;
    },
    onOpen() {
      rowMap = {};
      this.formatTableData();
      if (this.defaultValue && Object.keys(this.defaultValue).length > 0) {
        this.activeRow = rowMap[this.defaultValue.renderKey];
      } else {
        this.activeRow = null;
      }
      this.$nextTick(() => {
        this.$refs.data.setCurrentRow(this.activeRow);
      });
    },
    formatTableData() {
      let data = Object.values(this.vmData.data);
      const flatObj = (parent, obj) => {
        if (_typeof(obj) == "Object") {
          parent.children = [];
          for (let field in obj) {
            let renderKey = parent.renderKey + "." + field;
            let child = {
              renderKey,
              field: parent.field + "." + field,
              type: _typeof(obj[field]),
            };
            // this.$set(this.rowMap, renderKey, child);
            rowMap[renderKey] = child;
            parent.children.push(child);
            flatObj(child, obj[field]);
          }
        }
      };
      this.tableData = data.map((item) => {
        let newItem = { ...item };
        // this.$set(this.rowMap, newItem.renderKey, newItem);
        rowMap[newItem.renderKey] = newItem;
        if (newItem.type == "Object") {
          newItem.children = [];
          let obj = JSON.parse(`${newItem.defaultValue}`);
          flatObj(newItem, obj);
        }
        return newItem;
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      if (this.activeRow) {
        this.$emit("submit", this.activeRow);
        this.$emit("update:visible", false);
      }
    },
  },
};
</script>
<style lang="scss">
.data-modal-dialog {
  .model-options {
    max-height: 440px;
    .el-form {
      padding: 0 20px 10px 0;
    }
  }
}
</style>