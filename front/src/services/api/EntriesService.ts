import { apiClient } from "@/lib"
import { WordEntry, RespGetEntries } from "."
import { transformQueryInString } from "@/helper"

const router = 'entries/end/'
export const EntriesGetEntries = async (arg: { page: number, limit: number, search?: string }): Promise<RespGetEntries> => {
    const query = transformQueryInString(arg)
    const { data } = await apiClient.get(`${router}?${query}`,)
    return data
}

export const EntriesGetEntrie = async (word: string): Promise<WordEntry> => {
    const { data } = await apiClient.get(`${router}${encodeURIComponent(word)}`,)
    return data
}

export const EntriesPostFav = async (word: string): Promise<void> => {
    await apiClient.post(`${router}${encodeURIComponent(word)}/favorite`)
}

export const EntriesPostUnFav = async (word: string): Promise<void> => {
    await apiClient.delete(`${router}${encodeURIComponent(word)}/unfavorite`)
}