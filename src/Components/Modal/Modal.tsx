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
  labelDelete?: string;
  modalTitle: string;
  contentModal: React.ReactNode;
}

export default function Modal({
  width,
  modalTitle,
  contentModal,
  Confirm,
  Cancel,
  labelConfirm,
  labelDelete,
  closeModal,
}: props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
      {/* Fija el overlay a toda la ventana, lo coloca sobre el resto, centra el modal y aplica un fondo negro semitransparente con espacio interno. */}
      <div
        className={`w-[95vw] sm:w-[90vw] ${modalWidths[width]} max-h-[90vh] overflow-y-auto rounded-lg bg-white p-4 shadow-lg sm:p-6`}
      >
        <div className="flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl pb-5">
              {modalTitle}
            </h2>

            <svg
              onClick={closeModal}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 cursor-pointer hover:bg-zinc-200 h-5 w-6 rounded-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="">{contentModal}</div>

          <div className="flex justify-end gap-2 mt-6">
            {Confirm && (
              <Button
                labelBtn={labelConfirm}
                onClick={Confirm}
                typeBtn="button"
              />
            )}

            {Cancel && (
              <Button
                labelBtn={labelDelete}
                onClick={Cancel}
                typeBtn="button"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
