import { useEffect } from "react";
import Modal from "../../../../Components/Modal/Modal";
import FieldMessageError from "../../../../Components/Common/FieldMessage";
import Badge from "../../../../Components/Common/Badge";
import PrioritySelector from "../../../../Components/Common/PrioritySelector";
import Button from "../../../../Components/Ui/Button";
import Input from "../../../../Components/Ui/Input";
import InputDate from "../../../../Components/Ui/InputDate";
import Select from "../../../../Components/Ui/Select";
import TextArea from "../../../../Components/Ui/TextArea";
import { useCreateTaskForm } from "./useCreateTaskForm";
import Category from "../../../Category/Components/Category";
import type { CreateTaskProps } from "../../Types/types";
import {
  CalendarIcon,
  PencilIcon,
  SunIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  MinusIcon,
  FlameIcon,
  TagIcon,
  PlusIcon,
  ClockIcon,
  BellIcon,
} from "../../../../Components/Icons";

export default function CreateTask({ onSuccess }: CreateTaskProps) {
  const {
    register,
    errors,
    handleSubmit,
    handleSaveTask,
    setValue,
    openModal,
    isOpen,
    UpdateCategories,
    categoriesOptions,
    selectedPriority,
    descriptionValue,
    dateInitValue,
    datePreset,
    handleSelectToday,
    handleSelectTomorrow,
    handleSelectCustom,
    handleCustomDateChange,
    todayString,
    tomorrowString,
  } = useCreateTaskForm({ onSuccess });

  return (
    <div>
      {/* Main Form Content */}
      <div className="">
        <form
          id="CreateTask"
          onSubmit={handleSubmit(handleSaveTask)}
          className="mx-auto flex max-w-2xl flex-col gap-6"
        >
          {/* Banner Contextual */}
          <div className="flex flex-col gap-3 rounded-[24px] border border-zinc-200/60 bg-gradient-to-br from-zinc-50/80 via-white to-zinc-50/40 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <Badge
                title="Planificación diaria"
                variant="black"
                icon={<CalendarIcon className="size-3.5" />}
              />
            </div>
            <div>
              <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900">
                Detalles de la Tarea
              </h2>
              <p className="text-[14px] leading-relaxed text-zinc-500 mt-1">
                Define los detalles, plazos y categorización de tu actividad.
              </p>
            </div>
          </div>

          {/* Campo Nombre (Componente Reutilizable Input) */}
          <div className="flex flex-col rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Input
              name="name"
              register={register}
              label="Nombre de la tarea"
              showLabel={true}
              required={true}
              placeholder="Ej. Rediseñar flujo de onboarding"
              error={errors?.name?.message as string}
              icon={<PencilIcon className="size-4" />}
            />
          </div>

          {/* Campo Descripción (Componente Reutilizable TextArea y Buttons) */}
          <div className="flex flex-col rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <TextArea
              name="description"
              register={register}
              label="Descripción"
              showLabel={true}
              badge="Opcional"
              rows={3}
              maxLength={500}
              showCounter={true}
              currentLength={descriptionValue.length}
              placeholder="Añade notas, enlaces de referencia o detalles clave..."
              error={errors?.description?.message as string}
            />
          </div>

          {/* Fechas (Planificación temporal con Badges de Fechas Rápidas e Inputs Condicionales) */}
          <div className="flex flex-col gap-4 rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Planificación temporal
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <ClockIcon className="size-3.5" />
                <span>Fechas rápidas</span>
              </div>
            </div>

            {/* Badges de acceso rápido (Más grandes) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge
                title="Hoy"
                size="md"
                variant="black"
                isActive={datePreset === "today"}
                onClick={handleSelectToday}
                icon={<SunIcon className="size-4" />}
              />

              <Badge
                title="Mañana"
                size="md"
                variant="black"
                isActive={datePreset === "tomorrow"}
                onClick={handleSelectTomorrow}
                icon={<ArrowRightIcon className="size-4" />}
              />

              <Badge
                title="Personalizado"
                size="md"
                variant="black"
                isActive={datePreset === "custom"}
                onClick={handleSelectCustom}
                icon={<CalendarIcon className="size-4" />}
              />
            </div>

            {/* Resumen informativo cuando Hoy o Mañana están seleccionados */}
            {datePreset !== "custom" && (
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-600">
                <span className="flex size-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-medium">
                  {datePreset === "today"
                    ? `Fecha configurada para hoy: ${dateInitValue || todayString}`
                    : `Fecha configurada para mañana: ${dateInitValue || tomorrowString}`}
                </span>
              </div>
            )}

            {/* Input para ajuste manual: Solo visible si Personalizado está activo (un solo campo de fecha) */}
            {datePreset === "custom" && (
              <div className="pt-1">
                <InputDate
                  name="dateCustom"
                  value={dateInitValue}
                  onChange={handleCustomDateChange}
                  label="Fecha de la tarea"
                  showLabel={true}
                  required={true}
                  dateType="init"
                  error={
                    (errors?.dateInit?.message ||
                      errors?.dateFinish?.message) as string
                  }
                />
              </div>
            )}
          </div>

          {/* Nivel de Prioridad (Componente Reutilizable PrioritySelector) */}
          <div className="flex flex-col rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <label className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                  Nivel de prioridad
                </label>
              </div>
              <span
                className={`text-xs font-bold ${
                  selectedPriority === "HIGH"
                    ? "text-rose-600"
                    : selectedPriority === "LOW"
                      ? "text-emerald-600"
                      : "text-amber-600"
                }`}
              >
                {selectedPriority === "HIGH"
                  ? "Alta seleccionada"
                  : selectedPriority === "LOW"
                    ? "Baja seleccionada"
                    : "Media seleccionada"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <PrioritySelector
                title="Baja"
                description="Flexible"
                variant="low"
                isSelected={selectedPriority === "LOW"}
                onChange={() =>
                  setValue("priority", "LOW", { shouldValidate: true })
                }
                icon={<ArrowDownIcon className="size-4" />}
              />

              <PrioritySelector
                title="Media"
                description="Estándar"
                variant="medium"
                isSelected={selectedPriority === "MEDIUM"}
                onChange={() =>
                  setValue("priority", "MEDIUM", { shouldValidate: true })
                }
                icon={<MinusIcon className="size-4" />}
              />

              <PrioritySelector
                title="Alta"
                description="Urgente"
                variant="high"
                isSelected={selectedPriority === "HIGH"}
                onChange={() =>
                  setValue("priority", "HIGH", { shouldValidate: true })
                }
                icon={<FlameIcon className="size-4" />}
              />
            </div>

            {errors?.priority && (
              <div className="mt-1">
                <FieldMessageError message={errors.priority.message} />
              </div>
            )}
          </div>

          {/* Categoría y Acción Rápida (Componente Reutilizable Select y Button) */}
          <div className="flex flex-col rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Select
                  name="categoryId"
                  register={register}
                  label="Categoría"
                  required={true}
                  placeholder="Selecciona una categoría"
                  objectValues={categoriesOptions}
                  error={errors?.categoryId?.message as string}
                  icon={<TagIcon className="size-4 text-indigo-600" />}
                />
              </div>

              <div className="mb-0.5">
                <Button
                  typeBtn="button"
                  variant="secondary"
                  size="md"
                  onClick={() => openModal()}
                  labelBtn="Nueva"
                  icon={<PlusIcon className="size-4 text-zinc-700" />}
                />
              </div>
            </div>
          </div>

          {/* Estado / Recordatorio informativo */}
          <div className="flex items-center justify-between rounded-[24px] border border-zinc-100/80 bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-[14px] bg-amber-50 text-amber-600">
                <BellIcon className="size-5.5" />
              </div>
              <div>
                <span className="block text-[15px] font-semibold tracking-tight text-zinc-900">
                  Estado inicial: Pendiente
                </span>
                <span className="text-[13px] text-zinc-500 mt-0.5 block">
                  La tarea iniciará en estado activo por defecto
                </span>
              </div>
            </div>
            <Badge
              title="Pendiente"
              variant="warning"
              icon={<span className="size-1.5 rounded-full bg-amber-500" />}
            />
          </div>
        </form>
      </div>

      {/* Modal de Crear Categoría */}
      {isOpen && (
        <Modal
          typeBtnConfirm="submit"
          width="large"
          modalTitle="Administrar Categorías"
          contentModal={<Category />}
          closeModal={() => UpdateCategories()}
        />
      )}
    </div>
  );
}
