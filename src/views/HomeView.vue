<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header" height="80px">
        <el-row :gutter="20">
          <el-col :span="4"
            ><img class="logo" src="../assets/logo.png" alt="img"
          /></el-col>
          <el-col :span="16"><h2>系统</h2> </el-col>
          <el-col :span="4"
            ><el-button class="btn-text" type="success"
              >other</el-button
            ></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" router>
            <el-menu-item :index="v.path" v-for="v in list" :key="v.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ v.meta.title }}</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const router = useRouter();
    const list = router.getRoutes().filter((x) => x.meta.isShow);

    return {
      list,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-header {
  background-color: rgba(64, 97, 97, 0.507);
}
.logo {
  height: 80px;
}
h2 {
  text-align: center;
  color: rgb(39, 163, 194);
  // height: 80px;
  line-height: 80px;
}
.btn-text {
  text-align: right;
  height: 80px;
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
