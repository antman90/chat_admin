<script setup lang="ts">
import { useRoute } from "vue-router";
import SliderBar from "./sliderBar.vue";
import TopBarVue from "./TopBar.vue";

const route = useRoute();
const routeName = computed(() => route.name);
const isShow = ref(false);

watch(routeName, (val) => {
  if (val) {
    isShow.value = true;
  }
});
</script>

<template>
  <div v-if="isShow">
    <div v-if="routeName === 'login'">
      <slot></slot>
    </div>
    <div v-else class="m-layout">
      <SliderBar />
      <div class="container">
        <TopBarVue />
        <div class="contents">
          <div class="cont">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
