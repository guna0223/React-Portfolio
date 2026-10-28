import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title, message, type = 'info', duration = 3200) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev.slice(-3), { id, title, message, type }]); // Keep max 4 toasts

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon toast-icon--success" />;
      case 'error':
        return <AlertTriangle size={18} className="toast-icon toast-icon--error" />;
      default:
        return <Info size={18} className="toast-icon toast-icon--info" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <aside aria-label="Notifications" className="toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`toast-item toast-item--${toast.type}`}
            >
              <div className="toast-icon-wrapper">{getIcon(toast.type)}</div>
              <div className="toast-content">
                {toast.title && <div className="toast-title">{toast.title}</div>}
                {toast.message && <div className="toast-message">{toast.message}</div>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="toast-close"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      showToast: (title, message) => console.log(`[Toast Fallback] ${title}: ${message}`),
      removeToast: () => {},
    };
  }
  return ctx;
};
