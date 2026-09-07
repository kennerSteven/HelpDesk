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
    deleteButton:
      "bg-red-600! shadow-sm shadow-red-600/20 hover:bg-red-700!",
  },
};

interface ConfirmActionProps {
  title: string;
  icon: ReactNode;
  typeModal: "danger";
  description?: string;
  onDelete: () => void;
  onCancel: () => void;
}

export default function ConfirmAction({
  title,
  icon,
  typeModal,
  description = "Esta acción no se puede deshacer y todos los datos se perderán.",
  onDelete,
  onCancel,
}: ConfirmActionProps) {
  const modalStyles = styles[typeModal];

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl sm:p-9">
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-6 flex size-14 items-center justify-center rounded-full ${modalStyles.iconContainer}`}
        >
          <span className={`flex size-7 items-center justify-center ${modalStyles.icon}`}>
            {icon}
          </span>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-zinc-900">{title}</h3>
        <p className="mb-7 text-base leading-6 text-zinc-500">{description}</p>
      </div>

      <div className="flex w-full items-center justify-end gap-3">
        <Button
          typeBtn="button"
          labelBtn="Cancelar"
          onClick={onCancel}
          className="bg-transparent! px-1! text-base! text-zinc-600! hover:bg-transparent! hover:text-zinc-900!"
        />
        <Button
          typeBtn="button"
          labelBtn="Eliminar"
          onClick={onDelete}
          className={`rounded-xl! px-5! py-3! text-base! text-white! ${modalStyles.deleteButton}`}
        />
      </div>
    </div>
  );
}
