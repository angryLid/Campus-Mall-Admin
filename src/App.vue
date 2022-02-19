<script setup lang="ts">
import { dateZhCN, NConfigProvider, NMessageProvider, zhCN } from "naive-ui"
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <n-message-provider>
            <router-view> </router-view>
        </n-message-provider>
    </n-config-provider>
</template>

<style>
/*  */
</style>
