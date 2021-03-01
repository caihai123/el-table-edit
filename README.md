# 一个基于 element-ui 的可编辑表格组件

## 使用 `async-validator` 验证

## Install

- 下载包 `npm i el-table-edit`
- 全局注册

```js
import ElTableEdit from "el-table-edit";
Vue.use(ElTableEdit);
```

- 在浏览器中使用

  下载 dist 中的 js 和 css 文件并引入

## Usage

```vue
<template>
  <ElTableEdit
    :data="tableData"
    :columns="columns"
    border
    stripe
    style="width: 100%"
    @submitRow="submit"
  >
    <template v-slot:column-actions="{ row, $index }">
      <el-button @click="delItem(row, $index)" type="danger" size="small">
        删除
      </el-button>
    </template>
  </ElTableEdit>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "菜单名",
          key: "title",
          edit: true,
          rules: [
            { required: true, message: "请输入菜单名称" },
            {
              min: 2,
              max: 5,
              message: "长度在 2 到 5 个字符",
            },
          ],
          clearable: true,
        },
        {
          title: "路径",
          key: "path",
          edit: true,
          rules: [
            { required: true, message: "请输入菜单路径" },
            {
              pattern: /^\/[\w-/]*$/,
              message: "请输入正确的路径",
            },
          ],
          clearable: true,
        },
        {
          title: "图标",
          key: "icon",
          type: "icon",
          edit: true,
          rules: [],
          clearable: true,
        },
      ],
      tableData: [{ title: "首页", path: "/index", icon: "el-icon-s-home" }],
    };
  },
  methods: {
    submit(row, valid) {
      if (valid) {
        // 验证通过
      } else {
        // 验证不通过
      }
    },
  },
};
</script>
```

## Api

### ElTableEdit

| 参数              | 说明         | 类型             | 可选值 | 默认值 |
| ----------------- | ------------ | ---------------- | ------ | ------ |
| data              | tabledata    | Array            |        | []     |
| columns           | 列配置       | Array            |        | []     |
| actionsWidth      | 操作栏宽度   | Number           |        | 250    |
| editButText       | 编辑按钮文字 | String           |        | 编辑   |
| submitButText     | 保存按钮文字 | String           |        | 保存   |
| cancelButText     | 取消按钮文字 | String           |        | 取消   |
| actionsFixed      | 操作栏固定   | 与 el-table 一致 |        | false  |
| el-table 其他属性 |              |                  |        |        |

### columns

| 参数      | 说明                                    | 类型                                                                    |
| --------- | --------------------------------------- | ----------------------------------------------------------------------- |
| title     | 列标题                                  |                                                                         |
| key       | 与 data 对应的字段名                    | String                                                                  |
| width     | 列宽度                                  | 与 el-table 一致                                                        |
| minWidth  | 列最小宽度                              | 与 el-table 一致                                                        |
| edit      | 是否可编辑                              | Boolean                                                                 |
| rules     | 可编辑时的验证规则                      | Array                                                                   |
| clearable | 编辑时的 input 是否可清空               | 与 el-input 一致                                                        |
| type      | 当前列字段的类型                        | 目前可选‘index’，‘selection’，‘icon’，‘select’ ,‘textarea’ ，默认‘text’ |
| options   | type 为 select 时，用于过滤或选择的数组 | 例： [{label:"男",value:"1",},{label:"女",value:"2"}]                   |
| fixed     | 列固定                                  | 与 el-table 一致                                                        |

### Events

| 事件名称          | 说明         | 回调参数       |
| ----------------- | ------------ | -------------- |
| submitRow         | 点击行保存时 | （row，valid） |
| el-table 其他事件 |              |                |

### Slot

| name           | 说明                                                 | props            |
| -------------- | ---------------------------------------------------- | ---------------- |
| header         | 操作栏头部内容                                       |
| append         | 表格最后一行内容，与 el-tabel 一样                   |
| column-actions | 操作栏的内容，会在按钮之后，可用来做删除，打印等功能 | （row，\$index） |
| `key`          | 自定义单元格的非编辑状态                             | （row，\$index） |
