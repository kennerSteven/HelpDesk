import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const toastStyles = {
  success: {
    container: "bg-emerald-600/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_12px_40px_-12px_rgba(5,150,105,0.6)]",
    iconContainer: "bg-white/25 text-white shadow-inner",
    icon: "text-white",
    title: "text-white",
    message: "text-emerald-50",
    messageText: "Acción completada con éxito.",
  },
  warning: {
    container: "bg-amber-500/95 backdrop-blur-2xl border border-amber-400/40 shadow-[0_12px_40px_-12px_rgba(245,158,11,0.6)]",
    iconContainer: "bg-white/25 text-white shadow-inner",
    icon: "text-white",
    title: "text-white",
    message: "text-amber-50",
    messageText: "Revisa la información antes de continuar.",
  },
  error: {
    container: "bg-rose-600/95 backdrop-blur-2xl border border-rose-500/40 shadow-[0_12px_40px_-12px_rgba(225,29,72,0.6)]",
    iconContainer: "bg-white/25 text-white shadow-inner",
    icon: "text-white",
    title: "text-white",
    message: "text-rose-50",
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
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Pequeño retraso para permitir que el DOM se actualice antes de animar la entrada
      setTimeout(() => setIsVisible(true), 10);
      
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 400); // Esperar a que termine la animación de salida
      }, 3000);

      return () => clearTimeout(timeoutId);
    } else {
      setIsVisible(false);
      const timeoutId = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return (
    <div
      className={`flex w-full items-center gap-3.5 rounded-[999px] py-3 px-3.5 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
      } ${styles.container}`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-500 delay-100 ${
          isVisible ? "scale-100" : "scale-50"
        } ${styles.iconContainer}`}
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

      <div className="min-w-0 flex-1 pr-2">
        <p className={`text-[15px] font-semibold tracking-tight leading-snug ${styles.title}`}>{titleToast}</p>
        <p className={`text-[14px] leading-snug mt-0.5 opacity-90 ${styles.message}`}>{styles.messageText}</p>
      </div>
    </div>
  );
}
