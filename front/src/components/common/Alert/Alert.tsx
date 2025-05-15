'use client';

import { AlertData, AlertType } from "./AlertType";
import { motion } from "framer-motion";

export function Alert({ type = "info", message, onClose }: AlertData) {
  const baseStyle =
    "fixed top-4 right-4 px-4 py-2 rounded shadow z-50 transition-all";
  const typeStyle: Record<Exclude<AlertType, null>, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <motion.div
      className={`${baseStyle} ${type? typeStyle[type]: ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {message}
      <button onClick={onClose} className="ml-4 font-bold">
        X
      </button>
    </motion.div>
  );
}
