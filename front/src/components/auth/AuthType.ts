export interface AuthProps {
    title: string
    Submit: ({ email, password, name }: { email: string, password: string, name: string }) => void
    linkText: string
    linkHref: string
    isSignUp?: boolean
}