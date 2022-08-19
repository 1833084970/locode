import { deepClone } from "@/utils/index";
import { stringify, parse } from "@/utils";

import Vue from "vue";
function childSlot(h, confClone, children) {
  console.log(this);
  let { tag, optionDataKey } = confClone;
  let optionData = this.$store.state.pageConfig.vmData.data[optionDataKey].defaultValue;
  parse(optionData).forEach((item) => {
    if (tag === "el-select") {
      children.push(<el-option label={item.label} value={item.value} key={item.value}></el-option>);
    } else if (tag === "el-checkbox-group") {
      let Tag = confClone.attrs.find((item) => item.field == "btnStyle").value ? "el-checkbox-button" : "el-checkbox";
      children.push(
        <Tag label={item.value} key={item.value}>
          {item.label}
        </Tag>
      );
    } else if (tag === "el-radio-group") {
      let Tag = confClone.attrs.find((item) => item.field == "btnStyle").value ? "el-radio-button" : "el-radio";
      children.push(
        <Tag label={item.value} key={item.value}>
          {item.label}
        </Tag>
      );
    }
  });
}
function mountSlot(h, confClone, children) {
  if (confClone.optionDataKey) {
    childSlot.call(this, h, confClone, children);
  }
  confClone.slots?.forEach((slot) => {
    let slotVal = slot.value;
    if (!slotVal) {
      return;
    }
    // let reg = /<(\w+)[^>]*>(.*?<\/\1>)?$/;
    // let isTagReg = reg.test(slotVal);
    // if (!isTagReg) {
    //   slotVal = `<div>${slotVal}</div>`;
    // }
    slotVal = Vue.extend({
      template: `<fragment>${slotVal}</fragment>`
    });
    let _h = h(slotVal, { slot: slot.field });
    children.push(_h);
    // children.push(<div slot={slot.field}>{_h.child}</div>);
    // children.push(h("div", {}, _h));
  });
}
function norlizeClass(classStr) {
  let classList = classStr.split(".");
  return classList.map((className) => {
    return {
      [className.trim()]: true
    };
  });
}
function buildDataObject(h, confClone, dataObject, children) {
  confClone.attrs?.forEach((attr) => {
    if (attr.notHandleAttr) {
      return;
    }
    //该配置的值为空值时 则排除
    if (attr.value === undefined || attr.value === null) {
      return;
    }
    //该配置允许为空 并且 值为空字符串或者0时  则排除
    if (attr.allowNull && !attr.value) {
      return;
    }

    if (confClone.tag == "ag-grid-vue") {
      if (attr.field == "columnDefs" || attr.field == "rowData") {
        let attrValue = [];
        if (attr.value && this.$store.state.pageConfig.vmData.data[attr.value]) {
          attrValue = this.$store.state.pageConfig.vmData.data[attr.value].defaultValue;
          attrValue = parse(attrValue);
        }
        dataObject.attrs[attr.field] = attrValue;
        return;
      }
    }

    //该配置项的值为 组件的默认插槽时，按插槽属性来处理
    if (attr.isDefaultSlot) {
      children.push(attr.value);
    } else if (attr.isNative) {
      dataObject.attrs[attr.field] = attr.value;
    } else if (attr.field == "class") {
      dataObject.class = norlizeClass(attr.value);
    } else if (attr.field == "v-model") {
      // this.model = attr.valType == "Array" ? [] : "";
      dataObject.props["value"] = this.model;
      dataObject.on["input"] = (value) => {
        this.model = value;
      };
    } else {
      dataObject.props[attr.field] = attr.value;
    }
  });
  // confClone.slots?.forEach((slot) => {
  //   let slotVal = slot.value;
  //   if (!slotVal) {
  //     return;
  //   }
  //   slotVal = Vue.extend({
  //     template: `<div>${slotVal}</div>`
  //   });
  //   console.log(new slotVal());
  //   dataObject.scopedSlots[slot.field] = function () {
  //     return h(slotVal);
  //   };
  // });
  // if (confClone.events) {
  //   dataObject.on = {};
  //   confClone.events.forEach((event) => {
  //     if (event.value === undefined || event.value === null) {
  //       return;
  //     }
  //     dataObject.on[event.field] = event.value;
  //   });
  // }
}

function makeDataObject() {
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    // nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true
  };
}

export default {
  name: "renderer",
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: ""
    };
  },
  render(h) {
    //解决 下拉框 单选切换到多选时 因value的数据类型 报错
    if (this.conf.tag == "el-select") {
      if (this.conf.attrs.find((item) => item.field == "multiple").value) {
        if (!Array.isArray(this.model)) {
          this.model = [];
        }
      } else if (Array.isArray(this.model)) {
        this.model = "";
      }
    }
    const dataObject = makeDataObject();
    const confClone = deepClone(this.conf);
    const children = (this.$slots.default || []).filter((item) => {
      return item.tag.includes("draggable");
    });

    // 解析slots
    mountSlot.call(this, h, confClone, children);

    // 解析props
    buildDataObject.call(this, h, confClone, dataObject, children);
    // console.log({
    //   dataObject,
    //   children
    // });
    let render = h(this.conf.tag, dataObject, children);
    return render;
  }
};
