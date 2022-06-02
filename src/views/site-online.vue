<script setup lang="ts">
import pageTitleVue from "../components/pageTitle.vue";
import SiteOnlineTable from "../components/site-online/table.vue";
import { useRoute } from "vue-router";
import { useWsStore } from "../store/wsStore";
import { userListRefreshTime } from "../ts/config";
import { getUserListByRoom } from "../ts/ws.send";
import WsComp from "../components/ws.vue";

const route = useRoute();
const { room, wsRoute } = route.params;

const wsStore = useWsStore();
const ws: any = computed(() => wsStore.ws);

let timer: any = null;

const fetchListByRoom = () => {
  if (ws.value) {
    getUserListByRoom(ws.value, room);
  }
};

onMounted(() => {
  clearInterval(timer);
  timer = setInterval(() => {
    fetchListByRoom();
  }, userListRefreshTime);
});

onUnmounted(() => {
  clearInterval(timer);
  timer = null;
});
</script>

<template>
  <WsComp :room="room.toString()" :wsRoute="wsRoute.toString()" />
  <pageTitleVue title="在线用户" />
  <SiteOnlineTable :room="room.toString()" />
</template>
