import React from "react";
import Input from "../../../Components/Ui/Input";
import InputDate from "../../../Components/Ui/InputDate";
import TextArea from "../../../Components/Ui/TextArea";
import Button from "../../../Components/Ui/Button";
import FieldMessage from "../../../Components/Common/FieldMessage";
import useCreateProject from "../Hooks/useCreateProject";
import SelectColor from "../../../Components/Ui/SelectColor";

interface CreateProjectProps {
  onClose?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function CreateProject({ onClose }: CreateProjectProps = {}) {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    isSubmitting,
  } = useCreateProject({ onClose });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="createProject"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-5">
        {/* 1. Nombre del proyecto */}
        <div>
          <Input
            name="nameProject"
            label="Nombre del proyecto"
            showLabel={true}
            placeholder="Ej. Rediseño de Plataforma, App Móvil..."
            register={register}
            required
          />
          {errors?.nameProject?.message && (
            <FieldMessage message={errors.nameProject.message as string} />
          )}
        </div>

        {/* 2. Descripción opcional */}
        <div>
          <TextArea
            name="descriptionProject"
            label="Descripción (Opcional)"
            showLabel={true}
            placeholder="Añade detalles, alcance u objetivos del proyecto..."
            rows={3}
            register={register}
          />
          {errors?.descriptionProject?.message && (
            <FieldMessage
              message={errors.descriptionProject.message as string}
            />
          )}
        </div>

        {/* Fechas: Inicio y Fin estimada en grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 3. Fecha de inicio */}
          <div>
            <InputDate
              name="dateInit"
              label="Fecha de inicio"
              showLabel={true}
              dateType="init"
              register={register}
              required
            />
            {errors?.dateInit?.message && (
              <FieldMessage message={errors.dateInit.message as string} />
            )}
          </div>

          {/* 4. Fecha estimada de finalización */}
          <div>
            <InputDate
              name="dateFinish"
              label="Fecha estimada de finalización"
              showLabel={true}
              dateType="finish"
              register={register}
              required
            />
            {errors?.dateFinish?.message && (
              <FieldMessage message={errors.dateFinish.message as string} />
            )}
          </div>
        </div>

        {/* 5. Color identificador del proyecto */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 flex flex-col items-center text-center gap-3 transition-colors hover:border-slate-300">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-slate-700">
              <span className="flex items-center justify-center size-5 rounded-md bg-white border border-slate-200 shadow-2xs text-slate-600">
                <svg
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </span>
              <span className="text-[13px] font-semibold tracking-tight text-slate-800">
                Color de identificación
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Elige un color para identificar este proyecto y sus tareas tanto en el calendario como en el módulo de gestión de tareas y proyectos.
            </p>
          </div>

          <div className="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <SelectColor
              className="justify-center"
              onChange={(colorId: string) =>
                setValue("color", colorId, { shouldValidate: true })
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}
