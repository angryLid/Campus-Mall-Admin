import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/static"

export interface Statics {
    userCount: number
    productCount: number
    orderCount: number
    merchantCount: number
}
export function getStatics() {
    return useAxios().get(url)
}
