import Input from "../../../../Components/Ui/Input";
import Button from "../../../../Components/Ui/Button";
import { PlusIcon, CloseIcon } from "../../../../Components/Icons";
import useHandleTaskStep, { type StepItem } from "./useHandleTaskStep";

export type { StepItem };

export interface TaskStepsProps {
  steps?: StepItem[];
  onChange?: (steps: StepItem[]) => void;
  className?: string;
}

export default function TaskSteps({
  onChange,
  className = "",
}: TaskStepsProps) {

  
  const {
    steps,
    name,
    setName,
    description,
    setDescription,
    handleAddStep,
    handleRemoveStep,
    handleKeyDown,
  } = useHandleTaskStep({

    onChange,
  });

  return (
    <div
      className={`flex flex-col gap-4 rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900">
            Pasos de la Tarea
          </h3>
          <p className="text-[13px] text-zinc-500">
            Define la secuencia o checklist para completar esta actividad.
          </p>
        </div>
        {steps.length > 0 && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
            {steps.length} {steps.length === 1 ? "paso" : "pasos"}
          </span>
        )}
      </div>

      {/* Formulario para agregar pasos */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            name="stepName"
            label="Nombre del paso"
            showLabel={true}
            placeholder="Ej. Revisar documentación"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="stepDescription"
            label="Descripción (opcional)"
            showLabel={true}
            placeholder="Ej. Añadir notas o criterios"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Botón alineado a la derecha */}
        <div className="flex justify-end pt-1">
          <Button
            typeBtn="button"
            labelBtn="Agregar paso"
            variant="primary"
            size="sm"
            onClick={handleAddStep}
            icon={<PlusIcon className="size-4" />}
            disabled={!name.trim() && !description.trim()}
          />
        </div>
      </div>

      {/* Listado de pasos agregados */}
      {steps.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-400">
            Pasos agregados
          </span>
          <div className="flex flex-col gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group flex items-start justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5 transition-all hover:border-zinc-200 hover:bg-zinc-50"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-zinc-900">
                      {step.name}
                    </span>
                    {step.description && (
                      <span className="mt-0.5 text-[13px] text-zinc-500">
                        {step.description}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className="flex size-7 items-center justify-center rounded-lg text-zinc-400 opacity-60 transition-all hover:bg-rose-50 hover:text-rose-600 hover:opacity-100"
                  title="Eliminar paso"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
