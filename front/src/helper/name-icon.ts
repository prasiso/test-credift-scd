export function nameIcon(name?: string) {
    return name
        ?.split(" ")
        ?.map((n) => n[0])
        ?.slice(0, 2) || ''
}