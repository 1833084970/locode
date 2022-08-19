<template>
  <div class="editor-container">
    <div class="fixed-code prefix" v-if="fixedOptions.show" key="prefix">
      <i> function</i> {{ fixedOptions.name }}({{ fixedOptions.params }}) {
    </div>
    <div ref="monacoEditor" :style="`height: ${editorH}`"></div>
    <div class="fixed-code suffix" v-if="fixedOptions.show" key="suffix">}</div>
  </div>
</template>

<script>
// import * as monaco from "monaco-editor";

// const monaco = require("monaco-editor");
// import { setLocaleData } from "monaco-editor-nls";
// import zh_CN from "monaco-editor-nls/locale/zh-hans";

// setLocaleData(zh_CN);
// const monaco = require("monaco-editor/esm/vs/editor/editor.api");
import Emitter from "element-ui/src/mixins/emitter"; //触发elform 的自定义事件
import { debounce } from "throttle-debounce";
import { stringify, parse } from "@/utils/index";

export default {
  name: "MonacoEditor",
  props: {
    value: {},
    language: {
      default: "javascript",
    },
    height: {
      default: "300px",
    },
    fixedOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [Emitter],
  data() {
    return {
      monacoEditor: null,
    };
  },
  computed: {
    editorH() {
      if (this.fixedOptions.show) {
        return `calc(${this.height} - 38px)`;
      }
      return this.height;
    },
  },
  watch: {
    value(newValue) {
      if (this.monacoEditor) {
        if (newValue !== this.monacoEditor.getValue()) {
          this.monacoEditor.setValue(newValue);
        }
      }
    },
    language(newVal) {
      if (this.monacoEditor) {
        this.$monaco.editor.setModelLanguage(
          this.monacoEditor.getModel(),
          newVal
        );
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
        theme: "vs-dark",
        language: this.language,
        automaticLayout: true,
        tabSize: 4,
        foldingStrategy: "indentation",
      });
      this.monacoEditor.onDidChangeModelContent(
        debounce(100, () => {
          let value = this.monacoEditor.getValue();
          if (this.value !== value) {
            this.$emit("input", value);
            this.dispatch("ElFormItem", "el.form.change", value);
          }
        })
      );
    },
  },
};
</script>

<style lang="scss">
.editor-container {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }
  .fixed-code {
    padding-left: 64px;
    font-family: Consolas, "Courier New", monospace;
    font-weight: normal;
    font-size: 14px;
    font-feature-settings: "liga" 0, "calt" 0;
    line-height: 19px;
    letter-spacing: 0px;
    background-color: #1e1e1e;
    height: 19px;
    color: #dcdcdc;
    i {
      color: #569cd6;
      font-style: normal;
    }
  }
}
</style>