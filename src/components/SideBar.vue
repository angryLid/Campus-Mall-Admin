<script setup lang="tsx">
import { BagHandle, BarChart, Person, Pricetag } from "@vicons/ionicons5"
import { NMenu } from "naive-ui"
import { ref } from "vue"

const activeKey = ref("user")

const menuOptions = [
    {
        label: "用户管理",
        key: "user",
        icon: () => (
            <n-icon>
                <Person />
            </n-icon>
        ),
        children: [
            {
                label: "启用/停用用户",
                key: "on-off-user",
            },
        ],
    },
    {
        label: "商品管理",
        key: "product",
        icon: () => (
            <n-icon>
                <Pricetag />
            </n-icon>
        ),
    },
    {
        label: "卖家管理",
        key: "retailer",
        icon: () => (
            <n-icon>
                <BagHandle />
            </n-icon>
        ),
    },
    {
        label: "统计信息",
        key: "statis",
        icon: () => (
            <n-icon>
                <BarChart />
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
