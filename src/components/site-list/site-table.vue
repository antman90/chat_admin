<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import {
  chatSiteLst,
  chatSiteSwitchUpdate,
  chatSiteListDelete,
} from "../../ts/api";
import { pageSize } from "../../ts/config";
import { calcIndexDesc, sliceStr } from "../../ts/util";
import { modifySuccess } from "../../ts/lang";

const router = useRouter();

interface Site {
  id: number;
  isAuth: number;
  sensitiveWord: string;
  isSensitive: number;
  isLink: number;
  status: number;
  site: string;
  [key: string]: any;
}

const handleEdit = (index: number, row: Site) => {
  router.push({ name: "siteEdit", params: { id: row.id } });
};
const handleDelete = (row: Site) => {
  chatSiteListDelete({ id: row.id }).then((res) => {
    if (!res) return;
    const _list = tableData.value.filter((item: Site) => item.id !== row.id);
    tableData.value = _list;
  });
};

const switchFn = (key: string, row: Site) => {
  chatSiteSwitchUpdate({
    id: row.id,
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
  chatSiteLst({
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
    <el-table-column label="名称" prop="site" #default="scope">
      <el-link type="primary">
        <router-link
          :to="{ name: 'roomList', params: { chatSite: scope.row.site } }"
          >{{ scope.row.site }}</router-link
        >
      </el-link>
    </el-table-column>
    <!-- <el-table-column label="验证Token" prop="isAuth" #default="scope">
      <el-switch
        v-model="scope.row.isAuth"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isAuth', scope.row)"
      ></el-switch>
    </el-table-column> -->
    <el-table-column
      label="敏感词"
      prop="sensitiveWord"
      #default="scope"
      width="500px"
    >
      {{ sliceStr(scope.row.sensitiveWord, 35) }}
    </el-table-column>
    <el-table-column label="屏蔽敏感词" #default="scope">
      <el-switch
        v-model="scope.row.isSensitive"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isSensitive', scope.row)"
      ></el-switch>
    </el-table-column>
    <el-table-column label="屏蔽链接" #default="scope">
      <el-switch
        v-model="scope.row.isLink"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('isLink', scope.row)"
      ></el-switch>
    </el-table-column>
    <!-- <el-table-column label="是否开启" prop="isTip" #default="scope">
      <el-switch
        v-model="scope.row.status"
        :active-value="1"
        :inactive-value="0"
        @change="switchFn('status', scope.row)"
      ></el-switch>
    </el-table-column> -->
    <el-table-column label="备注" prop="desc"></el-table-column>
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
