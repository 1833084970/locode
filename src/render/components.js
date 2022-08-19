const baseComponents = [
  {
    name: "单行文本",
    type: "component",
    tag: "el-input",
    icon: "input",
    attrs: [
      {
        field: "v-model",
        label: "绑定值",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey || "";
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "maxlength",
        label: "最大输入长度",
        isNative: true,
        allowNull: true,
        value: 0,
        component: {
          value: 0,
          name: "el-input-number"
        }
      },
      {
        field: "minlength",
        label: "最小输入长度",
        isNative: true,
        allowNull: true,
        value: 0,
        component: {
          value: 0,
          name: "el-input-number"
        }
      },
      {
        field: "show-word-limit",
        label: "显示输入字数统计",
        value: false,
        component: {
          value: false,
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      },
      {
        field: "placeholder",
        label: "占位文本",
        value: "",
        isNative: true,
        component: {
          value: "",
          name: "el-input"
        }
      },
      {
        field: "clearable",
        label: "可清空",
        value: false,
        component: {
          value: false,
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      },
      {
        field: "disabled",
        label: "禁用",
        value: false,
        component: {
          value: false,
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      },
      {
        field: "prefix-icon",
        label: "头部图标",
        value: "",
        component: {
          value: null,
          format: function (val) {
            return val?.value;
          },
          name: "modal-select",
          props: {
            modal: "icon-modal",
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "suffix-icon",
        label: "尾部图标",
        value: "",
        component: {
          value: null,
          format: function (val) {
            return val?.value;
          },
          name: "modal-select",
          props: {
            modal: "icon-modal",
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "autocomplete",
        label: "自动补全",
        value: "off",
        isNative: true,
        component: {
          value: "off",
          name: "el-radio-group",
          option: [
            {
              label: "on",
              value: "on"
            },
            {
              label: "off",
              value: "off"
            }
          ]
        }
      },
      {
        field: "readonly",
        label: "是否只读",
        value: false,
        isNative: true,
        component: {
          value: false,

          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      },
      {
        field: "autofocus",
        label: "自动获取焦点",
        value: false,
        isNative: true,
        component: {
          value: false,
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      },
      {
        field: "validate-event",
        label: "是否触发表单的校验",
        value: true,
        component: {
          value: true,
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      }
    ],
    slots: [
      {
        label: "前置内容",
        field: "prepend",
        value: null
      },
      {
        label: "后置内容",
        field: "append",
        value: null
      }
    ],
    events: [
      {
        label: "@blur",
        field: "blur",
        value: ""
      },
      {
        label: "@focus",
        field: "focus"
      },
      {
        label: "@change",
        field: "change"
      },
      {
        label: "@input",
        field: "input"
      },
      {
        label: "@clear",
        field: "clear"
      }
    ]
  },
  {
    name: "下拉选择器",
    type: "component",
    tag: "el-select",
    icon: "select",
    attrs: [
      {
        field: "v-model",
        label: "绑定值",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey || "";
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "multiple",
        label: "多选",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "disabled",
        label: "禁用",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "clearable",
        label: "是否可以清空选项",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "collapse-tags",
        label: "多选时按数字展示",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "multiple-limit",
        label: "多选时最多可以选择的项目数",
        value: 0,
        component: {
          name: "el-input-number",
          value: 0
        }
      },
      {
        field: "autocomplete",
        label: "自动补全",
        value: "off",
        isNative: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "on",
              value: "on"
            },
            {
              label: "off",
              value: "off"
            }
          ],
          value: "off"
        }
      },
      {
        field: "placeholder",
        label: "占位符",
        value: "请选择",
        component: {
          name: "el-input",
          value: "请选择"
        }
      },
      {
        field: "allow-create",
        label: "是否允许用户创建新条目",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "no-match-text",
        label: "搜索条件无匹配时显示的文字",
        value: "无匹配数据",
        component: {
          name: "el-input",
          value: "无匹配数据"
        }
      },
      {
        field: "no-data-text",
        label: "选项为空时显示的文字",
        value: "无数据",
        component: {
          name: "el-input",
          value: "无数据"
        }
      },
      {
        field: "popper-class",
        label: "下拉框的类名",
        value: "",
        component: {
          name: "el-input",
          value: ""
        }
      },
      {
        field: "default-first-option",
        label: "按下回车后选择第一项",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "popper-append-to-body",
        label: "插入至 body",
        value: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: true
        }
      },
      {
        field: "automatic-dropdown",
        label: "获得焦点后自动弹出选项菜单",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      }
    ],
    optionDataKey: "",
    slots: [
      {
        label: "头部内容",
        field: "prefix",
        value: null
      },
      {
        label: "无选项时的列表",
        field: "empty",
        value: null
      }
    ],
    events: [
      {
        label: "change",
        field: "change"
      },
      {
        label: "visible-change",
        field: "visible-change"
      },
      {
        label: "remove-tag",
        field: "remove-tag"
      },
      {
        label: "clear",
        field: "clear"
      },
      {
        label: "blur",
        field: "blur"
      },
      {
        label: "focus",
        field: "focus"
      }
    ]
  },
  {
    name: "按钮",
    type: "component",
    tag: "el-button",
    icon: "button",
    attrs: [
      {
        field: "text",
        label: "文本",
        value: "按钮",
        isDefaultSlot: true,
        component: {
          value: "按钮",
          name: "el-input"
        }
      },
      {
        field: "type",
        label: "类型",
        value: "",
        component: {
          name: "el-select",
          option: [
            {
              label: "primary",
              value: "primary"
            },
            {
              label: "success",
              value: "success"
            },
            {
              label: "warning",
              value: "warning"
            },
            {
              label: "danger",
              value: "danger"
            },
            {
              label: "info",
              value: "info"
            },
            {
              label: "text",
              value: "text"
            }
          ],
          value: ""
        },
        allowNull: true
      },
      {
        field: "plain",
        label: "是否朴素按钮",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "round",
        label: "是否圆角按钮",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "circle",
        label: "是否圆形按钮",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "loading",
        label: "是否加载中状态",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "disabled",
        label: "是否禁用状态",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "icon",
        label: "图标类名",
        value: "",
        component: {
          value: null,
          format: function (val) {
            return val?.value;
          },
          name: "modal-select",
          props: {
            modal: "icon-modal"
          }
        },
        allowNull: true
      },
      {
        field: "autofocus",
        label: "是否默认聚焦",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "native-type",
        label: "原生 type 属性",
        value: "button",
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "button",
              value: "button"
            },
            {
              label: "submit",
              value: "submit"
            },
            {
              label: "reset",
              value: "reset"
            }
          ],
          value: "button"
        },
        isNative: true
      }
    ]
  },
  {
    name: "文字链接",
    type: "component",
    tag: "el-link",
    icon: "link",
    attrs: [
      {
        field: "text",
        label: "文本",
        value: "文字链接",
        isDefaultSlot: true,
        component: {
          value: "文字链接",
          name: "el-input"
        }
      },
      {
        field: "type",
        label: "类型",
        value: "default",
        component: {
          name: "el-select",
          option: [
            {
              label: "primary",
              value: "primary"
            },
            {
              label: "success",
              value: "success"
            },
            {
              label: "warning",
              value: "warning"
            },
            {
              label: "danger",
              value: "danger"
            },
            {
              label: "info",
              value: "info"
            }
          ],
          value: "default"
        }
      },
      {
        field: "underline",
        label: "是否下划线",
        value: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: true
        }
      },
      {
        field: "disabled",
        label: "是否禁用状态",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "href",
        label: "原生 href 属性",
        value: "",
        component: {
          name: "el-input",
          value: ""
        },
        isNative: true,
        allowNull: true
      },
      {
        field: "icon",
        label: "图标类名",
        value: "",
        component: {
          value: null,
          format: function (val) {
            return val?.value;
          },
          name: "modal-select",
          props: {
            modal: "icon-modal"
          }
        },
        allowNull: true
      }
    ]
  },
  {
    name: "单选框",
    type: "component",
    tag: "el-radio-group",
    icon: "radio",
    attrs: [
      {
        field: "v-model",
        label: "绑定值",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey || "";
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "btnStyle",
        label: "按钮样式",
        value: false,
        notHandleAttr: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "disabled",
        label: "是否禁用",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "text-color",
        label: "激活时的文本颜色",
        value: "#ffffff",
        component: {
          name: "el-color-picker",
          value: "#ffffff",
          props: {
            "show-alpha": true
          }
        }
      },
      {
        field: "fill",
        label: "激活时的填充色和边框色",
        value: "#409EFF",
        component: {
          name: "el-color-picker",
          value: "#409EFF",
          props: {
            "show-alpha": true
          }
        }
      }
    ],
    optionDataKey: ""
  },
  {
    name: "多选框",
    type: "component",
    tag: "el-checkbox-group",
    icon: "checkbox",
    attrs: [
      {
        field: "v-model",
        label: "绑定值",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey || "";
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "btnStyle",
        label: "按钮样式",
        value: false,
        notHandleAttr: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "disabled",
        label: "是否禁用",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "min",
        label: "可被勾选的最小数量",
        value: null,
        component: {
          name: "el-input-number",
          value: null
        }
      },
      {
        field: "max",
        label: "可被勾选的最大数量",
        value: null,
        component: {
          name: "el-input-number",
          value: null
        }
      },
      {
        field: "text-color",
        label: "激活时的文本颜色",
        value: "#ffffff",
        component: {
          name: "el-color-picker",
          value: "#ffffff",
          props: {
            "show-alpha": true
          }
        }
      },
      {
        field: "fill",
        label: "激活时的填充色和边框色",
        value: "#409EFF",
        component: {
          name: "el-color-picker",
          value: "#409EFF",
          props: {
            "show-alpha": true
          }
        }
      }
    ],
    optionDataKey: ""
  },
  {
    name: "计数器",
    type: "component",
    tag: "el-input-number",
    icon: "input-number",
    attrs: [
      {
        field: "v-model",
        label: "绑定值",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        field: "min",
        label: "允许的最小值",
        value: null,
        component: {
          name: "el-input-number",
          value: null
        }
      },
      {
        field: "max",
        label: "允许的最大值",
        value: null,
        component: {
          name: "el-input-number",
          value: null
        }
      },
      {
        field: "step",
        label: "计数器步长",
        value: 1,
        component: {
          name: "el-input-number",
          value: 1,
          props: {
            precision: 2
          }
        }
      },
      {
        field: "step-strictly",
        label: "是否只能输入 step 的倍数",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "precision",
        label: "数值精度",
        value: null,
        component: {
          name: "el-input-number",
          value: null
        }
      },
      {
        field: "disabled",
        label: "是否禁用计数器",
        value: false,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: false
        }
      },
      {
        field: "controls",
        label: "是否使用控制按钮",
        value: true,
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ],
          value: true
        }
      },
      {
        field: "controls-position",
        label: "控制按钮位置",
        value: "",
        component: {
          name: "el-radio-group",
          option: [
            {
              label: "两边",
              value: ""
            },
            {
              label: "右边",
              value: "right"
            }
          ],
          value: true
        },
        allowNull: true
      },
      {
        field: "placeholder",
        label: "占位文本",
        value: "",
        component: {
          name: "el-input",
          value: ""
        },
        allowNull: true
      }
    ]
  },
  {
    name: "ag-grid",
    type: "component",
    tag: "ag-grid-vue",
    icon: "table",
    attrs: [
      {
        label: "类名",
        field: "class",
        component: {
          value: ".m-agTableContent .ag-theme-balham",
          name: "el-input"
        },
        value: ".m-agTableContent .ag-theme-balham"
      },
      {
        field: "columnDefs",
        label: "列配置",
        value: "",
        // isNative: true,
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey;
          },
          props: {
            modal: "grid-column-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-setting"
          }
        }
      },
      {
        field: "rowData",
        label: "数据源",
        value: "",
        component: {
          name: "modal-select",
          value: null,
          format: function (val) {
            return val?.renderKey || "";
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      }
      // {
      //   label: "headerHeight",
      //   field: "headerHeight",
      //   // isNative: true,
      //   component: {
      //     value: "40px",
      //     name: "el-input"
      //   },
      //   value: "40px"
      // }
    ]
  }
];
const layoutComponents = [
  {
    name: "普通容器",
    type: "layout",
    tag: "div",
    icon: "div",
    children: [],
    attrs: [
      {
        label: "类名",
        field: "class",
        component: {
          value: ".ls-box",
          name: "el-input"
        },
        value: ".ls-box"
      }
    ]
  },
  {
    name: "行容器",
    type: "layout",
    tag: "el-row",
    icon: "row",
    children: [],
    attrs: [
      {
        label: "间隔",
        field: "gutter",
        component: {
          value: 0,
          name: "el-input-number"
        },
        value: 0
      },
      {
        label: "布局模式",
        field: "type",
        component: {
          value: "",
          name: "el-radio-group",
          option: [
            {
              label: "普通布局",
              value: ""
            },
            {
              label: "弹性布局",
              value: "flex"
            }
          ]
        },
        value: ""
      },
      {
        label: "水平排列方式",
        field: "justify",
        component: {
          value: "start",
          name: "el-select",
          option: [
            {
              label: "start",
              value: "start"
            },
            {
              label: "end",
              value: "end"
            },
            {
              label: "center",
              value: "center"
            },
            {
              label: "space-around",
              value: "space-around"
            },
            {
              label: "space-between",
              value: "space-between"
            }
          ]
        },
        value: "start"
      },
      {
        label: "垂直排列方式",
        field: "align",
        component: {
          name: "el-select",
          value: "",
          option: [
            {
              label: "top",
              value: "top"
            },
            {
              label: "middle",
              value: "middle"
            },
            {
              label: "bottom",
              value: "bottom"
            }
          ]
        },
        value: ""
      },
      {
        label: "自定义标签",
        field: "tag",
        component: {
          value: "div",
          name: "el-input"
        },
        value: "div"
      }
    ]
  },
  {
    name: "列容器",
    type: "layout",
    tag: "el-col",
    icon: "col",
    children: [],
    attrs: [
      {
        label: "栅格",
        field: "span",
        component: {
          name: "el-slider",
          value: 24,
          props: {
            min: 0,
            max: 24,
            marks: { 12: "" }
          }
        },
        value: 24
      },
      {
        label: "间隔",
        field: "offset",
        component: {
          name: "el-slider",
          value: 0,
          props: {
            min: 0,
            max: 24,
            marks: { 12: "" }
          }
        },
        value: 0
      },
      {
        label: "向右移动",
        field: "push",
        component: {
          name: "el-slider",
          value: 0,
          props: {
            min: 0,
            max: 24,
            marks: { 12: "" }
          }
        },
        value: 0
      },
      {
        label: "向左移动",
        field: "pull",
        component: {
          name: "el-slider",
          value: 0,
          props: {
            min: 0,
            max: 24,
            marks: { 12: "" }
          }
        },
        value: 0
      },
      {
        label: "自定义标签",
        field: "tag",
        component: {
          value: "div",
          name: "el-input"
        },
        value: "div"
      }
    ]
  },
  {
    name: "表单",
    type: "layout",
    tag: "el-form",
    icon: "form",
    children: [],
    attrs: [
      {
        label: "数据对象",
        field: "model",
        component: {
          value: null,
          format: function (val) {
            return val?.renderKey;
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        label: "验证规则",
        field: "rules",
        component: {
          value: null,
          format: function (val) {
            return val?.renderKey;
          },
          props: {
            modal: "data-modal",
            defaultProps: {
              value: "renderKey",
              label: "field"
            },
            icon: "el-icon-search"
          }
        }
      },
      {
        label: "行内表单模式",
        field: "inline",
        component: {
          name: "el-radio-group",
          value: false,
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        },
        value: false
      },
      {
        label: "标签位置",
        field: "label-position",
        component: {
          name: "el-radio-group",
          value: "right",
          option: [
            {
              label: "靠左",
              value: "left"
            },
            {
              label: "顶部",
              value: "top"
            },
            {
              label: "靠右",
              value: "right"
            }
          ]
        },
        value: "right"
      }
    ],
    events: [
      {
        label: "validate",
        field: "validate"
      }
    ]
  },
  {
    name: "表单项",
    type: "layout",
    tag: "el-form-item",
    icon: "form-item",
    children: [],
    attrs: [
      {
        label: "model字段",
        field: "prop",
        value: "",
        component: {
          value: "",
          name: "el-input"
        }
      },
      {
        label: "标签文本",
        field: "label",
        value: "标签",
        component: {
          value: "标签",
          name: "el-input"
        }
      },
      {
        label: "宽度",
        field: "label-width",
        value: "100px",
        component: {
          value: "100px",
          name: "el-input"
        }
      },
      {
        label: "是否必填",
        field: "required",
        component: {
          name: "el-radio-group",
          value: false,
          option: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        },
        value: false
      }
    ],
    events: [
      {
        label: "validate",
        field: "validate"
      }
    ]
  },
  {
    name: "flex-box布局组件",
    type: "layout",
    tag: "flex-box",
    icon: "flex-box",
    children: [
      {
        name: "普通容器",
        type: "layout",
        tag: "div",
        icon: "div",
        children: [],
        attrs: [
          {
            label: "类名",
            field: "class",
            component: {
              value: ".m-agTable",
              name: "el-input"
            },
            value: ".m-agTable"
          }
        ]
      }
    ],
    attrs: [
      {
        label: "类名",
        field: "class",
        component: {
          value: ".ls-box",
          name: "el-input"
        },
        value: ".ls-box"
      }
    ],
    slots: [
      {
        label: "标题内容",
        field: "title",
        value: "标题内容"
      },
      {
        label: "按钮内容",
        field: "toolButton",
        value: `<el-button icon="ls-icon-plus" type="primary">新增</el-button>\n<el-button icon="ls-icon-delete" type="primary">删除</el-button>\n<el-button icon="ls-icon-edit" type="primary">修改</el-button>`
      },
      {
        label: "搜索条件内容",
        field: "condition",
        value: `<input-label label="测试">
                  <el-input placeholder="请输入关键字" clearable></el-input>
              </input-label>
              <input-label label="测试666">
                  <el-date-picker type="date" placeholder="选择日期">
                  </el-date-picker>
              </input-label>`
      }
    ]
  }
];
const templateComponents = [
  // {
  //   name: "普通容器",
  //   type: "layout",
  //   tag: "div",
  //   icon: "div",
  //   children: [],
  //   attrs: [
  //     {
  //       label: "类名",
  //       field: "class",
  //       component: {
  //         name: "el-input"
  //       },
  //       value: ".ls-box"
  //     }
  //   ]
  // }
];
const customComponents = [];
const baseAttrs = [
  // {
  //   label: "类名",
  //   field: "class",
  //   component: {
  //     name: "el-input"
  //   }
  // },
  // {
  //   label: "ref",
  //   field: "ref",
  //   component: {
  //     name: "el-input"
  //   }
  // }
];
function setSlotComponent(components) {
  components.forEach((component) => {
    if (component.slots) {
      component.slots = component.slots.map((slot) => {
        return Object.assign(slot, {
          component: {
            value: slot.value
              ? {
                  label: slot.value,
                  value: slot.value
                }
              : null,
            format(val) {
              return val?.value;
            },
            name: "modal-select",
            props: {
              modal: "code-editor-modal"
            }
          }
        });
      });
    }
  });
}
setSlotComponent(baseComponents);
setSlotComponent(layoutComponents);
const extendOptions = {
  "ag-grid-column": [
    {
      field: "headerName",
      label: "headerName",
      component: {
        name: "el-input",
        defaultVal: "",
        value: "",
        required: true,
        props: {}
      }
    },
    {
      field: "field",
      label: "field",
      component: {
        name: "el-input",
        defaultVal: "",
        value: "",
        required: true,
        props: {}
      }
    },
    {
      field: "width",
      label: "width",
      format: function (val) {
        return val ? val + "px" : "";
      },
      component: {
        name: "el-input-number",
        defaultVal: 100,
        value: 100,
        props: {}
      }
    }
  ]
};
export { baseComponents, layoutComponents, templateComponents, customComponents, baseAttrs, extendOptions };
