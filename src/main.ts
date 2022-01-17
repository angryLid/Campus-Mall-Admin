import { create, NButton } from "naive-ui"
// 等宽字体
import "vfonts/FiraCode.css"
// 通用字体
import "vfonts/Lato.css"
import { createApp } from "vue"
import App from "./App.vue"

const naive = create({
    components: [NButton],
})
const app = createApp(App)
app.use(naive)
app.mount("#app")
