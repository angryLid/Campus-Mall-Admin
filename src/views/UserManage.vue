<script lang="tsx" setup>
import { NDataTable, NTime } from "naive-ui"
import { onMounted, ref } from "vue"
import ajax from "../utils/ajax"

interface User {
    createdAt: string
}
const data = ref([])
const columns = createColumns()

onMounted(async () => {
    const req = await ajax.get("/admin/user")
    const resp = await req.data

    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
    data.value = resp.data
})
function createColumns() {
    return [
        { title: "电话号码", key: "telephone" },
        { title: "昵称", key: "nickname" },
        { title: "加入时间", key: "createdAt", render: renderTime },
        { title: "类型", key: "roleType" },
        { title: "状态", key: "authStatus" },
        { title: "操作", key: "actions", render: render },
        // {title:"",key:""},
    ]
}
function render(row: unknown) {
    return (
        <n-button size="small" onClick={() => onBtnClick(row)}>
            批准
        </n-button>
    )
}
function renderTime(row: User) {
    return <NTime time={new Date(row.createdAt)} type="relative" />
}
async function onBtnClick(row: unknown) {
    const req = await ajax.put("/user/student/", row)
    const resp = await req.data
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
}
</script>

<template>
    <n-data-table :columns="columns" :data="data" />
</template>

<style scoped></style>
