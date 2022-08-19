<template>
  <div class="model-options">
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
      v-if="currentRow"
      @validate="onValidate"
    >
      <el-form-item label="字段名" prop="field">
        <el-input
          v-model.trim="formData.field"
          placeholder="请输入字段名"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="title">
        <el-input
          v-model.trim="formData.title"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <template v-if="modelType == 'data' || modelType == 'props'">
        <el-form-item label="数据类型" prop="type">
          <el-radio-group v-model="formData.type" @change="onTypeChange">
            <el-radio-button
              v-for="item in typeList"
              :label="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="默认值"
          prop="defaultValue"
          :key="'defaultValue-' + checkType"
        >
          <MonacoEditor
            v-model="formData.defaultValue"
            v-if="['Array', 'Object', 'Function'].includes(checkType)"
            :language="language"
            height="240px"
            :fixedOptions="fixedOptions"
          />
          <el-radio-group
            v-model="formData.defaultValue"
            v-if="checkType == 'Boolean'"
          >
            <el-radio-button :label="true" :key="true"> true </el-radio-button>
            <el-radio-button :label="false" :key="false">
              false
            </el-radio-button>
          </el-radio-group>
          <el-input
            v-model.trim="formData.defaultValue"
            v-if="['String', 'Number'].includes(checkType)"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </template>
      <template v-if="modelType == 'computed'">
        <el-form-item label="getter" prop="getVal" key="getVal">
          <MonacoEditor
            v-model="formData.getVal"
            language="javascript"
            height="240px"
            :fixedOptions="{
              show: true,
            }"
          />
        </el-form-item>
        <el-form-item label="setter" prop="setVal" key="setVal">
          <MonacoEditor
            v-model="formData.setVal"
            language="javascript"
            height="240px"
            :fixedOptions="{
              show: true,
              params: 'newValue',
            }"
          />
        </el-form-item>
      </template>
    </el-form>
    <CodemirrorEditor></CodemirrorEditor>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "ModelOptions",
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
        return callback(new Error("请输入字段名"));
      }
      // try {
      //   eval(`let a = {"${value}":1}`);
      // } catch (error) {
      //   return callback(new Error("请输入正确的字段名"));
      // }
      let vmData = this.$store.state.pageConfig.vmData;
      let hasSame = Object.keys(vmData).some((modelKey) => {
        return Object.values(vmData[modelKey]).some(
          (item) =>
            item.renderKey != this.formData.renderKey && item.field == value
        );
      });
      if (hasSame) {
        return callback(new Error("已存在相同的字段名"));
      }
      callback();
    };
    const checkDefault = (rule, value, callback) => {
      if (
        !this.currentRow?.defaultValue ||
        ["String", "Number", "Boolean"].includes(this.checkType)
      ) {
        return callback();
      }
      try {
        if (
          this.checkType == "Function" &&
          eval(`(function (){${this.currentRow.defaultValue}})`) instanceof
            Function
        ) {
          return callback();
        }
        let parseJson = JSON.parse(`${this.currentRow.defaultValue}`);
        if (this.checkType == "Array" && parseJson instanceof Array) {
          return callback();
        } else if (this.checkType == "Object" && parseJson instanceof Object) {
          return callback();
        }
        return callback(new Error("格式错误"));
      } catch (error) {
        return callback(new Error("格式错误"));
      }
    };
    const checkFunc = (rule, value, callback) => {
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
    return {
      typeList: [
        {
          label: "字符串",
          value: "String",
        },
        {
          label: "数字",
          value: "Number",
        },
        {
          label: "布尔值",
          value: "Boolean",
        },
        {
          label: "数组",
          value: "Array",
        },
        {
          label: "对象",
          value: "Object",
        },
        {
          label: "方法",
          value: "Function",
        },
      ],
      rules: {
        field: [
          {
            required: true,
            trigger: "change",
            validator: debounce(200, checkField),
          },
        ],
        defaultValue: [
          {
            trigger: "change",
            validator: checkDefault,
          },
        ],
        getVal: [
          {
            required: true,
            trigger: "change",
            message: "请输入getter",
          },
          {
            trigger: "change",
            validator: checkFunc,
          },
        ],
        setVal: [
          {
            trigger: "change",
            validator: checkFunc,
          },
        ],
      },
      checkType: "",
    };
  },
  computed: {
    fixedOptions() {
      if (this.checkType == "Function") {
        return {
          show: true,
        };
      }
    },
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
        this.checkType = this.currentRow?.type;
        this.$refs.elForm && this.$refs.elForm?.validate();
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    onValidate() {},
    onTypeChange(val) {
      this.formData.defaultValue = "";
      this.$nextTick(() => {
        this.checkType = val;
      });
    },
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