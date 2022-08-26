
<script>
import { debounce } from "throttle-debounce";

export default {
  name: "FunctionEditor",
  props: {
    model: {
      type: Object,
      default() {
        return {};
      },
    },
    functionTpl: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      monacoEditor: null,
      editorH: 19,
    };
  },
  computed: {
    functionTplStrList() {
      return this.functionTpl?.tpl || [];
    },
    // editorH() {
    //   if (this.fixedOptions.show) {
    //     return `calc(${this.height} - 38px)`;
    //   }
    //   return this.height;
    // },
  },
  watch: {
    // value(newValue) {
    //   if (this.monacoEditor) {
    //     if (newValue !== this.monacoEditor.getValue()) {
    //       this.monacoEditor.setValue(newValue);
    //     }
    //   }
    // },
  },
  render() {
    return (
      <div class="fnc-editor-container">
        {this.functionTplStrList.map((item) => {
          if (item.isEditor) {
            let key = item.value.replace(/\<%=(\S+?)%\>/g, "$1");
            return (
              <FunctionCodeEditor
                v-model={this.model.extraVar[key]}
                minHeight={item.minHeight}
              />
            );
          } else {
            let normalize = this.normalizeHtml(item.value);
            const tabSize = 4;
            if (item.tabNum) {
              let space = new Array(tabSize * item.tabNum)
                .fill("&nbsp;")
                .join("");
              normalize = `<i>${space}</i>${normalize}`;
            }
            return (
              <div class="fixed-code" domProps-innerHTML={normalize}></div>
            );
          }
        })}
      </div>
    );
  },
  mounted() {
    // this.initMonaco();
  },
  beforeDestroy() {
    // this.monacoEditor && this.monacoEditor.dispose();
  },
  methods: {
    normalizeHtml(htmlStr) {
      let normalize = htmlStr.replace(
        /\<#(\S+)#=(\S+?)#\>/g,
        (_, className, str) => {
          return `<i class="${className}">${str}</i>`;
        }
      );
      return normalize.replace(/\<%=(\S+?)%\>/g, (str, key) => {
        let val = "";
        if (Object.hasOwn(this.model, key)) {
          val = this.model[key];
        } else {
          this.functionTpl.extraVar.some((item) => {
            if (item.field == key) {
              val = item.value;
              if (item.isLinkModel && item.value) {
                let [dataKey] = val.split("-");
                val =
                  this.$store.state.pageConfig[item.isLinkModel][dataKey][val]
                    .field;
                val = "this." + val;
              }
              return true;
            }
          });
        }
        return val || "";
      });
    },
    initMonaco() {
      this.monacoEditor = this.$monaco.editor.create(this.$refs.monacoEditor, {
        value: this.value,
        theme: "hc-light",
        language: this.language,
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

<style lang="scss">
.fnc-editor-container {
  display: flex;
  flex-wrap: wrap;
  background: #f7f7f7;
  box-shadow: 0px 0px 5px #dcdfe6;
  border: 1px solid #dcdfe6;
  > div {
    width: 100%;
  }
  .fixed-code {
    padding-left: 26px;
    font-family: Consolas, "Courier New", monospace;
    font-weight: normal;
    font-size: 14px;
    font-feature-settings: "liga" 0, "calt" 0;
    line-height: 19px;
    letter-spacing: 0px;
    height: 19px;
    i {
      font-style: normal;
    }
  }
}
</style>