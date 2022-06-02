<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="centents-tit m-page-title">
    <h3>{{ props.title }}</h3>
    <div class="m-page-title-slot">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.m-page-title {
  margin-bottom: 25px;
}
.m-page-title-slot {
  flex: 1;
}
</style>
