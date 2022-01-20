<template>
    <div style="height: 100vh; position: relative">
        <n-layout has-sider position="absolute">
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                show-trigger="arrow-circle"
            >
                <side-bar />
            </n-layout-sider>
            <n-layout>
                <div style="height: 100%; position: relative">
                    <n-layout-header position="absolute" style="top: 0">
                        <nav-bar />
                    </n-layout-header>

                    <n-layout-content
                        position="absolute"
                        style="top: 50px"
                        :native-scrollbar="false"
                    >
                        <router-view />
                    </n-layout-content>
                </div>
            </n-layout>
        </n-layout>
    </div>
</template>

<script lang="ts" setup>
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from "naive-ui"
import { onMounted } from "vue"
import NavBar from "../components/NavBar.vue"
import SideBar from "../components/SideBar.vue"
// import ajax from "../utils/ajax"

onMounted(async () => {
    //
})
</script>

<style scoped></style>
