import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/qualification"

export interface Qualification {
    id: number
    applicantId: number
    comentary: string
    enterpriseName: string
    enterpriseType: string
    currentStatus: string
    createdAt: string
    image0?: string
    image1?: string
    image2?: string
    image3?: string
    image4?: string
    image5?: string
    done?: boolean
}

export interface Review {
    commentary: string
    option: string
}

export function getAllWaiting() {
    return useAxios().get(url)
}

export function putOne(id: number, payload: Review) {
    return useAxios().put(`${url}/${id}/`, payload)
}
