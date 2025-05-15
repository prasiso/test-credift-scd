'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UIContextProps } from "./interface/UIContextProps";
import { AlertData, AlertType } from "@/components";
import { AlertService } from "@/services";

const UIContext = createContext<UIContextProps | undefined>(undefined);
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Omit<AlertData, "onClose"> | null>(null);
  const showAlert = ({
    type,
    message,
    duration = 3500,
  }: {
    type: AlertType;
    message: string;
    duration?: number;
  }) => {
    setAlert({ type, message });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAlert(null);
        resolve();
      }, duration);
    });
  };
  async function showLoading(operation: () => void): Promise<void> {
    setLoading(true);
    const MIN_DURATION = 1500;
    const startTime = Date.now();
    try {
      const result = await operation();
      return result;
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_DURATION - elapsed;
      if (remaining > 0) await new Promise((res) => setTimeout(res, remaining));
      setLoading(false);
    }
  }

  useEffect(() => {
    AlertService.registerHandler(
      (message: string, type: AlertType = "error", duration: number = 3500) =>
        showAlert({ type, message, duration })
    );
  }, []);

  return (
    <UIContext.Provider
      value={{ loading, showLoading, alert, setLoading, showAlert }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
