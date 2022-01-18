import { create, NButton, NForm, NFormItem, NInput } from "naive-ui"
import { createPinia } from "pinia"
import "vfonts/FiraCode.css"
import "vfonts/Lato.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const naive = create({
    components: [NButton, NForm, NFormItem, NInput],
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount("#app")
