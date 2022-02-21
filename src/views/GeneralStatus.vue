<template>
    <n-page-header>
        <n-grid :cols="3">
            <n-gi>
                <n-statistic label="总用户数" :value="statics.user + '位'" />
            </n-gi>
            <n-gi>
                <n-statistic label="商品数量" :value="statics.product + '个'" />
            </n-gi>
            <n-gi>
                <n-statistic
                    label="注册商家"
                    :value="statics.merchant + '个'"
                />
            </n-gi>
            <n-gi>
                <n-statistic label="当日订单" :value="statics.order + '笔'" />
            </n-gi>
            <n-gi>
                <n-statistic label="待处理投诉" :value="2360 + '条'" />
            </n-gi>
        </n-grid>

        <template #footer
            >截止到
            <n-time :time="new Date()" />
        </template>
    </n-page-header>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { onMounted, ref } from "vue"
import { NPageHeader, NGi, NGrid, NTime, NStatistic } from "naive-ui"
import { getStatics, Statics } from "@/api/static"

const store = useStore()

const statics = ref<Statics>({
    product: 0,
    user: 0,
    merchant: 0,
    order: 0,
})
onMounted(async () => {
    store.location = ["统计信息"]

    await init()
})

async function init() {
    const req = await getStatics()
    console.log(
        "%c [req.data]:",
        "color:white;background:blue;font-size:13px",
        req.data
    )
    statics.value = req.data.data
}
</script>

<style scoped></style>
