import { useAxios } from "@/api/axiosInstance"
import { apiVersion } from "@/api/version"

const url = apiVersion + "/student"

export interface IStudent {
    学号: string
    姓名: string
    电话号码: string
    组织: string
}
// POST /{version}/student
export function postStudents(payload: IStudent[]) {
    return useAxios().post(url, payload)
}
