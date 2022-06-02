<script setup lang="ts">
import PageTitle from "@/components/pageTitle.vue";
import PortListTable from "../components/port-list/port-table.vue";
</script>

<template>
  <PageTitle title="连接列表">
    <div class="m-title-btn-wrap">
      <router-link :to="{ name: 'portEdit' }">
        <el-button type="primary">新建连接</el-button>
      </router-link>
    </div>
  </PageTitle>
  <PortListTable />
</template>

<style scoped lang="scss">
.m-title-btn-wrap {
  display: flex;
  justify-content: end;
}
</style>
