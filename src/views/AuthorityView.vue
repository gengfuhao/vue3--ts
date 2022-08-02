<template>
  <el-tree
    :data="data"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { InitData } from "../types/authority";

export default defineComponent({
  setup() {
    const route = useRoute();
    const query: any = route.query;
    console.log("query", query);

    const data = reactive(new InitData(query.roleId, query.authority));
    console.log("data", data);
    const defaultProps = {
      children: "children",
      label: "label",
    };
    return {
      ...toRefs(data),
      defaultProps,
    };
  },
});
</script>

<style lang="scss"></style>
