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
    done?: boolean
}
export function getAllWaiting() {
    return useAxios().get("/admin/qualification/")
}

export function putOne(
    id: number,
    commentary: string,
    option: "approved" | "rejected"
) {
    return useAxios().put(
        `/admin/qualification/${id}/?option=${option}&commentary=${commentary}`
    )
}
