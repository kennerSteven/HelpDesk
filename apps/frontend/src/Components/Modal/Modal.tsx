import type React from "react";
import Button from "../Ui/Button";

const modalWidths = {
  low: "max-w-2xl",
  medium: "max-w-3xl",
  large: "max-w-4xl",
  xl: "max-w-[1400px]",
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
  typeBtnConfirm: "submit" | "button";
  formId?: string;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 overflow-hidden ">
      {/* Contenedor principal con altura máxima y flex vertical */}
      <div
        className={`w-[95vw] sm:w-[90vw] ${modalWidths[width]} max-h-[90vh] flex flex-col rounded-[28px] bg-white shadow-2xl overflow-hidden`}
      >
        {/* Header Fijo */}
        <div className="flex items-center justify-between bg-white px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-zinc-100/80">
          <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900">
            {modalTitle}
          </h2>

          <button
            type="button"
            onClick={closeModal}
            className="flex items-center justify-center rounded-full bg-zinc-100/80 p-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cuerpo del Modal con scroll y min-h-0 para permitir flex-shrink */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {contentModal}
        </div>

        {/* Footer Sticky / Siempre visible en la parte inferior */}
        {(Cancel || Confirm) && (
          <div className="sticky bottom-0 z-20 flex items-center justify-end gap-3 bg-white px-6 py-5 border-t border-zinc-100/50">
            {Cancel && (
              <Button
                variant="secondary"
                labelBtn={labelCancel}
                onClick={Cancel}
                typeBtn="button"
              />
            )}
            {Confirm && (
              <Button
                variant="primary"
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
