<script>
function slotRender(h) {
  const componentOption = this.model.component;
  const tag = componentOption.name;
  switch (tag) {
    case "el-radio-group":
      return componentOption.option.map((item) => {
        return (
          <el-radio-button label={item.value} key={item.value}>
            {item.label}
          </el-radio-button>
        );
      });
    case "el-select":
      return componentOption.option.map((item) => {
        return (
          <el-option
            label={item.label}
            value={item.value}
            key={item.value}
          ></el-option>
        );
      });
    default:
      return null;
  }
}
function mainRender(h, child) {
  const model = this.model;
  const option = model.component;
  const Tag = option.name;
  const props = option.props || {};
  return h(
    Tag,
    {
      props: {
        ...props,
        value: option.value,
      },
      on: {
        input(value) {
          option.value = value;
        },
      },
    },
    child
  );
  // return (
  //   <Tag v-model={model.value} {...props}>
  //     {child}
  //   </Tag>
  // );
}
export default {
  name: "OptionComponent",
  props: ["model"],
  data() {
    return {};
  },

  mounted() {},
  watch: {
    "model.component.value"(val) {
      this.$set(this.model, "value", this.model.component.format?.(val) ?? val);
    },
  },
  methods: {},
  render(h) {
    let child = slotRender.call(this, h);
    let main = mainRender.call(this, h, child);
    return <el-form-item label={this.model.label}>{main}</el-form-item>;
  },
};
</script>

<style lang="scss">
</style>