<template>
  <div>
    <div>
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            v-model="selectData.role"
            class="m-2"
            placeholder="请选择角色"
          >
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="nikeName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-button
              v-for="i in scope.row.role"
              :key="i.role"
              link
              type="primary"
              size="small"
            >
              {{ i.roleName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
          <template #default="scope">
            <el-button @click="btn(scope.row)" link type="primary" size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="isShow" title="编辑">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input
          placeholder="请输入姓名"
          v-model="active.nikeName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select v-model="active.role" placeholder=" 请选择角色" multiple>
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="userChange">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { InitData, listInt } from "../types/user";
import { getUserList, getRoleList } from "../http/api";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getUserList().then((response: any) => {
        data.list = response[0].data;
        data.list2 = response[0].data;
      });
      getRoleList().then((response: any) => {
        data.roleList = response[0].data;
      });
    });

    const onSubmit = () => {
      let arr: [listInt][] = [];
      if (data.selectData.nikeName || data.selectData.role) {
        console.log("data.list2", data.list2);

        if (data.selectData.nikeName) {
          arr = data.list2.filter(
            (v: any) => v.nikeName.indexOf(data.selectData.nikeName) != -1
          );
        }
        if (data.selectData.role) {
          arr = (data.selectData.nikeName ? arr : data.list2).filter((v: any) =>
            v.role.find((i: any) => i.role === data.selectData.role)
          );
        }
      } else {
        arr = data.list2;
      }
      data.list = arr;
    };

    const btn = (row: listInt) => {
      data.isShow = true;

      data.active = {
        id: row.id,
        nikeName: row.nikeName,
        userName: row.userName,
        role: row.role.map((v: any) => v.role || v.roleId),
      };

      console.log(data.active, "active");
    };
    const userChange = () => {
      const obj: any = data.list.find((v: any) => v.id === data.active.id);
      obj.nikeName = data.active.nikeName;
      obj.role = data.roleList.filter(
        (v: any) => data.active.role.indexOf(v.roleId) != -1
      );
      console.log("!!!!!", obj.role);
      console.log("##########", obj);
      data.isShow = false;
    };
    return {
      ...toRefs(data),
      btn,
      onSubmit,
      userChange,
    };
  },
});
</script>

<style lang="scss"></style>
