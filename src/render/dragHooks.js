import { createKey, stringify, camelCase } from "@/utils/index";
let index = 1;
export const dragHooks = (currentElement, vue) => {
  let { tag, name } = currentElement;
  if (["el-select", "el-checkbox-group", "el-radio-group"].includes(tag)) {
    let renderKey = "data-" + createKey();
    currentElement.optionDataKey = renderKey;
    vue.$store.commit("pageConfig/setVmData", {
      type: "data",
      renderKey,
      params: {
        field: `${camelCase(tag)}Options-${index++}`,
        title: `${name}选项数据`,
        type: "Array",
        renderKey,
        defaultValue: stringify([
          {
            label: "选项1",
            value: "1"
          },
          {
            label: "选项2",
            value: "2"
          }
        ])
      }
    });
  } else if ("ag-grid-vue" === tag) {
    let renderKey = "data-" + createKey();
    let field = `${camelCase(tag)}Column-${index++}`;
    currentElement.attrs[1].value = renderKey;
    currentElement.attrs[1].component.value = {
      field,
      renderKey
    };
    vue.$store.commit("pageConfig/setVmData", {
      type: "data",
      renderKey,
      params: {
        field,
        title: `${name}列配置`,
        type: "Array",
        renderKey,
        defaultValue: stringify(
          Array.from({ length: 5 }, (_, i) => {
            return { headerName: "表头" + (i + 1), field: "column" + (i + 1), width: 150 };
          })
        )
      }
    });
  }
};
