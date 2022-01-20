<script setup lang="tsx">
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
} from "@vicons/ionicons5"
import { NMenu } from "naive-ui"
import { ref } from "vue"
const activeKey = ref(null)

const menuOptions = [
    {
        label: "label",
        key: "the",
        icon: () => (
            <n-icon>
                <WineIcon />
            </n-icon>
        ),
    },
    {
        label: "且听风吟",
        key: "hear-the-wind---sing",
        icon: () => (
            <n-icon>
                <PersonIcon />
            </n-icon>
        ),
    },
    {
        label: "且听风吟",
        key: "hear-the-wind--sing",
        icon: () => (
            <n-icon>
                <BookIcon />
            </n-icon>
        ),
    },
    {
        label: "且听风吟",
        key: "hear-the-wind--sing",
        icon: () => (
            <n-icon>
                <BookIcon />
            </n-icon>
        ),
    },
]
</script>

<template>
    <n-menu
        v-model:value="activeKey"
        :options="menuOptions"
        :collapsed-width="64"
        :collapsed-icon-size="22"
    />
</template>

<style scoped></style>
