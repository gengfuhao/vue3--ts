<template>
  <el-button type="primary" @click="addRole">添加角色</el-button>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column prop="roleId" label="id" width="180" />
    <el-table-column prop="roleName" label="Name" width="180" />
    <el-table-column prop="authority" label="操作">
      <template #default="scope">
        <el-button
          @click="authorityChange(scope.row)"
          link
          type="primary"
          size="small"
        >
          修改权限
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { InitData, ListInt } from "../types/role";
import { getRoleList } from "../http/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    onMounted(() => {
      getRoleList().then((response: any) => {
        data.list = response[0].data;
      });
    });
    const authorityChange = (scope: ListInt) => {
      console.log("1112", scope);
      //跳转到authority页面，
      router.push({
        path: "Authority",
        query: {
          roleId: scope.roleId,
          //authority是一个数组，以一个数组的形式传递是不可以的 转换成string
          authority: scope.authority.join(","),
        },
      });
    };
    const addRole = () => {
      ElMessageBox.prompt("请输入添加角色名称", "添加", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value) {
            data.list.push({
              //通过长度获取下一位
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `你添加的角色为:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "添加失败",
          });
        });
    };
    return {
      authorityChange,
      ...toRefs(data),
      addRole,
    };
  },
});
</script>

<style lang="scss"></style>
