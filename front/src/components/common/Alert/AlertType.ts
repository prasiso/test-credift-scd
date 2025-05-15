export type AlertType = "success" | "error" | "warning" | "info" | null
export interface AlertData {
    type: AlertType;
    message: string;
    onClose?: () => void | null;
}