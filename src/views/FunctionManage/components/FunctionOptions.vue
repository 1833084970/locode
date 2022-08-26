<template>
  <div class="function-options">
    <el-scrollbar style="height: 100%">
      <el-row :gutter="20">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
          v-if="Object.keys(formData).length > 0"
          @validate="onValidate"
        >
          <el-col :span="24" :offset="0">
            <el-form-item label="模板" prop="tpl">
              <modal-select
                v-model="functionTpl"
                @change="onTplChange"
                modal="FunctionTemplateModal"
                :style="{ width: '100%' }"
                :defaultProps="{
                  value: 'key',
                  label: 'name',
                }"
                icon="el-icon-search"
              ></modal-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="方法名称" prop="field">
              <el-input
                v-model.trim="formData.field"
                placeholder="请输入方法名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            v-for="item in extraVar"
            :key="item.field"
            :span="12"
            :offset="0"
          >
            <option-component
              :model="item"
              @change="onExtraVarChange($event, item)"
            />
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="描述" prop="description">
              <el-input
                v-model.trim="formData.description"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="形参" prop="params">
              <el-input
                v-model.trim="formData.params"
                placeholder="多个形参请用英文逗号分隔"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item prop="value">
              <FunctionEditor :model="formData" :functionTpl="functionTpl" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";
import methodTpl from "@/render/methodTpl";
import { deepClone } from "@/utils";
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
      functionTpl: null,
      // modalProps: {},
    };
  },
  computed: {
    formData() {
      return this.currentRow || {};
    },
    extraVar() {
      return (
        this.functionTpl?.extraVar.filter((item) => {
          if (!item.isCode) {
            let value = this.formData.extraVar[item.field];
            if (item.isLinkModel && value) {
              let [key] = value.split("-");
              let field =
                this.$store.state.pageConfig[item.isLinkModel][key][value]
                  ?.field;
              value = {
                field,
                renderKey: value,
              };
            }
            item.component.value = value;
            return true;
          }
        }) || []
      );
    },
  },
  watch: {
    "currentRow.renderKey": {
      handler(val) {
        this.$refs.elForm && this.$refs.elForm?.validate();
        if (this.formData && this.formData.template) {
          this.functionTpl = this.findElement(
            methodTpl,
            this.formData.template
          );
          this.functionTpl.extraVar.forEach((item) => {
            item.value = this.formData.extraVar[item.field] ?? item.value;
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    findElement(list, key) {
      let res = null;
      const find = (list) => {
        list.some((item) => {
          if (item.key == key) {
            res = deepClone(item);
            return true;
          }
          if (item.children) {
            return find(item.children);
          }
        });
      };
      find(list);
      return res;
    },
    onExtraVarChange(val, extraVar) {
      this.formData.extraVar[extraVar.field] =
        extraVar.component.format?.(val) ?? val;
      // this.$set(this.formData.extraVar, currentField, val.renderKey);
    },
    onTplChange(tpl) {
      if (tpl) {
        this.formData.template = tpl.key;
        Object.keys(this.formData).forEach((key) => {
          if (tpl[key]) {
            this.formData[key] = this.formData[key] ?? tpl[key];
          }
        });
        this.formData.extraVar = tpl.extraVar.reduce((res, current) => {
          res[current.field] =
            this.formData.extraVar[current.field] ?? current.value;
          return res;
        }, {});
      }
    },
    onValidate() {},
  },
};
</script>

<style lang="scss">
.function-options {
  height: 100%;
  .el-form {
    padding: 40px;
    width: 100%;
    // max-width: 800px;
  }
}
</style>