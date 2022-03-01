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
// POST /{version}/user/{telephone}
export function getUser(telephone: string) {
    return useAxios().get(url + "/" + telephone)
}
// GET /{version}/user
export function getUsers() {
    return useAxios().get(url)
}
// PUT /{version}/{id}/{status}
export function putUser(id: string | number, status: string | number) {
    return useAxios().put(`${url}/${id}/${status}`)
}
