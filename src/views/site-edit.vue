<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import pageTitleVue from "../components/pageTitle.vue";
import RichText from "../components/RichText.vue";
import { chatSiteCreate, chatSiteDetail } from "../ts/api";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const form: any = ref({
  site: "",
  desc: "",
  isAuth: 0,
  isSensitive: 1,
  isLink: 1,
  status: 1,
  sensitiveWord: "",
});

const allSiteArr: any = ref([]);
const getContentFn = (html: string) => {
  form.tip = html;
};

const fetchSiteInfo = (id: number) => {
  chatSiteDetail({ id }).then((res) => {
    if (!res) return;
    form.value = res;
  });
};

const onSubmit = () => {
  chatSiteCreate(form.value).then((res) => {
    if (!res) return;
    backToList();
  });
};

const backToList = () => {
  router.push({ name: "siteList" });
};

onMounted(() => {
  if (id) {
    fetchSiteInfo(Number(id));
  }
});
</script>

<template>
  <pageTitleVue title="站点创建/编辑" />
  <el-form :model="form" label-width="120px">
    <el-form-item label="站点名称">
      <el-input v-model="form.site" />
    </el-form-item>
    <el-form-item label="站点描述">
      <el-input
        v-model="form.desc"
        type="textarea"
        :autosize="{ minRows: 2 }"
      />
    </el-form-item>
    <!-- <el-form-item label="验证Token">
      <el-switch v-model="form.isAuth" :active-value="1" :inactive-value="0" />
    </el-form-item> -->
    <el-form-item label="屏蔽敏感词">
      <el-switch
        v-model="form.isSensitive"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>
    <el-form-item label="屏蔽链接">
      <el-switch v-model="form.isLink" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="敏感词">
      <el-input
        v-model="form.sensitiveWord"
        type="textarea"
        :autosize="{ minRows: 2 }"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="backToList">取消</el-button>
    </el-form-item>
  </el-form>
</template>
