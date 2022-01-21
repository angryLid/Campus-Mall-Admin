<template>
    <div style="height: 100vh; position: relative">
        <n-layout has-sider position="absolute">
            <side-bar />

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
                        <div class="wrapper">
                            <router-view />
                        </div>
                    </n-layout-content>
                </div>
            </n-layout>
        </n-layout>
    </div>
</template>

<script lang="ts" setup>
import { NLayout, NLayoutContent, NLayoutHeader } from "naive-ui"
import { onMounted } from "vue"
import NavBar from "../components/NavBar.vue"
import SideBar from "../components/SideBar.vue"
// import ajax from "../utils/ajax"

onMounted(async () => {
    //
})
</script>

<style scoped>
.wrapper {
    padding: 20px;
}
</style>
