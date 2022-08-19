<template>
  <el-dialog
    title="列配置"
    :visible.sync="visible"
    width="70%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    @open="onOpen"
    @opened="onOpened"
    top="0"
    class="grid-column-modal"
  >
    <div class="column-list">
      <div class="column-list-head">
        <el-form :model="validateForm" :rules="validateRules" inline>
          <el-form-item prop="columnField">
            <el-input type="text" v-model="validateForm.columnField" />
          </el-form-item>
          <el-form-item style="float: right; margin-right: 0">
            <el-button icon="el-icon-plus" @click="handleAdd">新增</el-button>
            <el-button icon="el-icon-delete" @click="handleDel">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="colTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="_rowKey"
        height="300"
        border
        size="small"
        :highlight-current-row="true"
        header-align="center"
        @current-change="onCurrentChange"
      >
        <el-table-column width="54" fixed type="">
          <template slot="header" slot-scope="scope">
            <el-checkbox
              v-model="checkouts"
              style="padding-left: 10px"
              @change="checkAllIn(scope)"
            />
          </template>
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row._checks"
              style="padding-left: 10px"
              @change="checkChange(scope.row)"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="40"> </el-table-column> -->
        <el-table-column
          prop="headerName"
          label="属性"
          :formatter="cellFormatter"
        >
        </el-table-column>
        <el-table-column prop="tableOperate" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleAddChild(scope.row)">
              新增子级
            </el-button>
            <el-button type="text" @click="moveUp(scope.row)"> 上移 </el-button>
            <el-button type="text" @click="moveDown(scope.row)">
              下移
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="column-options" v-if="currentFormData">
      <el-form ref="form" :rules="rules" :model="currentFormData">
        <option-component
          v-for="formItem in formItems"
          :key="formItem.field"
          :model="initFormItemVal(formItem)"
          @change="onFormItemValChange($event, formItem.field)"
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
import { parse, stringify, createKey, deepClone } from "@/utils/index";

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
    const checkFunc = (rule, value, callback) => {
      if (!value) {
        return callback();
      }
      if (this.hasSame(this.defaultValue.renderKey, value)) {
        return callback(new Error("已存在相同的字段名"));
      }
      return callback();
    };
    return {
      validateForm: {
        columnField: "",
      },
      tableData: [],
      currentFormData: {},
      formItems: extendOptions["ag-grid-column"],
      multipleSelection: [],
      checkouts: false,
      validateRules: {
        columnField: [
          { required: true, message: `该属性不能为空`, trigger: "change" },
          {
            trigger: "change",
            validator: checkFunc,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["vmData"]),
    rules() {
      return this.formItems.reduce((res, next) => {
        if (next.component.required) {
          res[next.field] = {
            required: true,
            message: `该属性不能为空`,
            trigger: "change",
          };
        }
        return res;
      }, {});
    },
  },
  mounted() {},

  methods: {
    ...mapMutations(["setVmData"]),
    hasSame(renderKey, field) {
      return Object.keys(this.vmData).some((modelKey) => {
        return Object.values(this.vmData[modelKey]).some(
          (item) => item.renderKey != renderKey && item.field == field
        );
      });
    },
    checkAllIn() {
      this.$refs.colTable.data.forEach((items) => {
        this.$set(items, "_checks", this.checkouts);
        if (items.children) {
          this.setChildren(items.children, this.checkouts);
        }
      });
      this.multipleSelection = [];
      this.selectionList(this.tableData);
    },
    setChildren(children, type) {
      children.forEach((j) => {
        this.$set(j, "_checks", type);
        if (j.children) {
          this.setChildren(j.children, type);
        }
      });
    },
    selectionList(list) {
      list.forEach((item) => {
        if (item._checks && !item.children) {
          this.multipleSelection.push(item);
        }
        if (item.children) {
          this.selectionList(item.children);
        }
      });
    },
    // 插槽复选框逻辑
    checkChange(row) {
      // 父选子
      if (row.children) {
        this.setChildren(row.children, row._checks);
      }
      // 子不带父
      this.multipleSelection = [];
      if (this.tableData) {
        this.selectionList(this.tableData);
      }
    },
    initFormItemVal(model) {
      if (this.currentFormData[model.field] !== undefined) {
        model.component.value = this.currentFormData[model.field];
      } else {
        model.component.value = model.component.defaultValue;
      }
      return model;
    },
    onFormItemValChange(val, field) {
      this.$set(this.currentFormData, field, val);
      // this.currentFormData[field] = val;
    },
    handleAdd() {
      let newRow = this.createDefaultRowData();
      this.tableData.push(newRow);
      this.$nextTick(() => {
        this.$refs["colTable"].setCurrentRow(newRow);
      });
    },
    createDefaultRowData() {
      return this.formItems.reduce(
        (res, next) => {
          res[next.field] = next.component.defaultVal;
          return res;
        },
        { _checks: false, _rowKey: createKey() }
      );
    },
    handleDel() {
      const filter = (list) => {
        return list.filter((item) => {
          if (item._checks) {
            return false;
          }
          if (item.children) {
            item.children = filter(item.children);
            if (item.children.length == 0) {
              this.$delete(item, "children");
            }
          }
          return true;
        });
      };
      this.tableData = filter(this.tableData);
      this.$nextTick(() => {
        if (this.tableData.length == 0) {
          this.currentFormData = null;
        } else {
          this.$refs["colTable"].setCurrentRow(this.tableData[0]);
        }
      });
    },
    handleAddChild(row) {
      let newRow = this.createDefaultRowData();
      if (row.children) {
        newRow.field = row.field + "-child" + (row.children.length + 1);
        row.children.push(newRow);
      } else {
        newRow.field = row.field + "-child1";
        this.$set(row, "children", [newRow]);
      }
      this.$nextTick(() => {
        console.log(newRow);
        this.$refs["colTable"].setCurrentRow(newRow);
      });
    },
    moveUp(row) {
      let { parent, index, cloneTableData } = this.findRow(row._rowKey);
      if (index != 0) {
        //解决 eltable key复用bug
        parent[index]._rowKey = createKey();
        parent[index - 1]._rowKey = createKey();
        [parent[index - 1], parent[index]] = [parent[index], parent[index - 1]];
        this.tableData = cloneTableData;
        this.$nextTick(() => {
          this.$refs["colTable"].setCurrentRow(parent[index - 1]);
        });
      }
    },
    moveDown(row) {
      let { parent, index, cloneTableData } = this.findRow(row._rowKey);
      if (index != parent.length - 1) {
        parent[index]._rowKey = createKey();
        parent[index + 1]._rowKey = createKey();
        [parent[index + 1], parent[index]] = [parent[index], parent[index + 1]];
        this.tableData = cloneTableData;
        this.$nextTick(() => {
          this.$refs["colTable"].setCurrentRow(parent[index + 1]);
        });
      }
    },
    findRow(rowKey) {
      let cloneTableData = deepClone(this.tableData);
      const find = (parent) => {
        let res = null;
        parent.some((item, index) => {
          if (rowKey == item._rowKey) {
            res = {
              parent,
              index,
            };
            return true;
          } else if (item.children) {
            return (res = find(item.children));
          }
        });
        return res;
      };
      return { ...find(cloneTableData), cloneTableData };
    },
    cellFormatter(row, column, cellValue, index) {
      let fieldVal = row.field ? `(${row.field})` : "";
      cellValue = cellValue || "";
      return cellValue + fieldVal;
    },
    onOpen() {
      let { renderKey, field } = this.defaultValue;
      this.validateForm.columnField = field;
      if (this.vmData.data[renderKey]) {
        let tableData = parse(this.vmData.data[renderKey].defaultValue);
        const setKey = (list) => {
          list.forEach((item) => {
            item._rowKey = createKey();
            item._checks = false;
            if (item.children) {
              setKey(item.children);
            }
          });
        };
        setKey(tableData);
        this.tableData = tableData;
      }
    },
    onOpened() {
      if (this.tableData && this.tableData.length > 0) {
        this.$refs["colTable"].setCurrentRow(this.tableData[0]);
      }
    },
    handleCancel() {
      this.handleClose();
    },
    handleSave() {
      this.setVmData({
        type: "data",
        renderKey: this.defaultValue.renderKey,
        params: {
          defaultValue: stringify(this.tableData),
          field: this.validateForm.columnField,
        },
      });
      this.$emit("submit", {
        field: this.validateForm.columnField,
        renderKey: this.defaultValue.renderKey,
      });

      this.handleClose();
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    onCurrentChange(row) {
      this.currentFormData = row;
    },
  },
};
</script>

<style lang="scss">
.grid-column-modal {
  .el-dialog__body {
    display: flex;
    .column-list {
      width: 60%;
      margin-right: 20px;
      .column-list-head {
        // display: flex;
        // margin-bottom: 10px;
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
      width: 40%;
      .el-form-item {
        display: flex;
        align-items: center;
        .el-form-item__label {
          line-height: 14px;
          width: 120px;
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