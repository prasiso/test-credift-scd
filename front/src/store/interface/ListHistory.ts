import { _IDataComponent } from "@/components/dashboard/list/interface"

export type ListHistory<D> = {
    data: D
    setData: (params: _IDataComponent[] )=> void
}

