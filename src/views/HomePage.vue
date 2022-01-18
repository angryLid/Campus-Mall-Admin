<template>Temp Index</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import ajax from "../utils/ajax"

const t =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1Njc4IiwidGVsZXBob25lIjoiMTcxMzI5NTQ4ODkiLCJleHAiOjE2NDMwODA2NzR9.QX4DyesF18mM1kKgG4XMpjNRsUTfWrWeX0Y-BXEWz-I"
onMounted(async () => {
    const req = await ajax.get("/user/?token=" + t)
    const resp = await req.data
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
})
</script>

<style scoped></style>
