<script setup lang="ts">
import PageTitle from "@/components/pageTitle.vue";
import SiteListTable from "../components/site-list/site-table.vue";
</script>

<template>
  <PageTitle title="分类列表">
    <div class="m-title-btn-wrap">
      <router-link :to="{ name: 'siteEdit' }">
        <el-button type="primary">新建分类</el-button>
      </router-link>
    </div>
  </PageTitle>
  <SiteListTable />
</template>

<style scoped lang="scss">
.m-title-btn-wrap {
  display: flex;
  justify-content: end;
}
</style>
