import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/auth"

export function signIn(user: { name: string; password: string }) {
    return useAxios().post(url, user)
}
