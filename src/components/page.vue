<script setup lang="ts">
import { pageInterface } from "../interface";
import { pageSize } from "../ts/config";
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  curPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: pageSize,
  },
  pageShowNum: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits<{
  (e: "gotoPage", page: number): void;
}>();

const page: pageInterface = reactive({
  pageNum: 0,
  pageArr: [],
  showFirst: false,
  showLast: false,
  showPrev: false,
  showNext: false,
});

const updatePageStatus = () => {
  page.pageNum = Math.ceil(props.total / props.pageSize);
  const midNum = Math.floor(props.pageShowNum / 2);

  let firstNum = props.curPage - midNum;
  let lastNum = firstNum + props.pageShowNum - 1;

  if (firstNum < 1) {
    firstNum = 1;
    lastNum = props.pageShowNum;
  }

  if (lastNum > page.pageNum) {
    lastNum = page.pageNum;
    firstNum = lastNum - props.pageShowNum + 1;
  }

  if (page.pageNum <= props.pageShowNum) {
    firstNum = 1;
    lastNum = page.pageNum;
  }

  let pageArr = [];
  for (let i = firstNum; i <= lastNum; i++) {
    pageArr.push(i);
  }

  page.pageArr = pageArr;

  if (page.pageNum > props.pageShowNum) {
    const isNotLast = props.curPage < page.pageNum;
    page.showLast = isNotLast;
    page.showNext = isNotLast;
    const isNotFirst = props.curPage > 1;
    page.showFirst = isNotFirst;
    page.showPrev = isNotFirst;
  }
};

const goPageFn = (page: number) => {
  emit("gotoPage", page);
};

// const gotoFisrtFn = () => {
//   goPageFn(1);
// };

// const gotoLastFn = () => {
//   goPageFn(page.pageNum);
// };

const gotoPrevFn = () => {
  goPageFn(props.curPage - 1);
};

const gotoNextFn = () => {
  goPageFn(props.curPage + 1);
};

watch(
  [() => props.curPage, () => props.total],
  () => {
    updatePageStatus();
  },
  { immediate: true }
);
</script>

<template>
  <ul class="pagenavi" v-if="page.pageNum > 1">
    <li v-show="page.showPrev" @click="gotoPrevFn">
      <a href="javascript:;">Prev</a>
    </li>
    <li @click="goPageFn(item)" v-for="item in page.pageArr" :key="item">
      <a href="javascript:;" :class="{ active: item === props.curPage }">{{
        item
      }}</a>
    </li>
    <li v-show="page.showNext" @click="gotoNextFn">
      <a href="javascript:;">Next</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.sports_fy {
  .active {
    color: rgb(237, 153, 33);
  }
}
</style>
