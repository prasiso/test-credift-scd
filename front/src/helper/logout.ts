import { AlertService } from "@/services"

export async function logout(expire = true) {
    const message = expire? 'Your login has expired, you will be redirected': 'You will be redirected to the login screen!'
    await AlertService.emitAlert(message, 'error')
    localStorage.clear()
    window.location.href = '/signin'
}