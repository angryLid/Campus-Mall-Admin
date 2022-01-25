import { useAxios } from "./axiosInstance"
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
}
export function getAllWaiting() {
    return useAxios().get("/admin/qualification/")
}
