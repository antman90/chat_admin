<script setup lang="ts">
import Ws from "../ts/ws";
import { useWsStore } from "../store/wsStore";
import { useUserStore } from "../store/user";
import { wsName as wsNameCookie } from "../ts/cookie";
import { useHomeStore } from "../store/home";
import { useUserOnlineStore } from "../store/user-online";

const userStore = useUserStore();
const wsName = computed(() => userStore.wsName);
const wsStore = useWsStore();
const homeStore = useHomeStore();
const userOnlineStore = useUserOnlineStore();
const props = defineProps({
  room: {
    type: String,
    default: "",
  },
  wsRoute: {
    type: String,
    defalut: "",
  },
});

let wsInstance: any;

watch([wsName, () => props.room, () => props.wsRoute], () => {
  connectWs();
});

const disconnectWs = () => {
  if (wsInstance && wsInstance.close) {
    wsInstance.close();
  }
  wsInstance = null;
  wsStore.updateWs(wsInstance);
};

const disConnCallBack = () => {
  wsStore.updateWs(null);
};

const connectWs = () => {
  disconnectWs();
  if (wsName.value && props.room && props.wsRoute) {
    console.log(props.room, props.wsRoute);
    wsInstance = new Ws(
      props.room,
      props.wsRoute,
      wsMessageDispath,
      disConnCallBack
    );
    wsStore.updateWs(wsInstance);
  }
};

const wsMessageDispath = (data: { type: string; data: any }) => {
  switch (data.type) {
    case "opening":
      wsOpeningFn(data.data);
      break;
    case "getUserList":
      updateUserList(data.data);
      break;
  }
};

const updateUserList = (data: any) => {
  userOnlineStore.updateList(data);
};

const wsOpeningFn = (data: any) => {
  userOnlineStore.updateList(data);
};

const restoreWsName = () => {
  const wsName = wsNameCookie.get();
  if (wsName) {
    userStore.updateWsName(wsName);
  }
};

onMounted(() => {
  restoreWsName();
  connectWs();
});

onUnmounted(() => {
  disconnectWs();
});
</script>

<template></template>
