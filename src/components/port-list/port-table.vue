<script lang="ts" setup>
import { useRouter } from "vue-router";
import { chatPortList, chatPortListDelete } from "../../ts/api";
import { pageSize } from "../../ts/config";
import { calcIndexDesc } from "../../ts/util";

const router = useRouter();

const handleEdit = (index: number, row: any) => {
  router.push({ name: "portEdit", params: { id: row.id } });
};
const handleDelete = (row: any) => {
  chatPortListDelete({ id: row.id }).then((res) => {
    if (!res) return;
    const _list = tableData.value.filter((item: any) => item.id !== row.id);
    tableData.value = _list;
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
  chatPortList({
    page: curPage.value,
    pageSize,
    key: searchKey.value,
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
    <el-table-column label="端口号" prop="port" />
    <el-table-column label="路由" prop="route" />
    <el-table-column label="最大连接数" prop="limit" />
    <el-table-column label="剩余连接数" prop="limitRest" />
    <el-table-column label="备注" prop="info" />
    <el-table-column label="状态" #default="scope" width="100px">
      {{ scope.row.status === 1 ? "正常" : "未部署" }}
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
