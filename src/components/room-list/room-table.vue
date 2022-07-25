<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import {
  chatRoomList,
  chatRoomSwitchUpdate,
  chatRoomListDelete,
} from "../../ts/api";
import { pageSize } from "../../ts/config";
import { calcIndexDesc } from "../../ts/util";
import { modifySuccess } from "../../ts/lang";

const route = useRoute();
const router = useRouter();

const { chatSite } = route.params;

const handleEdit = (index: number, row: any) => {
  router.push({ name: "roomEdit", params: { roomId: row.id } });
};
const handleDelete = (row: any) => {
  chatRoomListDelete({ id: row.id }).then((res) => {
    if (!res) return;
    const _list = tableData.value.filter((item: any) => item.id !== row.id);
    tableData.value = _list;
  });
};

const switchFn = (key: string, row: any) => {
  console.log(key);
  chatRoomSwitchUpdate({
    id: row.id,
    route: row.route,
    key,
    value: row[key],
  }).then((res) => {
    if (!res) return;
    ElMessage.success(modifySuccess);
  });
};

const curPage = ref(1);
const total = ref(0);
const searchKey = ref("");
const tableData = ref([]);
const searchFn = () => {
  curPage.value = 1;
  fetchList();
};
const gotoPage = (page: number) => {
  curPage.value = page;
  fetchList();
};
const fetchList = () => {
  chatRoomList({
    page: curPage.value,
    pageSize,
    key: searchKey.value,
    chatSite,
  }).then((res) => {
    if (!res) return;
    total.value = res.total;
    tableData.value = res.list;
  });
};

onMounted(() => {
  fetchList();
});
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号" #default="scope" width="100px">
      {{ calcIndexDesc(total, curPage, pageSize, scope.$index) }}
    </el-table-column>
    <el-table-column label="房间名" #default="scope">
      <el-link type="primary">
        <router-link
          :to="{
            name: 'siteOnline',
            params: { room: scope.row.hash, wsRoute: scope.row.route },
          }"
          >{{ scope.row.name }}</router-link
        >
      </el-link>
    </el-table-column>
    <el-table-column label="网站" prop="chatSite" />
    <el-table-column label="房主" prop="owner" />
    <el-table-column label="连接路由" prop="route" />
    <el-table-column label="人数上限" prop="limit" />
    <el-table-column label="聊天框公告" prop="isTip" #default="scope">
      {{ scope.row.isTip ? "开启" : "关闭" }}
    </el-table-column>
    <el-table-column label="问候语" prop="greeting" />
    <el-table-column label="密码" prop="passwordTxt" />
    <el-table-column label="验证密码" prop="isPassword" #default="scope">
      <el-switch
        v-model="scope.row.isPassword"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isPassword', scope.row)"
      ></el-switch>
    </el-table-column>
    <el-table-column label="允许游客浏览" prop="isGuestView" #default="scope">
      <el-switch
        v-model="scope.row.isGuestView"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isGuestView', scope.row)"
      ></el-switch>
    </el-table-column>
    <el-table-column label="允许游客聊天" prop="isGuestChat" #default="scope">
      <el-switch
        v-model="scope.row.isGuestChat"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isGuestChat', scope.row)"
      ></el-switch>
    </el-table-column>
    <el-table-column align="right" width="250px">
      <template #header>
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="searchKey"
              size="small"
              placeholder="Type to search"
            />
          </el-col>
          <el-col :span="6">
            <el-button @click="searchFn" type="primary" size="small"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-row justify="center" class="m-page-top">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="gotoPage"
    />
  </el-row>
</template>
