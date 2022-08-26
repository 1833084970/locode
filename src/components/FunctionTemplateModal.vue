<template>
  <el-dialog
    title="模板选择"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    @opened="onOpened"
    top="0"
    class="function-template-modal"
  >
    <div class="function-template-modal-body">
      <div class="left-tree">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="treeData"
          :filter-node-method="filterNode"
          :props="defaultProps"
          ref="elTree"
          @node-click="nodeClick"
          node-key="name"
          highlight-current
          :default-expanded-keys="defaultExpandedKeys"
        >
        </el-tree>
      </div>
      <div class="right-code">
        <MonacoEditor
          v-model="code"
          height="400px"
          :option="{ readOnly: true }"
        />
      </div>
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import methodTpl from "../render/methodTpl";
import { beautifierConf } from "@/utils/index";
const beautifier = require("js-beautify");
export default {
  name: "FunctionTemplateModal",
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
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      active: null,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    treeData() {
      return methodTpl;
    },
    code() {
      if (this.active && this.active.tpl) {
        let str = this.active.tpl.reduce((res, current) => {
          let str = this.formatStr(current.value);
          if (current.isEditor) {
            str = "/*\n\t" + str + "\n*/";
          }
          res += str;
          return res;
        }, "");
        str = beautifier.js(str, beautifierConf.js);
        return str;
      }
      return "";
    },
    defaultExpandedKeys() {
      if (this.active) {
        return [this.active.name];
      }
      return [];
    },
  },
  mounted() {},

  methods: {
    formatStr(str) {
      str = str.replace(/\<#\S+#=(\S+?)#\>/g, "$1");
      return str.replace(/\<%=(\S+?)%\>/g, (str, m) => {
        return `$${m}`;
      });
    },
    nodeClick(node) {
      if (!node.children) {
        this.active = node;
      } else {
        this.active = null;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    onOpened() {
      if (this.defaultValue) {
        this.$refs.elTree.setCurrentKey(this.defaultValue.name);
        this.active = this.defaultValue;
      }
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      if (!this.active) {
        this.$alert("请选择模板", "消息提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.$emit("submit", this.active);
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.function-template-modal {
  &-body {
    display: flex;
    height: 400px;
    .left-tree {
      width: 35%;
      .el-tree {
        margin-top: 10px;
        height: 360px;
      }
    }
    .right-code {
      width: 65%;
      margin-left: 10px;
      overflow: hidden;
    }
  }
}
</style>