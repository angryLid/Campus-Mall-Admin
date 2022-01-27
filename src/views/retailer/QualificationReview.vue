<template>
    <n-data-table :columns="columns" :data="data" />
    <n-modal v-model:show="showModal">
        <popup-dialog
            :images="images"
            :qualification="qualification"
            @approved="onApproved"
            @rejected="onRejected"
        />
    </n-modal>
</template>

<script lang="tsx" setup>
import type { Qualification } from "@/api/qualification"
import { getAllWaiting } from "@/api/qualification"
import { NModal, NTime } from "naive-ui"
import type { Ref } from "vue"
import { onMounted, ref } from "vue"
import PopupDialog from "./PopupDialog.vue"

const qualification: Ref<Qualification | undefined> = ref()
const showModal = ref(false)
const images = ref([""])
const data: Ref<Qualification[]> = ref([])
const columns = [
    { title: "店铺名", key: "enterpriseName" },
    { title: "类型", key: "enterpriseType" },
    { title: "申请时间", key: "", render: renderTime },
    {
        title: "操作",
        key: "",
        render: render,
    },
]

onMounted(async () => {
    const req = await getAllWaiting()
    const resp = req.data
    data.value = resp.data
})

function render(e: Qualification) {
    if (e.done === true) {
        return (
            <n-button type="success" disabled>
                已通过
            </n-button>
        )
    } else if (e.done === false) {
        return (
            <n-button type="error" disabled>
                已驳回
            </n-button>
        )
    }
    return <n-button onClick={() => onClick(e)}>审核</n-button>
}
function renderTime(row: Qualification) {
    return <NTime time={new Date(row.createdAt)} type="relative" />
}

function onClick(e: Qualification) {
    const newImages = [
        e.image0,
        e.image1,
        e.image2,
        e.image3,
        e.image4,
        e.image5,
    ].filter((item) => item)
    qualification.value = e
    images.value = newImages as string[]
    showModal.value = !showModal.value
}

function onApproved(id: number) {
    showModal.value = !showModal.value
    data.value.forEach((ele) => {
        if (ele.id === id) {
            ele.done = true
        }
    })
}

function onRejected(id: number) {
    showModal.value = !showModal.value
    data.value.forEach((ele) => {
        if (ele.id === id) {
            ele.done = false
        }
    })
}
</script>

<style scoped></style>
