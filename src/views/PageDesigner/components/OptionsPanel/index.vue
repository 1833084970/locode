<template>
  <div class="options-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="属性" name="attr">
        <el-scrollbar style="height: 100%">
          <attr-options :activeComponent="activeComponent"></attr-options>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="插槽" name="slot">
        <el-scrollbar style="height: 100%">
          <slot-options :activeComponent="activeComponent"></slot-options>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="事件" name="event">
        <event-options :activeComponent="activeComponent"></event-options>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { findElement } from "@/utils/index";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");

import AttrOptions from "./components/AttrOptions";
import SlotOptions from "./components/SlotOptions";
import EventOptions from "./components/EventOptions";
export default {
  name: "OptionsPanel",
  components: {
    AttrOptions,
    SlotOptions,
    EventOptions,
  },
  data() {
    return {
      activeName: "attr",
    };
  },
  computed: {
    ...mapState(["activeElementId", "vmComponents"]),
    activeComponent() {
      const activeElementId = this.activeElementId;
      const vmComponents = this.vmComponents;
      if (activeElementId && vmComponents) {
        return findElement(activeElementId, vmComponents)?.[0] || {};
      }
    },
    // activeComponentKey() {
    //   return this.activeComponent.renderKey;
    // },
    // currentFormData() {
    //   return this.activeComponent.attrs || [];
    // },
  },
  mounted() {},

  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss">
.options-panel {
  height: 100%;
  > .el-tabs {
    height: 100%;
    border: none;
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      height: calc(100% - 41px);
      padding: 10px;
      padding-right: 0;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .el-slider {
    padding: 0 10px;
  }
}
</style>