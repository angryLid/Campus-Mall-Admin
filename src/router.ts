import cookies from "@/utils/cookies"
import ProductManage from "@/views/ProductManage.vue"
import Enroll from "@/views/user/EnrollManage.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import GeneralStatus from "./views/GeneralStatus.vue"
import HomePage from "./views/HomePage.vue"
import QualificationReview from "./views/retailer/QualificationReview.vue"
import SignIn from "./views/SignIn.vue"
import SwipeManage from "./views/SwipeManage.vue"
import UserManage from "./views/user/UserManage.vue"
const routes = [
    {
        path: "/",
        component: HomePage,
        name: "home",
        children: [
            { path: "/", component: GeneralStatus, name: "info" },
            { path: "user/switch", component: UserManage, name: "switch" },
            { path: "user/enroll", component: Enroll, name: "enroll" },
            {
                path: "retail/review",
                component: QualificationReview,
                name: "review",
            },
            { path: "swipe", component: SwipeManage, name: "swipe" },
            { path: "product", component: ProductManage, name: "product" },
        ],
    },
    { path: "/auth", component: SignIn, name: "signIn" },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const auth = cookies.getItem("auth")
    const isLogin = auth !== null && auth !== "" && auth.trim() !== ""

    if (to.name !== "signIn" && !isLogin) {
        return { name: "signIn" }
    }
    if (to.name === "signIn" && isLogin) {
        return { name: "info" }
    }
})
export default router
