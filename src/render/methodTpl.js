let methodTpl = [
  {
    name: "input-输入框",
    children: [
      {
        key: "onBlurByInput",
        field: "onBlur",
        name: "input失去焦点事件",
        description: "在 Input 失去焦点时触发",
        params: "event",
        tpl: [
          {
            isEditor: false,
            value: "<#mtk6#=let#> str = <%=var1%>;",
            tabNum: 1
          },
          {
            isEditor: true,
            value: "<%=code1%>",
            minHeight: 57
          },
          {
            isEditor: false,
            value: "<#mtk6#=return#> str;",
            tabNum: 1
          }
        ],
        extraVar: [
          {
            field: "var1",
            label: "变量1",
            value: null,
            isLinkModel: "vmData",
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
            field: "code1",
            isCode: true,
            value: "\t"
          }
        ]
      }
    ]
  },
  {
    key: "customFunction",
    field: "customFunction",
    name: "自定义事件",
    description: "",
    params: "",
    tpl: [
      {
        isEditor: true,
        value: "<%=code1%>",
        minHeight: 95
      }
    ],
    extraVar: [
      {
        field: "code1",
        isCode: true,
        value: "\t"
      }
    ]
  }
];
const recursion = (list, fnc) => {
  list.forEach((item) => {
    if (item.children) {
      recursion(item.children, fnc);
    } else {
      fnc(item);
    }
  });
};
recursion(methodTpl, (item) => {
  let start = [
    // {
    //   isEditor: false,
    //   value: "<#mtk8#=//&nbsp;<%=description%>#>"
    // },
    {
      isEditor: false,
      value: "<#mtk6#=function#> <%=field%>(<%=params%>){"
    }
  ];
  let end = [
    {
      isEditor: false,
      value: "}"
    }
  ];
  item.tpl = [...start, ...item.tpl, ...end];
});
export default methodTpl;
