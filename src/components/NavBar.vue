<template>
    <div class="bar">
        <n-breadcrumb>
            <n-breadcrumb-item href="#"> 北京总行 </n-breadcrumb-item>
            <n-breadcrumb-item href="#"> 天津分行 </n-breadcrumb-item>
            <n-breadcrumb-item href="#"> 平山道支行 </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui"
</script>

<style scoped>
.bar {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 40px;
}
</style>
