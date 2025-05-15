export interface authSignUpBody{
    email: string
    name: string
    password: string
}

export interface authSignInBody{
    email: string
    password: string
}


export interface AuthResp {
    id_user: number
    name: string
    email: string
    created_at: string | Date
    token: string
}