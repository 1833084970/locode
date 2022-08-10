<template>
  <div class="options-panel-attr">
    <el-form ref="form">
      <option-component
        v-for="eventItem in currentFormData"
        :key="activeComponentKey + '-' + eventItem.field"
        :model="eventItem"
      />
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EventOptions",
  props: {
    activeComponent: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    activeComponentKey() {
      return this.activeComponent.renderKey;
    },
    currentFormData() {
      return (this.activeComponent.events || []).map((item) => {
        return {
          ...item,
          component: {
            value: null,
            format(val) {
              return val?.value;
            },
            name: "modal-select",
            props: {
              modal: "code-editor-modal",
            },
          },
        };
      });
    },
  },
  mounted() {},

  methods: {},
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
      width: 96px;
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