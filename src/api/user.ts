import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/user"

export interface User {
    id: number
    name: string
    merchantId: number
    studentId: number
    telephone: string
    createdAt: string
    authStatus: number
}
export function getUser(telephone: string) {
    return useAxios().get(url + "/" + telephone)
}

export function getUsers() {
    return useAxios().get(url)
}

export function putUser(id: string | number, status: string | number) {
    return useAxios().put(`${url}/${id}/${status}`)
}
