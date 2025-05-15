'use client';
import { useUI } from "@/context/UIContext";
import { Loading, Alert } from ".";
import { AnimatePresence } from "framer-motion";
export function UIOverlay() {
  const { loading, alert, showAlert } = useUI();
  return (
    <>
    <AnimatePresence mode="wait">
      {loading && <Loading />}
      </AnimatePresence>
    <AnimatePresence mode="wait">

      {alert && (
        <Alert
          type={alert.type ?? "info"}
          message={alert.message}
          onClose={() => showAlert({ message: "", type: null, duration: 0 })}
        />
      )}
      </AnimatePresence>

    </>
  );
}
