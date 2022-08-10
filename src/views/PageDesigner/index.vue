<template>
  <div class="page-designer">
    <div class="page-designer-left"><ElementPanel /></div>
    <div class="page-designer-center"><DrawPanel /></div>
    <div class="page-designer-right"><OptionsPanel /></div>
  </div>
</template>

<script>
import components from "./components";
export default {
  name: "PageDesigner",
  components,
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
.page-designer {
  display: flex;
  height: 100%;
  &-left {
    width: 280px;
  }
  &-right {
    width: 380px;
  }
  &-center {
    flex: 1;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
  }
}
</style>