import ElTableEdit from "./src/index.vue";
import EditItem from "./src/EditItem.vue";

const install = function (Vue) {
  Vue.component(ElTableEdit.name, ElTableEdit);
  Vue.component(EditItem.name, EditItem);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "1.1.1",
  install,
  ElTableEdit,
  EditItem,
};

export { ElTableEdit, EditItem };
