import { createRouter, createWebHashHistory } from "vue-router"
import { useStore } from "./store"
import ajax from "./utils/ajax"
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
    const store = useStore()

    if (to.name !== "signIn") {
        const req = await ajax.get("/user/?token=" + store.jwt)
        const resp = await req.data
        return resp ? resp : { name: "signIn" }
    }
})
export default router
