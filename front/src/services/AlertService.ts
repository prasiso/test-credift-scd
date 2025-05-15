import { AlertType } from "@/components";

type AlertHandler = (message: string, type?: AlertType, duration?: number) => Promise<void>;
export class AlertService {
    private static alertHandler: AlertHandler | null = null
    public static registerHandler(handler: AlertHandler) {
        AlertService.alertHandler = handler
    }
    public static emitAlert(message: string, type: AlertType = 'error', duration: number = 3500): Promise<void> {
        if(AlertService.alertHandler)
            return AlertService.alertHandler(message, type, duration)
        alert(message)
        return Promise.resolve()
    }
}