import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'star';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl bg-[#1e3932] text-white shadow-[0_12px_32px_rgba(7,35,29,0.35)] border border-emerald-800/40 backdrop-blur-md"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#006c47] text-white shadow-inner">
              {toast.type === 'star' ? (
                <span className="material-symbols-outlined text-lg text-amber-300">star</span>
              ) : toast.type === 'info' ? (
                <span className="material-symbols-outlined text-lg">info</span>
              ) : (
                <span className="material-symbols-outlined text-lg">check</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white tracking-wide">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-emerald-200/80 truncate mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-emerald-300/60 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
