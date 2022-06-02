<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import pageTitleVue from "../components/pageTitle.vue";
import { chatPortCreate, chatPortDetail } from "../ts/api";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const form: any = ref({
  port: 0,
  route: "",
  limit: 0,
  limitRest: -1,
  info: "",
  status: 0,
});

const fetchSiteInfo = (id: number) => {
  chatPortDetail({ id }).then((res) => {
    if (!res) return;
    form.value = res;
  });
};

const onSubmit = () => {
  console.log(form.value);
  chatPortCreate(form.value).then((res) => {
    if (!res) return;
    backToList();
  });
};

const backToList = () => {
  router.push({ name: "portList" });
};

onMounted(() => {
  if (id) {
    fetchSiteInfo(Number(id));
  }
});
</script>

<template>
  <pageTitleVue title="连接创建/编辑" />
  <el-form :model="form" label-width="120px">
    <el-form-item label="端口号" type="number" min="0">
      <el-input v-model="form.port" />
    </el-form-item>
    <el-form-item label="路由">
      <el-input v-model="form.route" />
    </el-form-item>
    <el-form-item label="最大连接数">
      <el-input :disabled="!!id" type="number" min="0" v-model="form.limit" />
    </el-form-item>
    <el-form-item label="剩余连接数" v-if="!!id">
      <el-input
        :disabled="!!id"
        type="number"
        min="0"
        v-model="form.limitRest"
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.info" type="textarea" />
    </el-form-item>
    <el-form-item label="是否部署">
      <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="backToList">取消</el-button>
    </el-form-item>
  </el-form>
</template>
