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
        :data="students"
        :max-height="600"
        :pagination="pagination"
    />

    <n-space>
        <n-button @click="onClick" :disabled="students.length < 1">
            执行注册
        </n-button>
    </n-space>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { postStudents } from "@/utils/student"
import { UploadFileInfo, useMessage } from "naive-ui"
import { NSpace, NUpload } from "naive-ui"
import * as Papa from "papaparse"
import { onMounted, reactive, ref } from "vue"

interface BUArguments {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
}

const message = useMessage()

const store = useStore()
const students = ref<Record<string, string>[]>([])
const columns = [
    { title: "学号", key: "学号" },
    { title: "姓名", key: "姓名" },
    { title: "电话号码", key: "电话号码" },
    { title: "组织", key: "组织" },
]
const pagination = reactive({
    pageSize: 10,
})

const fileListLengthRef = ref(0)
onMounted(() => {
    store.location = ["用户管理", "新生入学注册"]
})

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
                skipEmptyLines: true,
            })
            students.value = parseResult.data as Record<string, string>[]
        }
    } else {
        return false
    }
}
function handleChange({ file, fileList }: BUArguments) {
    fileListLengthRef.value = fileList.length
}

async function onClick() {
    const req = await postStudents(students.value)
    const { data } = req

    console.log(
        "%c [data]:",
        "color:white;background:blue;font-size:13px",
        data
    )

    if (data.code === 40000 || data.code === 50000) {
        message.error(data.data)
        return
    }
    if (data.code === 200) {
        message.success(data.data)
        return
    }
}
</script>

<style scoped></style>
