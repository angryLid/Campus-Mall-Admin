<script lang="tsx" setup>
import { NDataTable } from "naive-ui"
import { onMounted, ref } from "vue"
import ajax from "../utils/ajax"

const data = ref([])
const columns = createColumns()

onMounted(async () => {
    const req = await ajax.get("/user/student")
    const resp = await req.data

    data.value = resp.data
})
function createColumns() {
    return [
        { title: "姓名", key: "sname" },
        { title: "学号", key: "stuid" },
        { title: "电话号码", key: "telephone" },
        { title: "用户名", key: "uname" },
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
}
</script>

<template>
    <n-data-table :columns="columns" :data="data"> </n-data-table>
</template>

<style scoped></style>
