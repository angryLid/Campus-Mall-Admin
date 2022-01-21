<template>
    <n-upload
        :max="1"
        @before-upload="beforeUpload"
        :default-upload="false"
        @change="handleChange"
    >
        <n-button>
            {{ fileListLengthRef > 0 ? "上传完毕" : "上传文件" }}
        </n-button>
    </n-upload>

    <n-data-table
        :columns="columns"
        :data="data"
        :max-height="600"
        :pagination="pagination"
    />

    <n-space>
        <n-button @click="onClick">执行注册</n-button>
    </n-space>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import ajax from "@/utils/ajax"
import type { UploadFileInfo } from "naive-ui"
import { NSpace, NUpload } from "naive-ui"
import * as Papa from "papaparse"
import { onMounted, reactive, ref } from "vue"

const store = useStore()
const data = ref([{}])
const columns = createColumns()

const pagination = reactive({
    pageSize: 10,
})

function createColumns() {
    return [
        { title: "学号", key: "学号" },
        { title: "姓名", key: "姓名" },
        { title: "电话号码", key: "电话号码" },
        { title: "组织", key: "组织" },
    ]
}
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
            const parseResult = Papa.parse(fr.result as string, {
                header: true,
            })
            data.value = parseResult.data as Array<Record<string, unknown>>
        }
    } else {
        return false
    }
}
function handleChange({ file, fileList }: BUArguments) {
    fileListLengthRef.value = fileList.length
}

function onClick() {
    const prePost = { students: data.value }

    console.log(
        "%c [prePost]:",
        "color:white;background:blue;font-size:13px",
        prePost
    )

    ajax.post("/admin/enrollment", prePost)
}
</script>

<style scoped></style>
