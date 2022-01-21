<template>
    <div class="bar">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="(l, i) in loca" :key="i">
                {{ l }}
            </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui"
import { computed } from "vue"
const store = useStore()
const loca = computed(() => {
    return store.location
})
</script>

<style scoped>
.bar {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 40px;
}
</style>
