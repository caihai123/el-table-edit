<template>
  <div
    :class="{
      'check---item': options.rules && options.rules.length,
      'is---error': isError,
    }"
  >
    <el-select
      v-if="options.type === 'select'"
      v-model="modelValue"
      :placeholder="options.placeholder || '请选择'"
      :clearable="options.clearable"
      :size="size"
    >
      <el-option
        v-for="i in options.options"
        :key="i.value"
        :label="i.label"
        :value="i.value"
      >
      </el-option>
    </el-select>

    <el-input
      v-else
      v-model="modelValue"
      :type="options.type === 'textarea' ? 'textarea' : 'text'"
      :placeholder="options.placeholder || '请输入内容'"
      :clearable="options.clearable"
      :size="size"
      :autosize="{ minRows: 1, maxRows: 4}"
    ></el-input>
    <div v-if="isError && !hiddenMessage" class="item---error">{{ message }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  name: "EditItem",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    options: {
      type: Object,
      required: true,
    },
    size: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["medium", "small", "mini", ""].indexOf(value) !== -1;
      },
      default: "",
    },
    // 是否隐藏 Message
    hiddenMessage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isError: false,
      message: "",
      initValue: this.value,
    };
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    // 字段验证
    validateRow() {
      // 没有规则时直接返回成功
      if (!(this.options.rules && this.options.rules.length)) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }

      return new Promise((resolve, reject) => {
        const validator = new Schema({ value: this.options.rules });
        validator.validate({ value: this.value }, (errors) => {
          if (errors) {
            this.isError = true;
            this.message = errors[0].message;
            reject(errors);
          } else {
            this.isError = false;
            this.message = "";
            resolve(true);
          }
        });
      });
    },
    // 取消编辑
    cancelEdit() {
      this.$emit("input", this.initValue);
    },
  },
};
</script>

<style scoped>
.check---item {
  position: relative;
}
.is---error >>> .el-input__inner {
  border-color: #f56c6c;
}
.item---error {
  line-height: 16px;
  font-size: 12px;
  color: #f56c6c;
}
</style>
