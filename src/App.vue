<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from "naive-ui"
import SignIn from "./views/SignIn.vue"
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <sign-in></sign-in>
    </n-config-provider>
</template>

<style>
/*  */
</style>
