import { apiClient } from "@/lib";
import { authSignInBody, authSignUpBody } from ".";

const router = '/auth/'
export const AuthPostSignUp = async (body: authSignUpBody) => {
    const { data } = await apiClient.post(`${router}signup`, body)
    return data
}
export const AuthPostSignIn = async (body: authSignInBody) => {
    const { data } = await apiClient.post(`${router}signin`, body)
    return data
}