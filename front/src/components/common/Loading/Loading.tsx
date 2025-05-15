
'use client'
import { motion } from "framer-motion";

export function Loading() {
  return (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex items-center space-x-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-7 w-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-white text-base font-semibold tracking-wide">
              Carregando...
            </span>
          </motion.div>
        </motion.div>
  );
}
