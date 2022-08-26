<template>
  <div
    ref="monacoEditor"
    :style="`height: ${editorH}px;min-height:${minHeight}px`"
  ></div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "FunctionCodeEditor",
  props: {
    minHeight: {
      type: Number,
      default: 19,
    },
    value: {},
  },
  data() {
    return {
      monacoEditor: null,
      editorH: 19,
    };
  },
  watch: {
    value(newValue) {
      if (this.monacoEditor) {
        if (newValue !== this.monacoEditor.getValue()) {
          this.monacoEditor.setValue(newValue);
        }
      }
    },
  },
  mounted() {
    this.initMonaco();
  },
  beforeDestroy() {
    this.monacoEditor && this.monacoEditor.dispose();
  },
  methods: {
    initMonaco() {
      this.monacoEditor = this.$monaco.editor.create(this.$refs.monacoEditor, {
        value: this.value,
        // theme: "hc-light",
        theme: "vs",
        language: "javascript",
        automaticLayout: true,
        tabSize: 4,
        foldingStrategy: "indentation",
        scrollbar: {
          vertical: "hidden",
          handleMouseWheel: false,
        },
        scrollBeyondLastLine: false,
        lineNumbers: "off",
        minimap: {
          enabled: false,
        },
      });
      this.monacoEditor.onDidChangeModelContent(
        debounce(100, () => {
          let value = this.monacoEditor.getValue();
          if (this.value !== value) {
            this.$emit("input", value);
          }
        })
      );
      this.monacoEditor.onDidContentSizeChange((e) => {
        let { contentHeight, contentHeightChanged } = e;
        if (contentHeightChanged) {
          this.editorH = contentHeight;
        }
      });
    },
  },
};
</script>