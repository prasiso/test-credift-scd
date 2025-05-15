'use client'
import { getUser, logout } from '@/helper';
import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})
apiClient.interceptors.request.use((config) => {
    const user = getUser()
    config.headers.Authorization = `Bearer ${user?.token || ''}`
    return config
})


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error('AXIOS ERROR:', error)
        if (error.status == 401) {
            await logout()
        }
        return Promise.reject(error)
    }
)
export { apiClient }