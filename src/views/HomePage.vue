<template>
    <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
            <side-bar></side-bar>
        </n-layout-sider>
        <n-layout>
            <n-layout-header><nav-bar></nav-bar></n-layout-header>
            <n-layout-content> <router-view> </router-view> </n-layout-content>
            <n-layout-footer>成府路</n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import {
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
} from "naive-ui"
import { onMounted } from "vue"
import NavBar from "../components/NavBar.vue"
import SideBar from "../components/SideBar.vue"
// import ajax from "../utils/ajax"

onMounted(async () => {
    //
})
</script>

<style scoped></style>
