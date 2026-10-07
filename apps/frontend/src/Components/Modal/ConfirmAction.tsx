import type { ReactNode } from "react";
import Button from "../Ui/Button";

interface ModalStyle {
  iconContainer: string;
  icon: string;
  deleteButton: string;
}

const styles: Record<string, ModalStyle> = {
  danger: {
    iconContainer:
      "bg-red-100 text-red-500 ring-4 ring-red-50",
    icon: "text-red-500",
    deleteButton: "",
  },
};

interface ConfirmActionProps {
  title: string;
  icon: ReactNode;
  typeModal: "danger";
  description?: ReactNode;
  onDelete: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export default function ConfirmAction({
  title,
  icon,
  typeModal,
  description = "Esta acción no se puede deshacer y todos los datos se perderán.",
  onDelete,
  onCancel,
  children,
}: ConfirmActionProps) {
  const modalStyles = styles[typeModal];

  return (
    <div className="w-[90vw] max-w-[420px] rounded-[32px] bg-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 overflow-hidden mx-auto p-8">
      <div className="flex flex-col items-center text-center">
        {icon && (
          <div className="mb-5 flex items-center justify-center size-14 rounded-full bg-red-50 text-[#FF3B30] shadow-[0_4px_14px_rgba(255,59,48,0.15)]">
            {icon}
          </div>
        )}
        <h3 className="text-[22px] font-semibold text-zinc-900 tracking-tight mb-2">{title}</h3>
        <p className="text-[15px] leading-relaxed text-zinc-500 mb-2">{description}</p>
        
        {children && (
          <div className="w-full text-left mt-6 mb-2 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            {children}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={onCancel}
          className="flex-1 py-3.5 px-4 rounded-[16px] text-[15px] font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-3.5 px-4 rounded-[16px] text-[15px] font-medium text-white bg-[#FF3B30] hover:bg-red-500 transition-colors shadow-[0_4px_14px_rgba(255,59,48,0.3)]"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
