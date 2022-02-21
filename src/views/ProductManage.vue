<template>
    <n-data-table
        :columns="columns"
        :data="products"
        :max-height="550"
        :pagination="{ pageSize: 50 }"
    />
</template>

<script lang="tsx" setup>
import { getProducts, Product, putProduct } from "@/api/product"
import { useStore } from "@/store"
import { NButton, NTime } from "naive-ui"
import { onMounted, ref } from "vue"
const store = useStore()

const columns = createColumns()
const products = ref([])
onMounted(async () => {
    store.location = ["商品管理"]
    await init()
})

async function init() {
    const req = await getProducts()
    const { data } = req
    products.value = data.data
    console.log(
        "%c [data]:",
        "color:white;background:blue;font-size:13px",
        data
    )
}
function createColumns() {
    return [
        {
            title: "商品名称",
            key: "title",
        },
        {
            title: "描述",
            key: "description",
            render: renderDesc,
        },
        {
            title: "价格",
            key: "price",
        },
        {
            title: "类型",
            key: "type",
            render: renderType,
        },
        {
            title: "发布时间",
            key: "createdAt",
            render: renderTime,
        },
        {
            title: "操作",
            key: "actions",
            render: renderOptions,
        },
    ]
}
function renderDesc(row: Product) {
    if (row.description.length > 20) {
        return row.description.slice(0, 20) + "..."
    } else {
        return row.description
    }
}
function renderOptions(row: Product) {
    const status = row.status === -1 ? 0 : -1
    const f = async () => {
        const req = await putProduct(row.id, status)
        const { data } = req
        console.log(
            "%c [data]:",
            "color:white;background:blue;font-size:13px",
            data
        )
        if (data.code === 200) {
            row.status = status
        }
    }
    if (row.status === -1) {
        return (
            <NButton type="success" onClick={f}>
                撤销违规
            </NButton>
        )
    } else {
        return (
            <NButton type="error" onClick={f}>
                标注违规
            </NButton>
        )
    }
}
function renderType(row: Product) {
    const r = row.pType ? "个人闲置" : "商家发布"
    let s = ""

    if (row.status === 1) {
        s = "在售"
    } else if (row.status === 0) {
        s = "已下架"
    } else if (row.status === -1) {
        s = "违规"
    }
    return `${r}<${s}>`
}
function renderTime(row: Product) {
    return <NTime time={new Date(row.createdAt)}></NTime>
}
</script>

<style scoped></style>
