export type _IDataComponent = { "word": string, added?: string  }

export type _IComponentListEntrie = {
    data: _IDataComponent[],
    wordActive?: string,
    hasMore: boolean,
    search?: string,
    totalDocs: number,
    onLoadMore: () => void,
    onSearchChange: (value: string) => void,
    clickWord: (value: string) => void,
}

