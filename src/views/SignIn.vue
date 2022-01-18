<template>
    <div class="container">
        <n-form
            label-placement="left"
            label-width="auto"
            class="form"
            @submit="onSubmit"
        >
            <n-h1 class="title">{{ form.title }}</n-h1>
            <n-form-item :label="form.label.id">
                <n-input v-model:value="user.id" />
            </n-form-item>
            <n-form-item :label="form.label.password">
                <n-input v-model:value="user.password" />
            </n-form-item>

            <div class="btn-parent">
                <n-button type="success" @click="onSubmit">
                    {{ form.btn }}
                </n-button>
            </div>
        </n-form>
    </div>
</template>

<script lang="ts" setup>
import { NH1 } from "naive-ui"
import { reactive } from "vue"
import ajax from "../utils/ajax"
import cookies from "../utils/cookies"
const form = {
    btn: "登录",
    title: "管理后台",
    label: {
        id: "管理员ID",
        password: "密码",
    },
}
const user = reactive({
    id: "",
    password: "",
})

async function onSubmit() {
    const req = await ajax.post("/user/signin/", {
        telephone: user.id,
        password: user.password,
    })

    const resp = await req.data

    if (resp.code === 200) {
        cookies.setItem("auth", resp.data)
    }
}

// import
</script>

<style scoped>
.form {
    padding: 20px;
    width: 32vw;
    height: 50vh;
    border: 1px #777 solid;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0.8px 0.8px 0.5px 0.5px #777;
}
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #fcfcfc;
}
.title {
    text-align: center;
}
.btn-parent {
    display: flex;
    justify-content: center;
}
</style>
