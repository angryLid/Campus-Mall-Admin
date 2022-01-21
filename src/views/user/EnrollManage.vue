<template>
    <n-upload
        :max="1"
        @before-upload="beforeUpload"
        :default-upload="false"
        @change="handleChange"
    >
        <n-button v-if="fileListLengthRef > 0" disabled>文件已选择</n-button>
        <n-button v-else>上传文件</n-button>
    </n-upload>

    <n-button>处理</n-button>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import type { UploadFileInfo } from "naive-ui"
import { NUpload } from "naive-ui"
import { onMounted, ref } from "vue"
const store = useStore()

const uploadRef = ref(null)
const fileListLengthRef = ref(0)
onMounted(() => {
    store.location = ["用户管理", "新生入学注册"]
})

interface BUArguments {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
}
async function beforeUpload({ file, fileList }: BUArguments) {
    if (
        file &&
        file.file &&
        file.file.type === "application/vnd.ms-excel" &&
        (file.file.name.endsWith("csv") || file.file.name.endsWith("CSV"))
    ) {
        const fr = new FileReader()
        fr.readAsText(file.file)
        fr.onload = function () {
            console.log(fr.result)
        }
        console.log(
            "%c [file]:",
            "color:white;background:blue;font-size:13px",
            file
        )
    } else {
        return false
    }
}
function handleChange({ file, fileList }: BUArguments) {
    fileListLengthRef.value = fileList.length
}
</script>

<style scoped></style>
