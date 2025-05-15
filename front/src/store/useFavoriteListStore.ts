import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ListHistory,} from '.'
import { _IDataComponent } from '@/components/dashboard/list/interface'
const storeCreator: StateCreator<ListHistory<_IDataComponent[]>> = (set) => ({
    data: [],
    setData: ((data) => set(() => ({ data }))),
})
export const useFavoriteListStore = create(
    persist(storeCreator, {
        name: 'favorite-list-storage',
        storage: createJSONStorage(() => localStorage)
    })
)