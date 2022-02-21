<script setup lang="tsx">
import {
    BagHandle,
    BarChart,
    Person,
    Pricetag,
    Business,
} from "@vicons/ionicons5"
import { NLayoutSider, NMenu } from "naive-ui"
import { ref } from "vue"

const activeKey = ref("user")

const menuOptions = [
    {
        label: "用户管理",
        icon: () => (
            <n-icon>
                <Person />
            </n-icon>
        ),
        key: "user-management",
        children: [
            {
                label: () => (
                    <router-link to={{ name: "enroll" }}>
                        新生入学注册
                    </router-link>
                ),
                key: "enrollment",
            },
            {
                label: () => (
                    <router-link to={{ name: "switch" }}>
                        启用或停用用户
                    </router-link>
                ),

                key: "on-off-user",
            },
        ],
    },
    {
        label: () => (
            <router-link to={{ name: "product" }}>商品管理</router-link>
        ),
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
        children: [
            {
                label: () => (
                    <router-link to={{ name: "review" }}>资质审核</router-link>
                ),
                key: "qual",
            },
        ],
    },
    {
        label: () => <router-link to={{ name: "swipe" }}>活动管理</router-link>,
        key: "swipe",
        icon: () => (
            <n-icon>
                <Business />
            </n-icon>
        ),
    },
    {
        label: () => <router-link to={{ name: "info" }}>统计信息</router-link>,
        key: "statics",
        icon: () => (
            <n-icon>
                <BarChart />
            </n-icon>
        ),
    },
]
</script>

<template>
    <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger="arrow-circle"
    >
        <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            :collapsed-width="64"
            :collapsed-icon-size="22"
        />
    </n-layout-sider>
</template>

<style scoped></style>
