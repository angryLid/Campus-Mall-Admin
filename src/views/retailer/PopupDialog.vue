<template>
    <n-card
        style="width: 600px"
        title="操作"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
        <div>
            <span v-for="(item, i) in images" :key="i">
                <n-image width="100" :src="`${host}${item}`" alt="营业执照" />
            </span>
        </div>
        <div>
            <n-input
                v-model:value="value"
                type="textarea"
                placeholder="基本的 Textarea"
            />
        </div>
        <div>
            <n-button type="success"> 通过 </n-button>
            <n-button type="error"> 驳回 </n-button>
        </div>
    </n-card>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { NCard } from "naive-ui"
import { onMounted, ref } from "vue"

const props = defineProps<{
    images: string[]
}>()
const value = ref("")
const store = useStore()
const host = store.imageHostURL
onMounted(() => {
    console.log("%c [MOUNTerwoh]:", "color:white;background:red;font-size:13px")
})
</script>

<style scoped></style>
