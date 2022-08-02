<template>
  <div>
    <div>
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>

        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="list[selectData.page]" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="title" width="180" />
        <el-table-column prop="body" label="body" />
      </el-table>
    </div>
    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="selectData.count"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { InitData, listInt } from "../types/order";
import { getList } from "../http/api";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getList().then((response: any) => {
        sliceList(response[0].data);
        data.selectData.count = response[0].data.length;
        data.dataList = response[0].data;
      });
    });

    const sliceList = (arr: listInt[]) => {
      data.list = [];
      for (let index = 0; index < arr.length; index += 10) {
        let list: any = arr.slice(index, index + 10);
        data.list.push(list);
      }
    };
    const currentChange = (page: number) => {
      data.selectData.page = page - 1;
    };
    const onSubmit = () => {
      let arr: listInt[] = [];
      if (data.selectData.title || data.selectData.body) {
        if (data.selectData.title) {
          arr = data.dataList.filter(
            (v) => v.title.indexOf(data.selectData.title.trim()) != -1
          );
        }
        if (data.selectData.body) {
          arr = data.dataList.filter(
            (v) => v.body.indexOf(data.selectData.body.trim()) != -1
          );
        }
      } else {
        arr = data.dataList;
      }
      data.selectData.count = arr.length;
      sliceList(arr);
    };
    return {
      ...toRefs(data),
      currentChange,
      onSubmit,
    };
  },
});
</script>

<style lang="scss"></style>
