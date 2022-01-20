<script lang="tsx" setup>
import { NDataTable, NInputGroup, NTime } from "naive-ui"
import { onMounted, reactive, ref } from "vue"
import ajax from "../utils/ajax"

interface User {
    id: number
    createdAt: string
    authStatus: number
}
const data = ref([])
const columns = createColumns()
const pagination = reactive({
    pageSize: 10,
})
onMounted(async () => {
    const req = await ajax.get("/admin/user")
    const resp = await req.data
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
function render(row: User) {
    if (row.authStatus === 0) {
        return (
            <n-button size="small" type="error" onClick={() => onBtnClick(row)}>
                禁用
            </n-button>
        )
    } else if (row.authStatus === 1) {
        return (
            <n-button
                size="small"
                type="success"
                onClick={() => onBtnClick(row)}
            >
                启用
            </n-button>
        )
    }
}
function renderTime(row: User) {
    return <NTime time={new Date(row.createdAt)} type="relative" />
}
async function onBtnClick(row: User) {
    console.log("%c [row]:", "color:white;background:blue;font-size:13px", row)
    const req = await ajax.put(
        `/admin/user/${row.id}/?authStatus=${(row.authStatus + 1) % 2}`
    )
    const resp = await req.data

    if (resp.code === 200) {
        row.authStatus += 1
        row.authStatus %= 2
    }
}

async function onClick() {
    const req = await ajax.get(`/admin/user/${search.value}/`)
    const resp = await req.data
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
}
const search = ref("")
</script>

<template>
    <div class="wrapper">
        <n-form>
            <n-input-group :style="{ width: '100%' }">
                <n-input @keydown.enter="onClick" v-model="search" />
                <n-button type="primary" ghost>搜索</n-button>
            </n-input-group>
        </n-form>

        <n-data-table
            :columns="columns"
            :data="data"
            :max-height="600"
            :pagination="pagination"
        />
    </div>
</template>

<style scoped>
.wrapper {
    padding: 20px;
}
</style>
