import type React from "react";
import Button from "../Ui/Button";

const modalWidths = {
  low: "max-w-2xl",
  medium: "max-w-3xl",
  large: "max-w-5xl",
} as const;

interface props {
  width: keyof typeof modalWidths;
  Confirm?: () => void;
  Cancel?: () => void;
  closeModal?: () => void;
  labelConfirm?: string;
  labelCancel?: string;
  modalTitle: string;
  contentModal: React.ReactNode;
  typeBtnConfirm : "submit" | "button"
  formId?:string
}

export default function Modal({
  width,
  modalTitle,
  contentModal,
  Confirm,
  Cancel,
  labelConfirm,
  labelCancel,
  typeBtnConfirm,
  formId,
  closeModal,
}: props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
      {/* Contenedor principal con altura máxima y flex vertical */}
      <div
        className={`w-[95vw] sm:w-[90vw] ${modalWidths[width]} max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden`}
      >
        {/* Header Fijo */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {modalTitle}
          </h2>

          <svg
            onClick={closeModal}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 cursor-pointer rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Cuerpo del Modal con scroll independiente */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {contentModal}
        </div>

        {/* Footer Sticky / Siempre visible en la parte inferior */}
        {(Cancel || Confirm) && (
          <div className="sticky bottom-0 z-20 flex items-center justify-end gap-2.5 border-t border-zinc-100 bg-white/95 px-5 py-3.5 sm:px-6 backdrop-blur-sm">
            {Cancel && (
              <Button
                className="bg-zinc-100! text-zinc-900 hover:bg-zinc-200"
                labelBtn={labelCancel}
                onClick={Cancel}
                typeBtn="button"
              />
            )}
            {Confirm && (
              <Button
                labelBtn={labelConfirm}
                onClick={typeBtnConfirm === "submit" ? undefined : Confirm}
                typeBtn={typeBtnConfirm}
                formId={formId}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}