<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from "naive-ui"
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <router-view> </router-view>
    </n-config-provider>
</template>

<style>
/*  */
</style>
