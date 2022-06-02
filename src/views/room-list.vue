<script setup lang="ts">
import PageTitle from "@/components/pageTitle.vue";
import RoomListTable from "../components/room-list/room-table.vue";
</script>

<template>
  <PageTitle title="房间列表">
    <div class="m-title-btn-wrap">
      <router-link :to="{ name: 'roomEdit' }">
        <el-button type="primary">新建房间</el-button>
      </router-link>
    </div>
  </PageTitle>
  <RoomListTable />
</template>

<style scoped lang="scss">
.m-title-btn-wrap {
  display: flex;
  justify-content: end;
}
</style>
