import { useEffect, useMemo, useState } from "react";
import CreateTask from "./CreateTask/CreateTask";
import TaskCard from "./TaskCard";
import Empty from "../../../Components/Common/Empty";

import Toast from "../../../Components/Toast/Toast";
import ConfirmAction from "../../../Components/Modal/ConfirmAction";
import useTaskActions from "../Hooks/useTaskActions";
import EditTaskModal from "./EditTaskModal";
import useEditTask from "../Hooks/useEditTask";
import useModal from "../../../Hooks/useModal";
import useShowToast from "../../../Hooks/useShowToast";
import { getAllTasks } from "../Services/task.service";

import PriorityQuickFilter from "./PriorityQuickFilter";
import Button from "../../../Components/Ui/Button";
import FilterBadge from "../../../Components/Ui/FilterBadge";
import Input from "../../../Components/Ui/Input";
import Modal from "../../../Components/Modal/Modal";
import type { TaskResponseType } from "@repo/schemas";
export default function Task() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<TaskResponseType[]>([]);
  const [activeFilter, setActiveFilter] = useState("Todas");

  useEffect(() => {
    async function GetAllCategories() {
      try {
        const get = await getAllTasks();
        setTasks(get);
      } catch (error) {
        console.log("Error al obtener categorias", error);
      }
    }

    GetAllCategories();
  }, []);

  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    filteredTask,
    register,
    selectedTask,
    showDelete,
    showDeleteToast,
    closeDeleteToast,
    closeDeleteModal,
    refreshTasks,
    toggleTaskSelection,
    clearTaskSelection,
    tasksToDelete,
    handleBulkDelete,
    handleDelete,
    confirmDeleteTask,
    confirmDeleteBulk,
  } = useTaskActions(tasks as any, setTasks as any);

  const {
    selectedTask: selectedEditTask,
    showEditToast,
    closeEditToast,
    selectTaskToEdit,
    updateTask,
  } = useEditTask({
    tasks: tasks as any,
    setTasks: setTasks as any,
    closeModal,
  });

  //Llama al hook de eliminar, destructurando las funciones y pasando parametros necesarios, como el objeto de tasks y la funcion setteadora

  //llama al hook useShowTask
  const {
    isOpen: showSuccessToast,
    showToast: showTaskCreatedToast,
    closeToast: closeSuccessToast,
  } = useShowToast();

  const handleTaskSuccess = () => {
    refreshTasks();
    closeModal();
    showTaskCreatedToast();
  };

  //Filtra por campo, o selector de categoria y prioridad, memorizando los items y si no hay cambios no re calcula,y debe cumplir todas sino por defecto
  //muestra todas las tareas

  //Carga las categorias, memorizando las categorias si no hay alguna nueva

  console.log("Tareas cargadas", tasks);
  const categoryParsed = useMemo(() => {
    return tasks.map((item) => ({
      label: item.categoryId.nameCategory,
      value: item.categoryId.nameCategory,
    }));
  }, [tasks]);

  return (
    <div className=" w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10 space-y-8 font-sans">
      {/* Main Content (Sidebar + List) */}
      <div className=" rounded-xl  flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar (30%) */}
        <aside className="w-full lg:w-[30%] shrink-0 flex flex-col gap-6">
          <PriorityQuickFilter />
        </aside>

        <div className="w-full lg:w-[70%] space-y-6">
          {/* Bulk Action Bar */}
          {tasksToDelete.length > 0 && (
            <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-[24px] p-4 shadow-xl">
              <span className="text-zinc-900 font-semibold tracking-tight text-[15px] pl-2">
                {tasksToDelete.length}{" "}
                {tasksToDelete.length === 1
                  ? "tarea seleccionada"
                  : "tareas seleccionadas"}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearTaskSelection}
                  className="px-4 py-2 text-[14px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#FF3B30] text-white text-[14px] font-semibold rounded-full hover:bg-red-500 transition-colors shadow-[0_4px_14px_rgba(255,59,48,0.3)]"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          )}

          {/* Quick Filters Bar & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto [&::-webkit-scrollbar]:hidden">
              <FilterBadge
                label="Todas"
                isActive={activeFilter === "Todas"}
                onClick={() => setActiveFilter("Todas")}
                count={tasks.length}
                colorTheme="slate"
              />
              <FilterBadge
                label="Pendiente"
                isActive={activeFilter === "Pendiente"}
                onClick={() => setActiveFilter("Pendiente")}
                colorTheme="amber"
              />
              <FilterBadge
                label="Asignada"
                isActive={activeFilter === "Asignada"}
                onClick={() => setActiveFilter("Asignada")}
                colorTheme="blue"
              />
              <FilterBadge
                label="Completada"
                isActive={activeFilter === "Completada"}
                onClick={() => setActiveFilter("Completada")}
                colorTheme="emerald"
              />
            </div>

            <div className="w-full sm:w-72 shrink-0">
              <Input
                name="searchTasks"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={
                  <svg
                    className="size-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Tasks list */}
          {tasks.length === 0 ? (
            <Empty onCreate={openModal} />
          ) : (
            <section
              aria-label="Listado de tareas"
              className="rounded-[28px] bg-white p-4 sm:p-5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-black/[0.04]"
            >
              {filteredTask.length !== tasks.length && (
                <div className="px-2 pb-2 mb-2 border-b border-zinc-100/80">
                  <span className="text-[13px] text-zinc-400 font-medium">
                    Mostrando {filteredTask.length} de {tasks.length} tareas en
                    total
                  </span>
                </div>
              )}

              {filteredTask.length > 0 ? (
                <div className="flex flex-col max-h-[520px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300 divide-y divide-zinc-100/80">
                  {filteredTask.map((task) => (
                    <TaskCard
                      onClick={(id) => toggleTaskSelection(id)}
                      key={task._id}
                      id={task._id}
                      name={task.name}
                      description={task.description}
                      category={task.categoryId?.nameCategory}
                      dateInit={task.dateInit}
                      dateFinish={task.dateFinish}
                      priority={task.priority}
                      isSelected={tasksToDelete.includes(task._id)}
                      onDelete={() => handleDelete(task._id)}
                      onEdit={() => {
                        selectTaskToEdit(task._id);
                        openEditModal();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white/60 py-8">
                  <Empty
                    title="No se encontraron tareas"
                    description="Prueba con otro nombre o cambia los filtros."
                    onCreate={openModal}
                  />
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {isOpen && (
        <Modal
          width="low"
          labelConfirm="Crear tarea"
          labelCancel="Cancelar"
          Confirm={() => console.log("")}
          Cancel={closeModal}
          closeModal={closeModal}
          modalTitle="Crear tarea"
          formId="CreateTask"
          contentModal={
            <CreateTask onSuccess={handleTaskSuccess} showButtons={true} />
          }
          typeBtnConfirm="submit"
        />
      )}

      {isEditOpen && selectedEditTask && (
        <Modal
          width="low"
          labelConfirm="Editar tarea"
          labelCancel="Cancelar"
          Confirm={() => console.log("")}
          Cancel={closeEditModal}
          closeModal={closeEditModal}
          modalTitle="Editar tarea"
          formId="edit-task-form"
          contentModal={
            <EditTaskModal task={selectedEditTask} onSave={updateTask} />
          }
          typeBtnConfirm="submit"
        />
      )}

      {!isOpen && (
        <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
          <Toast
            titleToast="Se ha creado una nueva tarea"
            typeToast="success"
            isOpen={showSuccessToast}
            onClose={closeSuccessToast}
          />
        </div>
      )}

      {!isOpen && showEditToast && (
        <div className="fixed right-6 top-5 z-50 w-full max-w-sm">
          <Toast
            titleToast="La tarea se ha actualizado correctamente"
            typeToast="success"
            isOpen={showEditToast}
            onClose={closeEditToast}
          />
        </div>
      )}

      {!isOpen && showDeleteToast && (
        <div className="fixed right-6 top-5 z-50 w-full max-w-sm">
          <Toast
            titleToast="La tarea se ha eliminado correctamente"
            typeToast="warning"
            isOpen={showDeleteToast}
            onClose={closeDeleteToast}
          />
        </div>
      )}

      {showDelete && selectedTask.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-all duration-300">
          <ConfirmAction
            title={
              selectedTask.length > 1
                ? "¿Eliminar tareas seleccionadas?"
                : "¿Eliminar tarea?"
            }
            description={
              selectedTask.length > 1
                ? `¿Seguro que deseas eliminar estas ${selectedTask.length} tareas?`
                : `¿Seguro que deseas eliminar la tarea "${selectedTask[0]?.name}"?`
            }
            typeModal="danger"
            onCancel={closeDeleteModal}
            onDelete={() => {
              if (selectedTask.length > 1) {
                confirmDeleteBulk();
              } else {
                confirmDeleteTask(selectedTask[0]._id);
              }
            }}
            icon={
              <svg
                className="size-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          >
            {selectedTask.length > 1 && (
              <div className="bg-black/5 rounded-[12px] p-3 border border-black/5">
                <ul className="flex flex-col divide-y divide-black/5">
                  {selectedTask.map((t) => (
                    <li
                      key={t._id}
                      className="flex justify-between items-center py-2 first:pt-0 last:pb-0"
                    >
                      <span className="font-medium text-[13px] text-black/80 truncate mr-2">
                        {t.name}
                      </span>
                      <span className="text-[11px] font-medium text-black/60 bg-black/5 px-2 py-0.5 rounded-full shrink-0">
                        {t.categoryId?.nameCategory || "Sin categoría"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ConfirmAction>
        </div>
      )}
    </div>
  );
}
