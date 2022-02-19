import { useStore } from "@/store"

export function imageTemplate(uuid: string) {
    return useStore().imageHostURL + uuid
}
