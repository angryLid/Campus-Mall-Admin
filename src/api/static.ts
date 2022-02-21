import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/static"

export interface Statics {
    user: number
    product: number
    order: number
    merchant: number
}
export function getStatics() {
    return useAxios().get(url)
}
