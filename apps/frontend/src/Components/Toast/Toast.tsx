import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const toastStyles = {
  success: {
    container: "bg-emerald-700",
    iconContainer: "bg-emerald-600 text-emerald-100",
    icon: "text-emerald-100",
    title: "text-white",
    message: "text-emerald-100",
    messageText: "Tu tarea se creó correctamente.",
  },
  warning: {
    container: "bg-amber-600",
    iconContainer: "bg-amber-500 text-amber-100",
    icon: "text-amber-100",
    title: "text-white",
    message: "text-amber-100",
    messageText: "Revisa la información antes de continuar.",
  },
  error: {
    container: "bg-red-700",
    iconContainer: "bg-red-600 text-red-100",
    icon: "text-red-100",
    title: "text-white",
    message: "text-red-100",
    messageText: "Ocurrió un error. Inténtalo nuevamente.",
  },
};

type ToastType = keyof typeof toastStyles;

interface ToastProps {
  titleToast: string;
  typeToast: ToastType;
  isOpen: boolean;
  onClose: () => void;
}

const toastIcons: Record<ToastType, ReactNode> = {
  success: (
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  ),
  warning: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  error: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  ),
};

export default function Toast({
  titleToast,
  typeToast,
  isOpen,
  onClose,
}: ToastProps) {
  const styles = toastStyles[typeToast];
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isOpen || !isVisible) return null;

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-full p-3 shadow-lg ${styles.container}`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${styles.iconContainer}`}
      >
        <svg
          className={`size-5 ${styles.icon}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={typeToast === "success" ? "0 0 20 20" : "0 0 24 24"}
          fill={typeToast === "success" ? "currentColor" : "none"}
        >
          {toastIcons[typeToast]}
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold ${styles.title}`}>{titleToast}</p>
        <p className={`text-xs ${styles.message}`}>{styles.messageText}</p>
      </div>
    </div>
  );
}
