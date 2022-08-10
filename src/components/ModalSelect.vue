<template>
  <div class="modal-select">
    <div
      class="modal-select-tag"
      :style="{ width: selectDisabled ? '100%' : '' }"
    >
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag[tagValue]"
        :closable="(index === 0 || !collapseTags) && !selectDisabled"
        type="info"
        @close="handleTagClose(index)"
        :disable-transitions="true"
        :title="tag[tagLabel]"
      >
        {{ tag[tagLabel] }}
      </el-tag>
    </div>
    <div class="modal-select-input">
      <el-input
        readonly
        :disabled="selectDisabled && tags.length == 0"
        :placeholder="placeholder"
      >
        <el-button
          slot="append"
          v-if="!selectDisabled"
          :icon="icon"
          @click="handleOpenModal"
        ></el-button>
      </el-input>
    </div>
    <components
      :is="modal"
      :visible.sync="dialogVisible"
      :defaultValue="value"
      v-bind="modalProps"
      @submit="setValue"
    />
  </div>
</template>
<script>
import { valueEquals } from "element-ui/src/utils/util";
import Emitter from "element-ui/src/mixins/emitter"; //触发elform 的自定义事件
import { _typeof } from "@/utils";
export default {
  name: "ModalSelect",
  mixins: [Emitter],
  props: {
    //弹窗组件
    modal: {
      type: [Object, String],
      required: true,
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          value: "value",
          label: "label",
        };
      },
    },
    value: {
      // type: [Object, Array,String],
      required: true,
    },
    multiple: {
      default: false,
    },
    //传给modal的参数
    modalProps: {
      type: Object,
      default() {
        return {};
      },
    },
    collapseTags: {
      default: false,
    },
    disabled: {
      default: false,
    },
    icon: {
      default: "el-icon-edit",
    },
  },
  data() {
    return {
      dialogVisible: false,
      // valType: _typeof(this.value),
    };
  },
  inject: {
    elForm: {
      default: "",
    },
  },
  watch: {
    value(val, oldVal) {
      if (!valueEquals(val, oldVal)) {
        //触发elform的自定义事件 主要用于 表单校验
        this.dispatch("ElFormItem", "el.form.change", val);
      }
    },
  },
  computed: {
    tagValue() {
      return this.defaultProps.value;
    },
    tagLabel() {
      return this.defaultProps.label;
    },
    placeholder() {
      return !this.selectDisabled && this.tags.length == 0 ? "请选择" : "";
    },
    normalizeVal() {
      if (!this.value) {
        return [];
      }
      if (this.multiple) {
        return this.value;
      } else {
        return [this.value];
      }
    },
    tags: {
      get() {
        if (Array.isArray(this.normalizeVal)) {
          let length = this.normalizeVal.length;
          if (length > 1 && this.collapseTags && !this.selectDisabled) {
            return [
              this.normalizeVal[0],
              { [this.tagValue]: "_add", [this.tagLabel]: `+${length - 1}` },
            ];
          }
          return this.normalizeVal;
        }
      },
      set() {},
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },
  mounted() {},

  methods: {
    handleOpenModal() {
      this.dialogVisible = true;
    },
    handleTagClose(index) {
      let value = this.normalizeVal;
      value = value.slice();
      value.splice(index, 1);
      if (!this.multiple) {
        value = value[0];
      }
      this.$emit("input", value);
      this.emitChange(value);
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit("change", val);
      }
    },
    setValue(val) {
      this.$emit("input", val);
      this.emitChange(val);
    },
    // formatVal(val) {
    //   if (this.valType == "Object") {
    //     return val[0] || {};
    //   } else {
    //     return val;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.modal-select {
  position: relative;
  // width: 200px;
  min-height: 28px;
  // &:hover {
  //   ::v-deep .el-input__inner {
  //     border-color: #c0c4cc;
  //   }
  // }
  .modal-select-tag {
    z-index: 1;
    position: relative;
    line-height: 20px;
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    width: calc(100% - 50px);
    cursor: pointer;
    ::v-deep {
      .el-tag {
        margin: 2px;
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        padding-right: 20px;
        word-break: break-all;
        white-space: initial;
        height: 24px;
        line-height: 22px;
        &.el-tag--info .el-tag__close {
          position: absolute;
          right: 1px;
          top: 3px;
          color: #909399;
          background-color: #c0c4cc;
          transform: scale(0.8);
          &:hover {
            color: #fff;
            background-color: #909399;
          }
        }
      }
    }
  }
  .modal-select-input {
    position: absolute;
    top: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    min-height: 28px;
    ::v-deep {
      .el-input {
        height: 100%;
        vertical-align: top;
      }
      input {
        height: 100%;
      }
      .el-input-group__append {
        transition: all 0.3s;
        padding: 0;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>