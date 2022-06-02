<script setup lang="ts">
const props = defineProps({
    status: {
        type: Number,
        default: 1,
    }
})

const emits = defineEmits<{
    (e: 'toggle', status: number): void
}>()

const statusActive = ref(1)
const statusToggleFn = () => {
    const newStatus = statusActive.value ? 0 : 1
    statusActive.value = newStatus
    emits('toggle', newStatus)
}

const setStatus = (status: number) => {
    statusActive.value = status
}

onMounted(() => {
    setStatus(props.status)
})

watch(() => props.status, (newVal) => {
    setStatus(newVal)
})

</script>

<template>
    <div class="m-status-wrap " :class="{ 'checked': statusActive }" @click="statusToggleFn">
        <div class="m-status-btn" data-v-622a4ede=""></div>
    </div>
</template>

<style scoped lang="scss">
.m-status-wrap {
    margin: 10px 0 10px 5px;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;

    .m-status-btn {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 100%;
        transition: all 0.3s;
        width: 16px;
        height: 16px;
        background-color: #fff;
    }

    &.checked {
        border-color: #279cff;
        background-color: #279cff;

        .m-status-btn[data-v-622a4ede] {
            left: 100%;
            margin-left: -17px;
        }
    }
}
</style>