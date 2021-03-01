<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <template slot="append">
      <slot name="append"></slot>
    </template>

    <template v-for="item in columns">
      <el-table-column
        v-if="['index', 'selection'].includes(item.type)"
        :key="item.type"
        :type="item.type"
        :index="item.index"
        :fixed="item.fixed || false"
      ></el-table-column>

      <el-table-column
        v-else
        :label="item.title"
        :key="item.key"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.fixed || false"
      >
        <template slot-scope="scope">
          <!-- 编辑时 -->
          <template v-if="item.edit && scope.row._edit">
            <EditItem
              v-model="scope.row[item.key]"
              :options="item"
              :ref="'chechItem-' + scope.$index"
            >
            </EditItem>
          </template>

          <!-- 预览时 -->
          <slot v-else :name="item.key" :row="scope.row" :$index="scope.$index">
            <i v-if="item.type === 'icon'" :class="scope.row[item.key]"></i>

            <span v-else-if="item.type === 'select'">
              {{ scope.row[item.key] || selectFilter(item.options || []) }}
            </span>

            <span v-else>{{ scope.row[item.key] }}</span>
          </slot>
        </template>
      </el-table-column>
    </template>

    <el-table-column label="操作" :width="actionsWidth" :fixed="actionsFixed">
      <template slot="header">
        <slot name="header"></slot>
      </template>

      <template
        v-if="columns.some((item) => item.edit === true)"
        slot-scope="scope"
      >
        <el-button
          v-if="!scope.row._edit"
          @click="editItem(scope.row)"
          size="small"
          type="primary"
          plain
        >
          {{ editButText }}
        </el-button>
        <template v-else>
          <el-button
            @click="validateRow(scope.row, scope.$index)"
            size="small"
            type="primary"
          >
            {{ submitButText }}
          </el-button>
          <el-button size="small" @click="cancelEdit(scope.row, scope.$index)">
            {{ cancelButText }}
          </el-button>
        </template>

        <slot
          name="column-actions"
          :row="scope.row"
          :$index="scope.$index"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import EditItem from "./EditItem.vue";

export default {
  /**
   * 事件
   * @delItem 点击删除时执行 参数：当前row
   * @submitRow 点击保存并通过验证 参数：当前 row,是否通过 valid
   */
  name: "ElTableEdit",
  components: { EditItem },
  props: {
    // 列配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 操作栏宽度
    actionsWidth: {
      type: Number,
      default: 250,
    },
    actionsFixed: {
      type: [Boolean, String],
      default: false,
    },
    editButText: {
      type: String,
      default: "编辑",
    },
    submitButText: {
      type: String,
      default: "保存",
    },
    cancelButText: {
      type: String,
      default: "取消",
    },
  },
  methods: {
    // 编辑单行
    editItem(row) {
      this.$set(row, "_edit", true);
    },

    // 取消编辑
    cancelEdit(row, index) {
      this.$refs["chechItem-" + index].forEach((item) => {
        item.cancelEdit();
      });
      this.$set(row, "_edit", false);
    },

    // 点击保存按钮时表单验证
    validateRow(row, index) {
      const promiseList = [];
      this.$refs["chechItem-" + index].forEach((item) => {
        promiseList.push(item.validateRow());
      });
      Promise.all(promiseList)
        .then(() => {
          this.$emit("submitRow", row, true);
        })
        .catch(() => {
          this.$emit("submitRow", row, false);
        });
    },
  },
  filters: {
    selectFilter(value, options) {
      return options.find((item) => item.value === value) || "";
    },
  },
};
</script>
