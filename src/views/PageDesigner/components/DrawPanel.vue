<template>
  <div
    class="draw-panel"
    ref="drawPanel"
    @click="onDrawPanelClick"
    @click.right.stop.prevent
  >
    <el-scrollbar style="height: 100%">
      <draggable
        class="drawing-board"
        :list="vmComponents"
        :animation="0"
        :noTransitionOnDrag="true"
        group="componentsGroup"
        data-drag-tag="root"
      >
        <draggable-item
          v-for="item in vmComponents"
          :key="item.renderKey"
          :current-item="item"
        />
      </draggable>
    </el-scrollbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
export default {
  name: "DrawPanel",
  data() {
    return {};
  },
  computed: {
    vmComponents: {
      get() {
        return this.$store.state.pageConfig.vmComponents;
      },
      set(value) {
        this.updateVmComponents(value);
      },
    },
  },
  mounted() {},

  methods: {
    ...mapMutations(["updateVmComponents", "setActiveElementId"]),
    onDrawPanelClick() {
      this.setActiveElementId(null);
    },
  },
};
</script>

<style lang="scss">
.draw-panel {
  height: 100%;
  .el-scrollbar__view {
    padding: 10px;
    padding-right: 0;
  }
  .drawing-board {
    padding-right: 10px;
    width: 100%;
    min-height: calc(100vh - 71px);
    // display: flex;
    // gap: 10px;
    // flex-wrap: wrap;
    // flex-direction: column;

    .drag-item {
      position: relative;
      padding: 10px;
      transition: all 0.3s;
      border: 1px solid transparent;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      &.drag-item-component-block {
        width: 100%;
        height: 300px;
      }
      &.drag-item-component {
        display: inline-block;
        background-color: #f6f7ff;
        &:hover {
          background-color: #e0e3ff;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: none;
        }
      }
      &.drag-item-layout {
        padding-top: 10px;
        border: 1px dashed #cbcff3;
        overflow: initial;
        // .layout-name {
        //   position: absolute;
        //   font-size: 12px;
        //   top: -10px;
        //   left: 4px;
        //   z-index: 9999;
        //   font-weight: bold;
        //   color: #cbcbcb;
        // }
        .drag-wrapper {
          width: 100%;
          // display: flex;
          // gap: 10px;
          // flex-wrap: wrap;
          // flex-direction: column;
        }
        &[data-drag-tag]::before {
          content: attr(data-drag-tag);
          position: absolute;
          font-size: 12px;
          top: -10px;
          left: 4px;
          z-index: 2;
          font-weight: bold;
          color: #cbcbcb;
        }
      }
      &.active {
        border: 1px dashed #5f70ee;
      }
      &.cut {
        border: 1px dashed #ff2800;
      }
      .drag-item-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
      }
      .drag-wrapper {
        min-height: 40px;
      }
    }
  }
  .el-col {
    float: none;
    display: inline-block;
    vertical-align: top;
    // @for $i from 1 through 24 {
    //   &.el-col-#{$i} {
    //     width: calc(#{100% / 24 * $i} - 10px);
    //   }
    // }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .ag-theme-balham {
    height: 100%;
  }
}
</style>