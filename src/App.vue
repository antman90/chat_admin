<script setup lang="ts">
import Layout from "./components/layout.vue";
import { useRoute } from "vue-router";

const route: any = useRoute();

const key = computed(() => {
  return route.name !== undefined
    ? route.name + +new Date()
    : route + +new Date();
});
</script>

<template>
  <Layout>
    <router-view :key="key" />
  </Layout>
</template>

<style lang="scss"></style>
