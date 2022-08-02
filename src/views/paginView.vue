<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="paginForm"
      status-icon
      :rules="rules"
      label-width="65px"
      class="paginForm"
    >
      <el-form-item label="账号" prop="userName">
        <el-input v-model="paginForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input
          v-model="paginForm.passWord"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="sub-btn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { InitData } from "../types/pagin";
import type { FormInstance, FormRules } from "element-plus";
import { pagin11 } from "../http/api";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "pagin",
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    const rules = {
      userName: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 4, max: 14, message: "账号长度在4-14间", trigger: "blur" },
      ],
      passWord: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 4, max: 14, message: "密码长度在4-14间", trigger: "blur" },
      ],
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid: boolean) => {
        if (valid) {
          pagin11(data.paginForm).then((response) => {
            //把登入的token令牌存起来
            // localStorage.setItem("token", response.data.token);
            // console.log("response", response);
          });
          router.push("/");
        }
      });
    };

    return {
      ...toRefs(data),
      rules,
      submitForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 200px;
}
.paginForm {
  width: 450px;
  padding: 20px;
  background: rgb(184, 225, 218);
  margin: 0 auto;
  border-radius: 20px;
}
.sub-btn {
  width: 100%;
}
</style>
