<script>
import render from "@/render/renderer";
import {
  deepClone,
  findElement,
  closest,
  setRenderKeyDeep,
} from "@/utils/index";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("pageConfig");
const blockElement = ["ag-grid-vue"];
const elements = {
  layout(h, currentItem) {
    const child = renderChildren.apply(this, arguments);
    let isActive = this.activeElementId === currentItem.renderKey;
    let isCut = this.cutElementId === currentItem.renderKey;
    let classList = {
      "drag-item": true,
      "drag-item-layout": true,
      active: isActive,
      cut: isCut,
    };
    const element = (
      <right-menu options={this.menuOption}>
        <render
          key={currentItem.renderKey}
          conf={currentItem}
          class={classList}
          data-drag-tag={currentItem.tag}
          nativeOnContextmenu={(event) => {
            event.stopPropagation();
            this.setActiveElementId(currentItem.renderKey);
          }}
          nativeOnClick={(event) => {
            event.stopPropagation();
            this.setActiveElementId(currentItem.renderKey);
          }}
        >
          <draggable
            list={currentItem.children || []}
            animation={0}
            noTransitionOnDrag={true}
            group="componentsGroup"
            draggable=".drag-item"
            class="drag-wrapper"
            data-drag-tag={currentItem.tag}
          >
            {child}
          </draggable>
        </render>
      </right-menu>
    );
    return element;
  },
  component(h, currentItem) {
    const element = <render key={currentItem.renderKey} conf={currentItem} />;
    let isActive = this.activeElementId === currentItem.renderKey;
    let isCut = this.cutElementId === currentItem.renderKey;
    let classList = {
      "drag-item": true,
      "drag-item-component": true,
      "drag-item-component-block": blockElement.includes(currentItem.tag),
      active: isActive,
      cut: isCut,
    };
    return (
      <div
        class={classList}
        v-menu={this.menuOption}
        onContextmenu={(event) => {
          event.stopPropagation();
          this.setActiveElementId(currentItem.renderKey);
        }}
        onClick={(event) => {
          event.stopPropagation();
          this.setActiveElementId(currentItem.renderKey);
        }}
      >
        {element}
      </div>
    );
  },
};

function renderChildren(h, currentItem) {
  if (!Array.isArray(currentItem.children)) return null;
  return currentItem.children.map((el) => <DraggableItem currentItem={el} />);
  return currentItem.children.map((el) => {
    const element = elements[el.type];
    return element.call(this, h, el);
  });
}

export default {
  name: "DraggableItem",
  components: {
    render,
  },
  props: ["currentItem"],
  data() {
    return {};
  },

  computed: {
    ...mapState([
      "activeElementId",
      "vmComponents",
      "copyElement",
      "cutElementId",
    ]),

    menuOption() {
      const menuBaseOption = [
        {
          type: "li",
          text: "上移",
          callback: () => {
            const { activeIndex, activeParent, vmComponents } =
              this.activeElement();
            if (activeIndex == 0) {
              return;
            }
            [activeParent[activeIndex - 1], activeParent[activeIndex]] = [
              activeParent[activeIndex],
              activeParent[activeIndex - 1],
            ];
            this.updateVmComponents(vmComponents);
          },
        },
        {
          type: "li",
          text: "下移",
          callback: () => {
            const { activeIndex, activeParent, vmComponents } =
              this.activeElement();
            if (activeIndex == activeParent.length - 1) {
              return;
            }
            [activeParent[activeIndex + 1], activeParent[activeIndex]] = [
              activeParent[activeIndex],
              activeParent[activeIndex + 1],
            ];
            this.updateVmComponents(vmComponents);
          },
        },
        {
          type: "li",
          text: "复制",
          callback: () => {
            const { activeItem } = this.activeElement();
            if (this.cutElementId) {
              this.setCutElementId(null);
            }
            this.setCopyElement(activeItem);
          },
        },
        {
          type: "li",
          text: "剪切",
          callback: () => {
            const { activeItem } = this.activeElement();
            this.setCutElementId(activeItem.renderKey);
            this.setCopyElement(activeItem);
          },
        },
        {
          type: "li",
          text: "删除",
          callback: () => {
            const { activeItem, activeIndex, activeParent, vmComponents } =
              this.activeElement();
            activeParent.splice(activeIndex, 1);
            if (activeItem.renderKey === this.cutElementId) {
              this.setCopyElement(null);
              this.setCutElementId(null);
            }
            this.setActiveElementId(null);
            this.updateVmComponents(vmComponents);
          },
        },
      ];
      if (this.copyElement && this.currentItem.type == "layout") {
        if (
          this.copyElement.type == "component" ||
          !closest(this.copyElement, this.currentItem)
        ) {
          menuBaseOption.push({
            type: "li",
            text: "粘贴",
            callback: () => {
              let { activeItem, vmComponents } = this.activeElement();
              let copyElement = deepClone(this.copyElement);
              if (!this.cutElementId) {
                setRenderKeyDeep(copyElement);
              } else {
                let [cutItem, cutIndex, cutParent] = findElement(
                  this.cutElementId,
                  vmComponents
                );
                cutParent.splice(cutIndex, 1);
                this.setCopyElement(null);
              }
              if (activeItem.children) {
                activeItem.children.push(copyElement);
              } else {
                activeItem.children = [copyElement];
              }
              this.updateVmComponents(vmComponents);
              this.setCutElementId(null);
            },
          });
        }
      }
      return menuBaseOption;
    },
  },
  methods: {
    ...mapMutations([
      "updateVmComponents",
      "setActiveElementId",
      "setCopyElement",
      "setCutElementId",
    ]),
    activeElement() {
      const activeId = this.activeElementId;
      const vmComponents = deepClone(this.vmComponents);
      if (!activeId && vmComponents.length <= 0) {
        return;
      }
      const [activeItem, activeIndex, activeParent] = findElement(
        activeId,
        vmComponents
      );
      return { activeItem, activeIndex, activeParent, vmComponents };
    },
  },
  render(h) {
    const element = elements[this.currentItem.type];

    return element.call(this, h, this.currentItem);
  },
};
</script>
