import { AuthResp } from "@/services"

export function getUser(): AuthResp | null  {
   if (typeof window === 'undefined') return null
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : null
}

export function setUser(data: AuthResp) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function removeUser(){
    localStorage.removeItem('user')
}