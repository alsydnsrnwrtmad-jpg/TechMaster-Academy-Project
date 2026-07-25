import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import "./Toast.css";

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

// Creative feature: Toast Notifications
export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <Icon size={16} />
            <span>{toast.message}</span>
            <button
              className="toast__close"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
