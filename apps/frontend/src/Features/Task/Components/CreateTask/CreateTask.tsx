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
import { CreateTaskSchema } from "@repo/schemas";
import { useZodForm } from "../../../../Hooks/useZodForm";
import useCreateTask from "../../Hooks/useCreateTask";
import CreateCategory from "../Category/CreateCategory";
import useModal from "../../../../Hooks/useModal";
import type { CreateTaskProps } from "../../Types/types";
import useCategory from "../../Hooks/useCategory";
import useHandleDate from "../../Hooks/useHandleDate";
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
  CheckIcon,
  CloseIcon,
  ClockIcon,
  BellIcon,
} from "../../../../Components/Icons";

export default function CreateTask({
  onSuccess,
  close,
  className = "",
  showButtons = true,
}: CreateTaskProps) {
  const { HandleSubmit } = useCreateTask();
  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset, watch, setValue } = useAppForm({
    schema: CreateTaskSchema,
  });
  const { openModal, closeModal, isOpen } = useModal();
  const { GetAllCategories, categories, UpdateCategories } = useCategory({ closeModal });

  const selectedPriority = watch("priority") || "MEDIUM";
  const descriptionValue = watch("description") || "";
  const dateInitValue = watch("dateInit") || "";
  const dateFinishValue = watch("dateFinish") || "";

  const {
    datePreset,
    handleSelectToday,
    handleSelectTomorrow,
    handleSelectCustom,
    handleCustomDateChange,
    todayString,
    tomorrowString,
  } = useHandleDate({
    setValue,
    dateInitValue,
    dateFinishValue,
  });

  useEffect(() => {
    GetAllCategories();
  }, []);

  const categoriesOptions = categories.map((c) => ({
    id: c._id,
    value: c._id,
    label: c.nameCategory,
  }));

  return (
    <div className={`flex flex-col w-full h-full overflow-hidden ${className}`}>
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Nueva Tarea
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Planificación y seguimiento
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="size-5" />
        </button>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <form
          id="CreateTask"
          onSubmit={handleSubmit(async (data) => {
            await HandleSubmit(data as any);
            reset();
            onSuccess?.();
          })}
          className="mx-auto flex max-w-2xl flex-col gap-4"
        >
          {/* Banner Contextual */}
          <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <Badge
                title="Planificación diaria"
                variant="black"
                icon={<CalendarIcon className="size-3.5" />}
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Detalles de la Tarea
              </h2>
              <p className="text-xs text-slate-500">
                Define los detalles, plazos y categorización de tu actividad.
              </p>
            </div>
          </div>

          {/* Campo Nombre (Componente Reutilizable Input) */}
          <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
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
          <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
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
          <div className="flex flex-col gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
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
                  error={(errors?.dateInit?.message || errors?.dateFinish?.message) as string}
                />
              </div>
            )}
          </div>

          {/* Nivel de Prioridad (Componente Reutilizable PrioritySelector) */}
          <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
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
                onChange={() => setValue("priority", "LOW", { shouldValidate: true })}
                icon={<ArrowDownIcon className="size-4" />}
              />

              <PrioritySelector
                title="Media"
                description="Estándar"
                variant="medium"
                isSelected={selectedPriority === "MEDIUM"}
                onChange={() => setValue("priority", "MEDIUM", { shouldValidate: true })}
                icon={<MinusIcon className="size-4" />}
              />

              <PrioritySelector
                title="Alta"
                description="Urgente"
                variant="high"
                isSelected={selectedPriority === "HIGH"}
                onChange={() => setValue("priority", "HIGH", { shouldValidate: true })}
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
          <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
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
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <BellIcon className="size-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-800">
                  Estado inicial: Pendiente
                </span>
                <span className="text-[11px] text-slate-500">
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

      {/* Sticky Bottom Actions Footer (Componente Reutilizable Button) */}
      {showButtons && (
        <footer className="sticky bottom-0 z-20 border-t border-slate-200/80 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl flex-col gap-2.5">
            {/* Botón Principal Guardar */}
            <Button
              typeBtn="submit"
              formId="CreateTask"
              variant="primary"
              size="lg"
              fullWidth={true}
              labelBtn="Guardar tarea"
              icon={<CheckIcon className="size-4" />}
            />

            {/* Botón Descartar */}
            <Button
              typeBtn="button"
              variant="ghost"
              size="sm"
              fullWidth={true}
              onClick={close}
              labelBtn="Descartar"
              icon={<CloseIcon className="size-3.5" />}
            />
          </div>
        </footer>
      )}

      {/* Modal de Crear Categoría */}
      {isOpen && (
        <Modal
          typeBtnConfirm="submit"
          width="medium"
          modalTitle="Crear Categoría"
          contentModal={<CreateCategory />}
          closeModal={() => UpdateCategories()}
        />
      )}
    </div>
  );
}


