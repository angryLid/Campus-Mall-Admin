import { createRouter, createWebHashHistory } from "vue-router"
import HomePage from "./views/HomePage.vue"
import SignIn from "./views/SignIn.vue"
import ajax from "./utils/ajax"
const routes = [
    { path: "/", component: HomePage, name: "home" },
    { path: "/auth", component: SignIn, name: "signIn" },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.name !== "signIn") {
        return { name: "signIn" }
    }
})
export default router
