import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/product"

export interface Product {
    id: number
    title: string
    description: string
    price: number
    pType: boolean
    status: number
    createdAt: string
    isDelete: boolean
}

// GET /{admin}/product
export function getProducts() {
    return useAxios().get(url)
}
// PUT /admin/product/{id}/{status}
export function putProduct(id: number, status: number) {
    return useAxios().put(`${url}/${id}/${status}`)
}
