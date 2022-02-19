import { useAxios } from "./axiosInstance"
import { apiVersion } from "./version"

const url = apiVersion + "/swipe"

export interface Swipe extends UploadSwipe {
    id: number
    image: string
    status: number
    createdAt: string
}

export interface UploadSwipe {
    title: string
    detail: string
}

// GET /admin/swipe
export function getSwipeList() {
    return useAxios().get(url)
}

// PUT /admin/swipe/{id}
export function putSwipeStatus(id: string | number) {
    return useAxios().put(url + "/" + id)
}

// POST /admin/swipe
export function postSwipe(formData: FormData) {
    return useAxios().post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

// GET /admin/swipe/{id}
export function getSwipe(id: string | number) {
    return useAxios().get(url + "/" + id)
}
