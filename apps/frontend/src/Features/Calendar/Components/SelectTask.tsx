import { useEffect } from "react";
import Modal from "../../../Components/Modal/Modal";
import type { SelectTaskProps } from "../Hooks/useSelectTask";
import CreateTask from "../../Task/Components/CreateTask/CreateTask";

import ExistingTaskList from "./ExistingTaskList";
import useSelectTask from "../Hooks/useSelectTask";

export default function SelectTask({
  onCloseParent,
  selectedDate,
  onTaskSelected,
  onTasksSelected,
}: SelectTaskProps) {
  const {
    isOpenCreateTask,
    openCreateTaskModal,
    closeCreateTaskModal,
    isOpenExistingTask,
    openExistingTaskModal,
    closeExistingTaskModal,
    existingTasks,
    searchTerm,
    setSearchTerm,
    isLoading,
    errorMessage,
    loadExistingTasks,
    handleTasksSelect,
  } = useSelectTask({
    onCloseParent,
    selectedDate,
    onTaskSelected,
    onTasksSelected,
  });

  useEffect(() => {
    if (!isOpenExistingTask) return;

    void loadExistingTasks();
  }, [isOpenExistingTask]);

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="text-center sm:text-left">
        <h3 className="text-base font-semibold text-zinc-900">
          ¿Qué deseas realizar?
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          {selectedDate
            ? `Selecciona una opción para el día ${selectedDate}`
            : "Selecciona una opción para continuar"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Opción 1: Elegir tarea existente */}
        <div
          onClick={openExistingTaskModal}
          role="button"
          tabIndex={0}
          className="group relative flex flex-col justify-between rounded-2xl border-2 border-zinc-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              Existente
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700">
              Elegir tarea existente
            </h4>
            <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
              Explora y selecciona una tarea ya creada en el sistema para
              asignarla.
            </p>
          </div>

          <div className="mt-5 flex items-center text-xs font-medium text-emerald-600">
            <span>Seleccionar tarea</span>
            <svg
              className="ml-1.5 size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Opción 2: Crear una nueva tarea */}
        <div
          onClick={openCreateTaskModal}
          role="button"
          tabIndex={0}
          className="group relative flex flex-col justify-between rounded-2xl border-2 border-zinc-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              Nueva
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-base font-bold text-zinc-900 group-hover:text-indigo-700">
              Crear nueva tarea
            </h4>
            <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
              Abre el formulario completo para registrar una nueva tarea desde
              cero.
            </p>
          </div>

          <div className="mt-5 flex items-center text-xs font-medium text-indigo-600">
            <span>Crear desde cero</span>
            <svg
              className="ml-1.5 size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal para Crear Nueva Tarea (sin confirm ni cancel) */}
      {isOpenCreateTask && (
        <Modal
          width="medium"
          modalTitle="Nueva Tarea"
          typeBtnConfirm="submit"
          labelConfirm="Crear nueva tarea"
          labelCancel="Cancelar"
          formId="CreateTask"
          Confirm={() => console.log("")}
          Cancel={onCloseParent}
          closeModal={closeCreateTaskModal}
          contentModal={
            <CreateTask
              showButtons={false}
              onSuccess={() => {
                closeCreateTaskModal();
                onCloseParent?.();
              }}
            />
          }
        />
      )}

      {/* Modal de Maquetación: Elegir Tarea Existente (sin confirm ni cancel) */}
      {isOpenExistingTask && (
        <Modal
          width="medium"
          modalTitle="Elegir Tarea Existente"
          typeBtnConfirm="button"
          closeModal={closeExistingTaskModal}
          contentModal={
            <ExistingTaskList
              tasks={existingTasks}
              selectedDate={selectedDate || ""}
              searchTerm={searchTerm}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onSearchChange={setSearchTerm}
              onTasksSelect={handleTasksSelect}
            />
          }
        />
      )}
    </div>
  );
}
