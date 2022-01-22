<template><h1>施工中...</h1></template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { onMounted } from "vue"

const store = useStore()

onMounted(() => {
    store.location = ["概况"]
})
</script>

<style scoped></style>
