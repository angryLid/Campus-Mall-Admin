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
        :max-height="500"
        :pagination="{ pageSize: 50 }"
    />

    <n-space>
        <n-button @click="onSubmit" :disabled="students.length < 1">
            执行注册
        </n-button>
    </n-space>
    <n-space>
        {{ progress }}
    </n-space>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { IStudent, postStudents } from "@/api/student"
import { UploadFileInfo, useMessage, NSpace, NUpload } from "naive-ui"
import * as Papa from "papaparse"
import { onMounted, ref } from "vue"

enum Progress {
    None = "",
    Waiting = "系统正在处理中,请等待",
    Approved = "成功",
    Rejected = "失败",
}

const message = useMessage()
const store = useStore()

const students = ref<IStudent[]>([])
const columns = [
    { title: "学号", key: "学号" },
    { title: "姓名", key: "姓名" },
    { title: "电话号码", key: "电话号码" },
    { title: "组织", key: "组织" },
]

const fileListLengthRef = ref(0)
const progress = ref(Progress.None)

onMounted(() => {
    store.location = ["用户管理", "新生入学注册"]
})

async function beforeUpload({ file }: { file: UploadFileInfo }) {
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
            students.value = parseResult.data as IStudent[]
        }
    } else {
        return false
    }
}

function handleChange({ fileList }: { fileList: UploadFileInfo[] }) {
    fileListLengthRef.value = fileList.length
}

async function onSubmit() {
    progress.value = Progress.Waiting
    const req = await postStudents(students.value)
    const { data } = req

    if (data.code === 40000 || data.code === 50000) {
        message.error(data.data)
        progress.value = Progress.Rejected
        return
    }
    if (data.code === 200) {
        message.success(data.data)
        progress.value = Progress.Approved
        return
    }
}
</script>

<style scoped></style>
