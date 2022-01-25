<template>
    <n-data-table :columns="columns" :data="data" />
    <n-modal v-model:show="showModal">
        <popup-dialog :images="images" />
    </n-modal>
</template>

<script lang="tsx" setup>
import type { Qualification } from "@/api/qualification"
import { getAllWaiting } from "@/api/qualification"
import { NModal, NTime } from "naive-ui"
import { onMounted, ref } from "vue"
import PopupDialog from "./PopupDialog.vue"

const showModal = ref(false)
const images = ref([""])
const data = ref([])
const columns = [
    { title: "店铺名", key: "enterpriseName" },
    { title: "类型", key: "enterpriseType" },
    { title: "申请时间", key: "", render: renderTime },
    {
        title: "操作",
        key: "",
        render: (e: Qualification) => (
            <n-button onClick={() => onClick(e)}>审核</n-button>
        ),
    },
]

onMounted(async () => {
    const req = await getAllWaiting()
    const resp = req.data
    data.value = resp.data
})

function renderTime(row: Qualification) {
    return <NTime time={new Date(row.createdAt)} type="relative" />
}

function onClick(e: Qualification) {
    console.log("%c [e]:", "color:white;background:blue;font-size:13px", e)
    const newImages = [
        e.image0,
        e.image1,
        e.image2,
        e.image3,
        e.image4,
        e.image5,
    ].filter((item) => item)

    images.value = newImages as string[]
    showModal.value = !showModal.value
}
</script>

<style scoped></style>
