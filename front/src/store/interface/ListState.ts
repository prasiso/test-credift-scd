export type Result<D> = {
    page: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
    data: D
    search: string
    totalDocs: number
    entrie?: string
    tab?: string
}

export type ListState<D> = {
    result: Result<D>
    setResult: (params: Partial<Result<D>>) => void,
    reset: () => void
    resetSearch: () => void
}

