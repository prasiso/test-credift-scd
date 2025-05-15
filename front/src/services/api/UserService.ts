import { transformQueryInString } from "@/helper"
import { apiClient } from "@/lib"

const router = 'user/me/'
export const GetUserHistory = async (arg: { page: number, limit: number, search?: string }) => {
   const query = transformQueryInString(arg)
    const { data } = await apiClient.get(`${router}history?${query}`,)
    return data
}

export const GetUserFavorite = async (arg: { page: number, limit: number, search?: string }) => {
    const query = transformQueryInString(arg)
    const { data } = await apiClient.get(`${router}favorites?${query}`,)
    return data
}