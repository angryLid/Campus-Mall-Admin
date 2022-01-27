<template>
    <n-card
        style="width: 600px"
        title="操作"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
        <n-grid :x-gap="12" :y-gap="8" :cols="6">
            <n-gi v-for="(item, i) in images" :key="i">
                <n-image width="100" :src="`${host}${item}`" alt="营业执照" />
            </n-gi>
        </n-grid>

        {{ qualification?.enterpriseName }}
        {{ qualification?.enterpriseType }}
        <div>
            <n-input
                v-model:value="textArea"
                type="textarea"
                placeholder="基本的 Textarea"
            />
        </div>

        <n-grid :x-gap="12" :cols="2">
            <n-gi>
                <n-button type="success" @click="onApprove">通过</n-button>
            </n-gi>
            <n-gi>
                <n-button type="error" @click="onReject">驳回</n-button>
            </n-gi>
        </n-grid>
    </n-card>
</template>

<script lang="ts" setup>
import type { Qualification } from "@/api/qualification"
import { putOne } from "@/api/qualification"
import { useStore } from "@/store"
import { NCard, NGi, NGrid } from "naive-ui"
import { onMounted, ref } from "vue"

const props = defineProps<{
    images: string[]
    qualification: Qualification | undefined
}>()
const emit = defineEmits<{
    (e: "approved", id: number): void
    (e: "rejected", id: number): void
}>()
const textArea = ref("")
const store = useStore()
const host = store.imageHostURL
onMounted(() => {
    console.log("%c [MOUNTerwoh]:", "color:white;background:red;font-size:13px")
})
async function onApprove() {
    const q = props.qualification
    if (q) {
        const req = await putOne(q.id, textArea.value, "approved")
        const resp = req.data
        if (resp.code === 200) {
            emit("approved", q.id)
        }
    }
}
async function onReject() {
    const q = props.qualification
    if (q) {
        const req = await putOne(q.id, textArea.value, "rejected")
        const resp = req.data
        if (resp.code === 200) {
            emit("rejected", q.id)
        }
    }
}
</script>

<style scoped></style>
