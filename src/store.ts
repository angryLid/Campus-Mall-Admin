import { defineStore } from "pinia"
import cookies from "./utils/cookies"

export const useStore = defineStore("main", {
    state: () => ({
        jwt: cookies.getItem("auth"),
        location: [""],
    }),
})
