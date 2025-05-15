import { AlertData, AlertType } from "@/components"

export interface UIContextProps<T = unknown> {
    loading: boolean;
    showLoading: (operation: ()=> Promise<T>) => Promise<T>;
    setLoading: (opt: boolean)=> void 
    alert: Omit<AlertData, 'onClose'> | null;
    showAlert: ({ type, message, duration }: { type: AlertType, message: string, duration?: number }) => void
}