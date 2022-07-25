<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import pageTitleVue from "../components/pageTitle.vue";
import { roomTipModify } from "../ts/ws.send";
import RichText from "../components/RichText.vue";
import {
  chatRoomCreate,
  chatRoomDetail,
  allPortGet,
  chatRoomNameList,
  chatSiteAllName,
} from "../ts/api";
import WsComp from "../components/ws.vue";
import { useWsStore } from "../store/wsStore";

const wsStore = useWsStore();
const ws: any = computed(() => wsStore.ws);
const tipConfigSend = () => {
  const { name: room, tip, tipTime: tip_time, isTip: is_tip } = form.value;
  roomTipModify(ws.value, {
    room,
    tip,
    tip_time,
    is_tip,
  });
};

const route = useRoute();
const router = useRouter();
const { roomId } = route.params;

const form: any = ref({
  name: "",
  owner: "",
  limit: 0,
  password: "",
  isPassword: 0,
  tip: "",
  tipTime: 0,
  isTip: 0,
  showRoom: [],
  chatSite: "",
  route: "",
  isGuestView: 0,
  isGuestChat: 0,
});

const allRoomArr: any = ref([]);
const allSiteArr: any = ref([]);

const allRoomArrFn = () => {
  chatRoomNameList({ route: form.value.route }).then((res) => {
    if (!res) return;
    allRoomArr.value = res;
  });
};

const allSiteFn = () => {
  chatSiteAllName().then((res) => {
    if (!res) return;
    allSiteArr.value = res;
  });
};

const allPort: any = ref([]);

const allPortGetFn = () => {
  allPortGet().then((res) => {
    if (!res) return;
    allPort.value = res;
  });
};

const getContentFn = (html: string) => {
  form.value.tip = html;
};

const fetchSiteInfo = (id: number) => {
  chatRoomDetail({ id }).then((res) => {
    if (!res) return;
    let { password, passwordTxt, showRoom, ...rest } = res;
    showRoom = showRoom.split(",");
    password = passwordTxt;
    form.value = { password, showRoom, ...rest };
    allRoomArrFn();
  });
};

const onSubmit = () => {
  tipConfigSend();
  let { name, showRoom, ...rest } = form.value;
  // filter room of deleted
  const allRoom = allRoomArr.value.map((item: any) => item.name);
  showRoom = showRoom.filter((item: string) => allRoom.includes(item));
  console.log(showRoom);
  showRoom.push(name);
  showRoom = Array.from(new Set(showRoom));
  showRoom = showRoom.join(",");
  chatRoomCreate({ name, showRoom, ...rest }).then((res) => {
    if (!res) return;
    backToList();
  });
};

const backToList = () => {
  router.back();
};

onMounted(() => {
  allSiteFn();
  allPortGetFn();
  if (roomId) {
    fetchSiteInfo(Number(roomId));
  }
});
</script>

<template>
  <WsComp :room="form.hash" :wsRoute="form.route" />
  <pageTitleVue title="房间创建/编辑" />
  <el-form :model="form" label-width="120px">
    <el-form-item label="房间名">
      <el-input v-model="form.name" :disabled="!!roomId" />
    </el-form-item>
    <el-form-item label="房主">
      <el-input v-model="form.owner" :disabled="!!roomId" />
    </el-form-item>
    <el-form-item label="网站名">
      <el-select v-model="form.chatSite" placeholder="Select Site">
        <el-option
          v-for="(item, index) in allSiteArr"
          :value="item.name"
          :key="index"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="人数上限">
      <el-input v-model="form.limit" type="number" min="0" />
    </el-form-item>
    <el-form-item label="问候语">
      <el-input v-model="form.greeting" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="验证密码">
      <el-switch
        v-model="form.isPassword"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>

    <el-form-item label="允许游客浏览">
      <el-switch
        v-model="form.isGuestView"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>
    <el-form-item label="允许游客聊天">
      <el-switch
        v-model="form.isGuestChat"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>

    <el-form-item label="显示聊天框公告">
      <el-switch v-model="form.isTip" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="聊天框公告">
      <RichText @get-content="getContentFn" :content="form.tip" />
    </el-form-item>
    <el-form-item label="公告间隔时间">
      <el-radio-group v-model="form.tipTime">
        <el-radio :label="10">10秒(测试用)</el-radio>>
        <el-radio :label="30 * 60">30分</el-radio>
        <el-radio :label="60 * 60">1小时</el-radio>
        <el-radio :label="2 * 60 * 60">2小时</el-radio>
        <el-radio :label="4 * 60 * 60">4小时</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="聊天内容选择" v-if="roomId">
      <el-checkbox-group v-model="form.showRoom">
        <el-checkbox
          v-for="(item, index) in allRoomArr"
          :key="index"
          :label="item.name"
          name="showRoom"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="连接路由">
      <el-select
        v-model="form.route"
        :disabled="!!roomId"
        placeholder="Select Route"
      >
        <el-option
          v-for="(item, index) in allPort"
          :value="item.port"
          :key="index"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="backToList">取消</el-button>
    </el-form-item>
  </el-form>
</template>
