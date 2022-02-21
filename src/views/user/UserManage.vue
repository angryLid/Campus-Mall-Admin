<script lang="tsx" setup>
import { getUser, getUsers, putUser, User } from "@/api/user"
import { useStore } from "@/store"
import {
    NDataTable,
    NInputGroup,
    NTime,
    NTag,
    NSpace,
    useMessage,
} from "naive-ui"
import { onMounted, reactive, ref } from "vue"

const store = useStore()
const message = useMessage()

const search = ref("")
const users = ref<User[]>([])
const columns = createColumns()
const pagination = reactive({
    pageSize: 50,
})

onMounted(async () => {
    store.location = ["用户管理", "启用或停用用户"]
    await init()
})
function createColumns() {
    return [
        { title: "电话号码", key: "telephone" },
        { title: "昵称", key: "nickname" },
        { title: "加入时间", key: "createdAt", render: renderTime },
        { title: "类型", key: "role", render: renderRole },
        { title: "操作", key: "actions", render: renderOptions },
    ]
}
function renderOptions(row: User) {
    if (row.authStatus === 0) {
        return (
            <n-button size="small" type="error" onClick={() => onSetUser(row)}>
                禁用
            </n-button>
        )
    } else if (row.authStatus === 1) {
        return (
            <n-button
                size="small"
                type="success"
                onClick={() => onSetUser(row)}
            >
                启用
            </n-button>
        )
    }
}
function renderTime(row: User) {
    return <NTime time={new Date(row.createdAt)} type="relative" />
}
function renderRole(row: User) {
    if (row.merchantId !== null && row.studentId !== null) {
        return (
            <NSpace>
                <NTag type="info">商户</NTag>
                <NTag type="warning">学生</NTag>
            </NSpace>
        )
    } else if (row.merchantId !== null) {
        return <NTag type="info">商户</NTag>
    } else if (row.studentId !== null) {
        return <NTag type="warning">学生</NTag>
    } else {
        return <NTag>未认证</NTag>
    }
}
async function onSetUser(row: User) {
    const req = await putUser(row.id, (row.authStatus + 1) % 2)
    const resp = req.data
    if (resp.code === 200) {
        row.authStatus += 1
        row.authStatus %= 2
    }
}

async function onSearch() {
    if (search.value === "" || search.value.trim() === "") {
        return
    }

    const req = await getUser(search.value)
    const resp = req.data
    if (resp.code === 200) {
        users.value = [resp.data]
        return
    }
    message.error(resp.data)
}
async function init() {
    const req = await getUsers()
    const resp = req.data

    if (resp.code === 200) {
        users.value = resp.data
        message.info("加载成功")
    }
}
</script>

<template>
    <n-form>
        <n-input-group :style="{ width: '100%' }">
            <n-input @keydown.enter="onSearch" v-model:value="search" />
            <n-button ghost @click="init">清空</n-button>
            <n-button type="primary" ghost @click="onSearch">搜索</n-button>
        </n-input-group>
    </n-form>

    <n-data-table
        :columns="columns"
        :data="users"
        :max-height="500"
        :pagination="pagination"
    />
</template>

<style scoped></style>
