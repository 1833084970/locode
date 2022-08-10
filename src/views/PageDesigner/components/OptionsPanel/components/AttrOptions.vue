<template>
  <div class="options-panel-attr">
    <el-form ref="form">
      <option-component
        v-for="attrItem in currentFormData"
        :key="activeComponentKey + '-' + attrItem.field"
        :model="attrItem"
      />
    </el-form>
    <template v-if="optionDataKey">
      <el-divider>选项</el-divider>
      <draggable
        :list="optionData"
        :animation="340"
        group="selectItem"
        handle=".option-drag"
      >
        <div
          v-for="(item, index) in optionData"
          :key="index"
          class="select-item"
        >
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation" />
          </div>
          <el-input
            :value="item.label"
            placeholder="选项名"
            size="small"
            @input="setOptionValue(index, 'label', $event)"
          />
          <el-input
            placeholder="选项值"
            size="small"
            :value="item.value"
            @input="setOptionValue(index, 'value', $event)"
          />
          <div class="close-btn select-line-icon" @click="delSelectItem(index)">
            <i class="el-icon-remove-outline" />
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px">
        <el-button
          style="padding-bottom: 0"
          icon="el-icon-circle-plus-outline"
          type="text"
          @click="addSelectItem"
        >
          添加选项
        </el-button>
      </div>
      <el-divider />
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
import { isNumberStr, parse, stringify, deepClone } from "@/utils/index";

export default {
  name: "AttrOptions",
  props: {
    activeComponent: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // optionData: [],
    };
  },
  computed: {
    ...mapState(["vmData"]),
    activeComponentKey() {
      return this.activeComponent.renderKey;
    },
    currentFormData() {
      return this.activeComponent.attrs || [];
    },
    optionDataKey() {
      return this.activeComponent.optionDataKey;
    },
    optionData() {
      let data = this.vmData.data;
      let optionDataKey = this.optionDataKey;
      if (optionDataKey) {
        return parse(data[optionDataKey].defaultValue);
      }
    },
  },
  mounted() {},

  methods: {
    ...mapMutations(["setVmData"]),
    setOptionValue(index, key, val) {
      let clone = deepClone(this.optionData);
      clone[index][key] = isNumberStr(val) ? +val : val;
      let data = this.vmData.data[this.optionDataKey];
      data.defaultValue = stringify(clone);
      // this.setVmData({
      //   type: "data",
      //   params: data,
      // });
    },
    addSelectItem() {
      let clone = deepClone(this.optionData);
      let data = this.vmData.data[this.optionDataKey];
      clone.push({
        label: "",
        value: "",
      });
      data.defaultValue = stringify(clone);
      // this.setVmData({
      //   type: "data",
      //   params: data,
      // });
    },
    delSelectItem(index) {
      let clone = deepClone(this.optionData);
      let data = this.vmData.data[this.optionDataKey];
      clone.splice(index, 1);
      data.defaultValue = stringify(clone);
      // this.setVmData({
      //   type: "data",
      //   params: data,
      // });
    },
  },
};
</script>

<style lang="scss">
.options-panel-attr {
  padding-right: 10px;
  .el-form-item {
    display: flex;
    align-items: center;
    .el-form-item__label {
      line-height: 14px;
      flex: 0 0 96px;
      font-size: 12px;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
  .select-item {
    display: flex;
    border: 1px dashed #fff;
    box-sizing: border-box;
    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
    }
    & .el-input + .el-input {
      margin-left: 4px;
    }
    .select-line-icon {
      line-height: 32px;
      font-size: 22px;
      padding: 0 4px;
    }
    .option-drag {
      cursor: move;
      color: #777;
    }
  }
  .select-item + .select-item {
    margin-top: 4px;
  }
  .select-item.sortable-chosen {
    border: 1px dashed #409eff;
  }
}
</style>