import type { FormInstance } from "element-plus";
import { ref } from "vue";

export interface paginFormInt {
  userName: String;
  passWord: String;
}
export class InitData {
  paginForm: paginFormInt = {
    userName: "",
    passWord: "",
  };
  ruleFormRef = ref<FormInstance>();
}
