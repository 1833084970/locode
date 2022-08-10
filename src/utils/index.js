/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str;
  const isLeft = num < 0;
  const result = [];
  let reg;
  let spaces = "";
  if (isLeft) {
    num *= -1;
    reg = new RegExp(`(^\\s{0,${num * len}})`, "g");
  } else {
    for (let i = 0; i < num * len; i++) spaces += " ";
  }

  str.split("\n").forEach((line) => {
    line = isLeft ? line.replace(reg, "") : spaces + line;
    result.push(line);
  });
  return result.join("\n");
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, (str1) => str1.substr(-1).toUpperCase());
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

export const exportDefault = "export default ";

export const beautifierConf = {
  html: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "separate",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
};

export function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (_typeof(val) === "Function" || _typeof(val) === "Undefined") {
      return `${val}`;
    }
    return val;
  });
}

export function parse(str) {
  return JSON.parse(str, (k, v) => {
    if (v?.indexOf && v.indexOf("function") > -1) {
      return eval(`(${v})`);
    }
    if (v === "undefined") {
      return null;
    }
    return v;
  });
}

export function jsonClone(obj) {
  return parse(stringify(obj));
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === "[object Date]") {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === "[object RegExp]") {
    const flags = [];
    if (obj.global) {
      flags.push("g");
    }
    if (obj.multiline) {
      flags.push("m");
    }
    if (obj.ignoreCase) {
      flags.push("i");
    }

    return new RegExp(obj.source, flags.join(""));
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

// const toStr = Function.prototype.call.bind(Object.prototype.toString);
// export function isObjectObject(t) {
//   return toStr(t) === "[object Object]";
// }
// export function isObjectArray(t) {
//   return toStr(t) === "[object Array]";
// }
// export function isObjectNull(t) {
//   return toStr(t) === "[object Null]";
// }
// export function isObjectUnde(t) {
//   return toStr(t) === "[object Undefined]";
// }

export const createKey = () => {
  return Math.random().toString(16).substring(2);
};
export const findElement = (id, list) => {
  for (let index = 0; index < list.length; index++) {
    if (list[index].renderKey == id) {
      return [list[index], index, list];
    }
    if (list[index].children && list[index].children.length > 0) {
      let res = findElement(id, list[index].children);
      if (res) {
        return res;
      }
    }
  }
};
export const closest = (target, source) => {
  if (target.renderKey === source.renderKey) {
    return true;
  }
  return (
    target.children?.some((item) => {
      return closest(item, source);
    }) || false
  );
};
export const setRenderKeyDeep = (component) => {
  component.renderKey = createKey();
  component?.children?.forEach(setRenderKeyDeep);
};

export const _typeof = (target) => {
  return Object.prototype.toString.call(target).match(/\s(\S+)]/)[1];
};
