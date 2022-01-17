<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from "naive-ui"
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    </n-config-provider>
</template>

<style>
/*  */
</style>
