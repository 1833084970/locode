<template>
  <el-dialog
    title="代码编辑"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    @open="onOpen"
    top="0"
    class="code-editor-modal"
  >
    <div ref="monacoEditor" style="height: 50vh; overflow: hidden"></div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "CodeEditorModal",

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
      codeStr: "",
      type: "html",
      monacoEditor: null,
    };
  },
  mounted() {
    // this.initMonaco();
  },
  beforeDestroy() {
    this.monacoEditor && this.monacoEditor.dispose();
  },
  methods: {
    initMonaco() {
      if (!this.monacoEditor) {
        this.monacoEditor = this.$monaco.editor.create(
          this.$refs.monacoEditor,
          {
            value: this.codeStr,
            theme: "vs-dark",
            language: this.type,
            automaticLayout: true,
            tabSize: 4,
            foldingStrategy: "indentation",
          }
        );
      } else {
        this.monacoEditor.setValue(this.codeStr);
      }
    },
    onOpen() {
      this.$nextTick(() => {
        this.codeStr = this.defaultValue?.value || "";
        this.initMonaco();
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      console.log(this.monacoEditor.getValue());
      this.$emit("submit", {
        label: this.monacoEditor.getValue(),
        value: this.monacoEditor.getValue(),
      });
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss">
.code-editor-modal .el-scrollbar__view {
  height: 100%;
}
</style>