<template>
  <el-dialog
    title="图标选择"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    top="0"
    @open="onOpen"
  >
    <el-scrollbar style="height: 50vh">
      <ul class="icon-list">
        <li
          v-for="icon in iconList"
          :key="icon.value"
          :class="{ active: active === icon.value }"
          @click="active = icon.value"
        >
          <i :class="icon.value"></i>
        </li>
      </ul>
    </el-scrollbar>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
const iconList = require("@/assets/iconfont.json");
export default {
  name: "IconModal",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      active: "",
    };
  },
  computed: {
    iconList() {
      return iconList;
    },
  },
  methods: {
    onOpen() {
      this.active = this.defaultValue?.value;
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      this.$emit("submit", {
        label: this.active,
        value: this.active,
      });
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss">
.icon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding: 5px;
  li {
    width: calc(100% / 20);
    height: 45px;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #409eff;
    }
    &.active {
      background-color: #409eff;
      color: #fff;
    }
    i {
      font-size: 20px;
    }
  }
}
</style>