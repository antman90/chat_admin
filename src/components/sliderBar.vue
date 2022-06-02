<script setup lang="ts">
import { formatDate } from "../ts/util";
import { useRouter } from "vue-router";
import { logout } from "../ts/api";
import { adminToken, wsName } from "../ts/cookie";
import { useUserStore } from "../store/user";

const router = useRouter();
const routes: any = router.options.routes;

const filterRoute = (arr: any) => {
  return arr.filter((item: any) => {
    if (item.children) {
      item.children = filterRoute(item.children);
    }
    return !item.meta.notMenu;
  });
};

let renderRoutes = filterRoute(routes);

renderRoutes = renderRoutes.map((item: any) => {
  item.isActive = false;
  return item;
});

const sliderBarRoutes = ref(renderRoutes);

const toogleNavFn = (index: number, item: any) => {
  if (!item.children) {
    router.push({ name: item.name });
    return;
  }

  let _routes = sliderBarRoutes.value.slice(0);
  if (_routes[index]["isActive"]) {
    _routes[index]["isActive"] = false;
  } else {
    _routes = _routes.map((item: any) => {
      item.isActive = false;
      return item;
    });
    _routes[index]["isActive"] = true;
  }
  sliderBarRoutes.value = _routes;
};

const curTime = ref("");

const getCurTime = () => {
  curTime.value = formatDate(+new Date(), "H:i");
};

let timer: any = null;

onMounted(() => {
  getCurTime();
  timer = setInterval(() => {
    getCurTime();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="side">
    <h1>
      <router-link to="/">
        <img src="/src/assets/img/logo.png" alt="" />
      </router-link>
    </h1>
    <h2>
      <router-link to="/">
        <img
          class="m-slider-home-icon"
          src="/src/assets/img/icon/home.svg"
          alt=""
        /><span>메인현황</span>
      </router-link>
    </h2>

    <ul class="m-slider-list">
      <li
        class="m-slider-list-item"
        v-for="(item, index) in sliderBarRoutes"
        :key="index"
      >
        <h3 class="m-slider-list-title" @click="toogleNavFn(index, item)">
          <span>{{ item.meta.name }}</span>
          <div class="m-slider-title-img"></div>
        </h3>
        <ul
          v-if="item.children"
          class="m-slider-list-sub-list"
          :class="{
            show: item.isActive,
            'm-slider-list-sub-list-bg': item.meta.data,
          }"
        >
          <li
            class="m-slider-list-sub-list-item"
            v-for="subItem in item.children"
            :class="{ 'm-slider-list-sub-item-menu': !item.meta.data }"
          >
            <template v-if="!subItem.path">
              <h4 class="m-slider-sub-title">
                <span>{{ subItem.meta.name }}</span>
              </h4>
              <div class="m-slider-number" v-if="subItem.data !== undefined">
                <span class="m-slider-number-em">{{ subItem.data }}</span>
                명
              </div>
              <div class="m-slider-icon" v-else></div>
            </template>

            <router-link
              v-else
              :to="{
                name: subItem.name,
              }"
            >
              <div class="m-slider-link">
                <h4 class="m-slider-sub-title">
                  {{ subItem.meta.name }}
                </h4>
                <div class="m-slider-number" v-if="subItem.data !== undefined">
                  <span class="m-slider-number-em">{{ subItem.data }}</span>
                  명
                </div>
                <div class="m-slider-icon" v-else></div>
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>

    <div class="timer">
      <div class="week">수요일</div>
      <div class="time">{{ curTime }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.m-slier-bar {
  width: 300px;
  height: 100vh;
  overflow: auto;
  background-color: gray;
}

.m-slider-home-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.m-slider-list-item {
  color: #fff;
  font-family: "nanumgothic_bold";
  font-weight: bold;
  box-sizing: border-box;
}

.m-slider-list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  font-size: 13px;
  box-sizing: border-box;
  cursor: pointer;
}

.m-slider-list-sub-list {
  padding: 0 10px;
  overflow: hidden;
  max-height: 0;
  transition: 0.2s;

  &.show {
    max-height: 300px;
    transition: 0.5s;
  }
}

.m-slider-list-sub-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  height: 22px;
  padding-bottom: 5px;
}

.m-slider-list-sub-list-bg {
  background-color: #232e53;
}

.m-slider-number {
  border-bottom: 1px solid #00ceff;
  padding: 2px;
}

.m-slider-number-em {
  color: #00ceff;
}

.m-slider-icon {
  background-image: url("@/assets/img/star.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: right center;
  width: 15px;
  height: 15px;
}

.m-slider-title-icon {
  margin-right: 3px;
}

.m-slider-list-sub-item-menu {
  position: relative;
  padding-left: 5px;
  transition: 0.5s;

  a {
    display: block;
    width: 100%;
  }
}

.m-slider-list-sub-item-menu:hover {
  transition: 0.5s;
  transform: translateX(10px);

  &:after {
    content: "";
    position: absolute;
    left: -5px;
    top: 50%;
    margin-top: -6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
  }
}

.m-slider-title-img {
  width: 15px;
  height: 15px;
  background-image: url("@/assets/img/Sound-wave.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: right center;
}

.m-slider-sub-title {
  color: #fff;
}

.m-slider-link {
  display: flex;
  justify-content: space-between;
}
</style>
