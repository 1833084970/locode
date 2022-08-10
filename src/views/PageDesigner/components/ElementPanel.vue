<template>
  <div class="element-panel">
    <el-scrollbar class="element-panel-scrollbar">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="布局组件" name="1">
          <draggable
            class="components-draggable"
            :list="layoutComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            draggable=".components-item"
            :sort="false"
            @end="onEnd"
            :move="onMove"
          >
            <div
              v-for="(element, index) in layoutComponents"
              :key="index"
              class="components-item"
              :title="element.name"
            >
              <div class="components-body" :data-tag="element.tag">
                <svg-icon :icon-class="element.icon" />
                {{ element.name }}
              </div>
            </div>
          </draggable>
        </el-collapse-item>
        <el-collapse-item title="基础组件" name="2">
          <draggable
            class="components-draggable"
            :list="baseComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            draggable=".components-item"
            :sort="false"
            @end="onEnd"
            :move="onMove"
          >
            <div
              v-for="(element, index) in baseComponents"
              :key="index"
              class="components-item"
              :title="element.name"
            >
              <div class="components-body" :data-tag="element.tag">
                <svg-icon :icon-class="element.icon" />
                {{ element.name }}
              </div>
            </div>
          </draggable>
        </el-collapse-item>
        <el-collapse-item title="界面母版" name="3"> </el-collapse-item>
        <el-collapse-item title="自定义组件" name="4"> </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script>
let currentElement;
import {
  baseComponents,
  layoutComponents,
  templateComponents,
  customComponents,
  baseAttrs,
} from "@/render/components.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
import { deepClone, setRenderKeyDeep } from "@/utils/index";
import { dragHooks } from "@/render/dragHooks";
export default {
  name: "ElementPanel",
  data() {
    return {
      activeNames: ["1", "2", "3", "4"],
    };
  },
  computed: {
    baseComponents() {
      return baseComponents;
    },
    layoutComponents() {
      return layoutComponents;
    },
  },
  mounted() {},

  methods: {
    ...mapMutations(["updateVmComponents", "setActiveElementId"]),
    onMove(obj) {
      let { to, from } = obj;
      // console.log(obj);
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        dragHooks(currentElement, this);
        this.setActiveElementId(currentElement.renderKey);
      }
    },
    cloneComponent(origin) {
      const clone = deepClone(origin);
      setRenderKeyDeep(clone);
      if (clone.children && clone.children.length > 0) {
      }
      currentElement = clone;
      return clone;
    },
    handleChange() {},
  },
};
</script>

<style lang="scss">
.element-panel {
  height: 100%;
  overflow: hidden;
  &-scrollbar {
    height: 100%;
  }
  .el-collapse-item__content {
    padding-bottom: 15px;
  }
  .components-draggable {
    display: flex;
    gap: 10px;
    padding: 0 10px;
    flex-wrap: wrap;
    .components-item {
      width: calc(50% - 5px);
      padding: 5px 10px;
      background-color: #ededed;
      cursor: pointer;
      border-radius: 4px;
      .components-body {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        .svg-icon {
        }
      }
    }
  }
}
</style>