<script setup lang="ts">
import { NCollapse, NCollapseItem } from "naive-ui"
const sideBar = {
    userPart: {
        title: "用户管理",
        item0: "学生用户审核",
    },
}
</script>

<template>
    <n-collapse>
        <n-collapse-item :title="sideBar.userPart.title" name="1">
            <div>{{ sideBar.userPart.item0 }}</div>
        </n-collapse-item>
        <n-collapse-item title="白银" name="2">
            <div>很好</div>
        </n-collapse-item>
        <n-collapse-item title="黄金" name="3">
            <div>真棒</div>
        </n-collapse-item>
    </n-collapse>
</template>

<style scoped></style>
