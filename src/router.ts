import cookies from "@/utils/cookies"
import { createRouter, createWebHashHistory } from "vue-router"
import HomePage from "./views/HomePage.vue"
import SignIn from "./views/SignIn.vue"
import UserManage from "./views/UserManage.vue"
const routes = [
    {
        path: "/",
        component: HomePage,
        name: "home",
        children: [{ path: "user", component: UserManage }],
    },
    { path: "/auth", component: SignIn, name: "signIn" },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (to.name !== "signIn") {
        const auth = cookies.getItem("auth")
        if (auth === null || auth.length < 1) {
            return { name: "signIn" }
        }
    }
})
export default router
