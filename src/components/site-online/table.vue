<script setup lang="ts">
import { useUserOnlineStore } from "../../store/user-online";
import { formatDate } from "../../ts/util";
import { useWsStore } from "../../store/wsStore";
import { modifyUserStatus, userDisconnect } from "../../ts/ws.send";

const props = defineProps({
  room: {
    type: String,
    required: true,
  },
});

const userOnline = useUserOnlineStore();
const userList = computed(() => userOnline.list);
const userCount = computed(() => userOnline.count);

const wsStore = useWsStore();
const ws = computed(() => wsStore.ws);

interface User {
  fd: number;
  name: string;
  room: string;
  status: number;
  ip: string;
  time: number;
}
const search = ref("");
const filterTableData = computed(() =>
  userList.value.filter(
    (data: User) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleUserDisconnect = (row: User) => {
  userDisconnect(ws.value, {
    room: props.room,
    name: row.name,
    fd: row.fd,
  });
  let _list = userList.value.filter((item: any) => item.fd !== row.fd);
  userOnline.updateList(_list);
};

const modifyUserStatusFn = (row: any, status: number) => {
  const newInfo = {
    status,
    room: props.room,
    name: row.name,
    fd: row.fd,
  };
  modifyUserStatus(ws.value, newInfo);
  Object.assign(row, { status });
};
</script>

<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="序号" #default="scope" width="100px">
      {{ userCount - scope.$index }}
    </el-table-column>
    <el-table-column label="头像" #default="scope">
      <img class="m-user-online-avatar" :src="scope.row.avatar" alt="" />
    </el-table-column>
    <el-table-column label="用户名" prop="name" />
    <!-- <el-table-column label="房间">{{ props.room }}</el-table-column> -->
    <el-table-column label="IP" prop="ip" />
    <el-table-column label="开始时间" #default="scope">
      {{ formatDate(scope.row.time * 1000, "Y-m-d H:i:s") }}
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="用户名搜索" />
      </template>
      <template #default="scope">
        <el-popconfirm
          v-if="scope.row.status === 0"
          :title="`是否对 ${scope.row.name} 禁言?`"
          @confirm="modifyUserStatusFn(scope.row, 1)"
          confirmButtonText="是"
          cancelButtonText="否"
        >
          <template #reference>
            <el-button size="small" type="primary">禁言</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
          v-else
          :title="`是否允许 ${scope.row.name} 聊天?`"
          @confirm="modifyUserStatusFn(scope.row, 0)"
          confirmButtonText="是"
          cancelButtonText="否"
        >
          <template #reference>
            <el-button size="small" type="danger">允许聊天</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
          :title="`是否让 ${scope.row.name} 强制下线?`"
          @confirm="handleUserDisconnect(scope.row)"
          confirmButtonText="是"
          cancelButtonText="否"
        >
          <template #reference>
            <el-button size="small" type="danger">下线</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
.m-user-online-avatar {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
