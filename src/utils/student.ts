import { useAxios } from "@/api/axiosInstance"
import { apiVersion } from "@/api/version"

const url = apiVersion + "/student"

export function postStudents(payload: Record<string, string>[]) {
    return useAxios().post(url, payload)
}
