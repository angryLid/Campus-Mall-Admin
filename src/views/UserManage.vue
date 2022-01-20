<script lang="tsx" setup>
import { NDataTable, NLayout } from "naive-ui"
import { onMounted, ref } from "vue"
import ajax from "../utils/ajax"

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
        { title: "操作", key: "actions", render: render },
    ]
}
function render(row: unknown) {
    return (
        <n-button size="small" onClick={() => onBtnClick(row)}>
            批准
        </n-button>
    )
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
