import { _IDataComponent } from "@/components/dashboard/list/interface"

export type ListFavorite<D> = {
    data: D
    setData: (params: _IDataComponent[] )=> void
}

