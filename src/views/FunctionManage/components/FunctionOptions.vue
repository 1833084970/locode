<template>
  <div class="model-options">
    <el-scrollbar style="height: 100%">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
        v-if="currentRow"
        @validate="onValidate"
      >
        <el-form-item label="方法名称" prop="field">
          <el-input
            v-model.trim="formData.field"
            placeholder="请输入方法名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="title">
          <el-input
            v-model.trim="formData.title"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model.trim="formData.description"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="形参" prop="params">
          <el-input
            v-model.trim="formData.params"
            placeholder="多个形参请用英文逗号分隔"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item prop="value">
          <MonacoEditor
            :key="formData.renderKey"
            v-model="formData.value"
            height="400px"
            :fixedOptions="{
              show: true,
              name: formData.field,
              params: formData.params,
            }"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "FunctionOptions",
  props: {
    currentRow: {
      type: Object,
      default() {
        return {};
      },
    },
    modelType: {
      type: String,
    },
  },
  data() {
    const checkField = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入方法名"));
      }
      // if (/(^\d)|(\W)/.test(value)) {
      //   return callback(new Error("请输入正确的方法名"));
      // }
      try {
        eval(`let ${value}`);
      } catch (error) {
        return callback(new Error("请输入正确的方法名"));
      }
      let methods = this.$store.state.pageConfig.vmFunctions.methods;
      let hasSame = Object.keys(methods).some((key) => {
        return key != this.formData.renderKey && methods[key].field == value;
      });
      if (hasSame) {
        return callback(new Error("已存在相同的方法名"));
      }
      callback();
    };
    const checkValue = (rule, value, callback) => {
      if (!value) {
        return callback();
      }
      try {
        if (eval(`(function (){${value}})`) instanceof Function) {
          return callback();
        }
        return callback(new Error("格式错误"));
      } catch (error) {
        return callback(new Error("格式错误"));
      }
    };
    const checkParams = (rule, value, callback) => {
      if (!value) {
        return callback();
      }
      try {
        value.split(",").forEach((param) => {
          eval(`let ${param}`);
        });
      } catch (error) {
        return callback(new Error("形参格式不正确"));
      }
      return callback();
    };

    return {
      rules: {
        field: [
          {
            required: true,
            trigger: "change",
            validator: debounce(200, checkField),
          },
        ],
        value: [
          {
            trigger: "change",
            validator: checkValue,
          },
        ],
        params: [
          {
            trigger: "change",
            validator: debounce(200, checkParams),
          },
        ],
      },
    };
  },
  computed: {
    formData() {
      return this.currentRow || {};
    },
    language() {
      if (["Array", "Object"].includes(this.formData.type)) {
        return "json";
      }
      return "javascript";
    },
  },
  watch: {
    "currentRow.renderKey": {
      handler(val) {
        this.$refs.elForm && this.$refs.elForm?.validate();
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    onValidate() {},
  },
};
</script>

<style lang="scss">
.model-options {
  height: 100%;
  .el-form {
    padding: 40px;
    width: 100%;
    max-width: 800px;
  }
}
</style>