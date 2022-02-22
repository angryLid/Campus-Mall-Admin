import { defineStore } from "pinia"
import cookies from "./utils/cookies"

const auth = cookies.getItem("auth")
export const useStore = defineStore("main", {
    state: () => ({
        imageHostURL: "http://119.91.147.80:9000/mall/",
        jwt: auth ? auth : "",
        location: [""],
    }),
})
