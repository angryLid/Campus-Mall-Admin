<template>
    <n-button @click="showModal = true">发布活动</n-button>
    <n-modal v-model:show="showModal">
        <n-card
            style="width: 600px"
            title="发布活动"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-form>
                <n-form-item label="活动标题">
                    <n-input
                        v-model:value="uploadSwipe.title"
                        placeholder="请输入活动标题"
                    />
                </n-form-item>
                <n-form-item label="活动内容">
                    <n-input
                        v-model:value="uploadSwipe.detail"
                        placeholder="请输入活动内容"
                    />
                </n-form-item>
                <n-upload
                    :max="1"
                    @before-upload="beforeUpload"
                    :default-upload="false"
                    @change="handleChange"
                >
                    <n-button>上传海报图片</n-button>
                </n-upload>
                <n-form-item>
                    <n-button @click="onPublish">发布</n-button>
                </n-form-item>
            </n-form>
        </n-card>
    </n-modal>

    <n-modal v-model:show="showModal2">
        <n-card
            style="width: 600px"
            title="详情"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-form label-placement="left" disabled>
                <n-form-item label="标题">
                    <n-input v-model:value="swipe.title" disabled></n-input>
                </n-form-item>
                <n-form-item label="描述">
                    <n-input v-model:value="swipe.detail" disabled></n-input>
                </n-form-item>
                <n-form-item label="海报">
                    <n-image
                        :src="imageTemplate(swipe.image)"
                        width="300"
                    ></n-image>
                </n-form-item>
            </n-form>
        </n-card>
    </n-modal>

    <n-data-table :columns="columns" :data="swipeList" :bordered="false" />
</template>

<script lang="tsx" setup>
import type { UploadFileInfo } from "naive-ui"
import { useMessage } from "naive-ui"
import { getSwipeList, postSwipe, putSwipeStatus, Swipe } from "@/api/swipe"
import { useStore } from "@/store"
import { onMounted, reactive, ref, watchEffect } from "vue"
import { NButton, NTime, NCard, NModal, NUpload, NImage } from "naive-ui"
import { imageTemplate } from "@/utils/image"
interface BUArguments {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
}
const store = useStore()

const message = useMessage()
const showModal = ref(false)
const showModal2 = ref(false)
const columns = createColumns()
const uploadSwipe = reactive({
    title: "",
    detail: "",
})
const swipe = reactive<Swipe>({
    id: 0,
    title: "",
    detail: "",
    status: 0,
    createdAt: "",
    image: "",
})
const swipeList = ref<Swipe[]>([])

let fileRef: File

onMounted(async () => {
    store.location = ["活动管理"]
    const req = await getSwipeList()
    const { data } = req
    console.log(
        "%c [data]:",
        "color:white;background:blue;font-size:13px",
        data
    )
    swipeList.value = data.data
})
watchEffect(() => {
    console.log(
        "%c [swipeList]:",
        "color:white;background:blue;font-size:13px",
        uploadSwipe
    )
})
function handleChange({ file, fileList }: BUArguments) {
    console.log(
        "%c [hCange]:",
        "color:white;background:blue;font-size:13px",
        file
    )
}
async function beforeUpload({ file, fileList }: BUArguments) {
    if (!file.type?.startsWith("image")) {
        return false
    }
    if (file.file) {
        fileRef = file.file
    }
    console.log(
        "%c [bUpload]:",
        "color:white;background:red;font-size:13px",
        file
    )
}

async function onPublish() {
    const formData = new FormData()
    formData.append("title", uploadSwipe.title)
    formData.append("detail", uploadSwipe.detail)
    formData.append("image", fileRef)
    const req = await postSwipe(formData)
    const { data } = req
    if (data.code === 200) {
        message.success("发布成功")
        showModal.value = false
        uploadSwipe.detail = ""
        uploadSwipe.title = ""
    } else {
        message.error("发布失败")
    }
}
function createColumns() {
    return [
        {
            title: "名称",
            key: "title",
        },
        {
            title: "发布时间",
            key: "age",
            render: renderTime,
        },
        {
            title: "状态",
            key: "status",
            render: renderStatus,
        },
        {
            title: "操作",
            key: "tags",
            render: renderOptions,
        },
    ]
}
function renderOptions(row: Swipe) {
    const disabled = row.status === 0
    const onTakeDown = async () => {
        const req = await putSwipeStatus(row.id)
        const { data } = req
        if (data.code === 200) {
            row.status = 0
            message.success("下架成功")
        } else {
            message.error("操作失败, 请检查网络后重试")
        }
    }
    const onView = async () => {
        swipe.id = row.id
        swipe.title = row.title
        swipe.detail = row.detail
        swipe.status = row.status
        swipe.createdAt = row.createdAt
        swipe.image = row.image
        showModal2.value = true
    }
    return [
        <NButton
            type="primary"
            size="small"
            style="margin-right:5px"
            onClick={onView}
        >
            查看
        </NButton>,
        <NButton
            type="error"
            size="small"
            disabled={disabled}
            onClick={onTakeDown}
        >
            下架
        </NButton>,
    ]
}
function renderStatus(row: Swipe) {
    const status = row.status
    if (status === 0) {
        return "已下架"
    } else {
        return "已发布"
    }
}
function renderTime(row: Swipe) {
    const time = new Date(row.createdAt)
    return <NTime time={time} />
}
</script>

<style scoped></style>
