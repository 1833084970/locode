<template>
  <el-dialog
    title="列配置"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    @open="onOpen"
    top="0"
    class="grid-column-modal"
  >
    <div class="column-list">
      <div class="column-list-head">
        <el-input type="text" v-model="columnField" />
        <el-button icon="el-icon-plus">新增</el-button>
        <el-button icon="el-icon-delete">删除</el-button>
      </div>
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
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column
          prop="headerName"
          label="属性"
          :formatter="cellFormatter"
        >
        </el-table-column>
        <el-table-column prop="tableOperate" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)">
              新增子级
            </el-button>
            <el-button type="text" @click="handleClick(scope.row)">
              上移
            </el-button>
            <el-button type="text" @click="handleClick(scope.row)">
              下移
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="column-options">
      <el-form ref="form" :rules="rules">
        <option-component
          v-for="formItem in currentFormData"
          :key="formItem.field"
          :model="formItem"
        />
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave"> 保 存 </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
import { extendOptions } from "@/render/components";
import { parse } from "@/utils/index";

export default {
  name: "GridColumnModal",
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
      columnField: "",
      tableData: [],
      activeRowKey: null,
    };
  },
  computed: {
    ...mapState(["vmData"]),
    currentFormData() {
      return extendOptions["ag-grid-column"];
    },
  },
  mounted() {},

  methods: {
    handleClick() {},
    cellFormatter(row, column, cellValue, index) {
      return cellValue + `(${row.field})`;
    },
    onOpen() {
      let { renderKey, field } = this.defaultValue;
      this.columnField = field;
      this.tableData = parse(this.vmData.data[renderKey].defaultValue);
    },
    handleCancel() {},
    handleSave() {},
    handleClose() {
      this.$emit("update:visible", false);
    },
    onCurrentChange(row) {
      this.activeRow = row.field;
    },
  },
};
</script>

<style lang="scss">
.grid-column-modal {
  .el-dialog__body {
    display: flex;
    .column-list {
      width: 70%;
      margin-right: 20px;
      .column-list-head {
        display: flex;
        margin-bottom: 10px;
        .el-input {
          width: 200px;
          margin-right: auto;
        }
      }
      .el-button {
        min-width: auto;
      }
    }
    .column-options {
      width: 50%;
      .el-form-item {
        display: flex;
        align-items: center;
        .el-form-item__label {
          line-height: 14px;
          width: 96px;
          font-size: 12px;
        }
        .el-form-item__content {
          flex: 1;
        }
      }
    }
  }
}
</style>