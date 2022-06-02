<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    default: 2000,
  },
});

const className = ref("mf-layer-in");

const removeLayer = () => {
  const layerWrapDom = document.body.querySelector(".__MF_LAYER__");
  if (layerWrapDom) {
    document.body.removeChild(layerWrapDom);
  }
};

setTimeout(() => {
  className.value = "mf-layer-out";
  setTimeout(() => {
    removeLayer();
  }, 300);
}, props.interval);
</script>

<template>
  <div class="mf-layer-hint" :class="className">{{ msg }}</div>
</template>

<style scoped lang="scss">
.mf-layer-hint {
  z-index: 910250000000;
  position: fixed;
  left: 50%;
  bottom: 30%;
  height: 30px;
  padding: 0 10px;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}
.mf-layer-in {
  animation: mf-layer-in 0.2s ease-in-out;
}
.mf-layer-out {
  animation: mf-layer-out 0.2s linear forwards;
}
@-webkit-keyframes mf-layer-in {
  from {
    bottom: 10%;
  }
  to {
    bottom: 30%;
  }
}
@keyframes mf-layer-in {
  from {
    bottom: 10%;
  }
  to {
    bottom: 30%;
  }
}
@-webkit-keyframes mf-layer-out {
  from {
    opacity: 1;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(-50%, 100%);
    transform: translate(-50%, 100%);
  }
}
@keyframes mf-layer-out {
  from {
    opacity: 1;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(-50%, 100%);
    transform: translate(-50%, 100%);
  }
}
</style>
