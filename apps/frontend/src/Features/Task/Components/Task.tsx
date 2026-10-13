import CreateTask from "./CreateTask/CreateTask";
import TaskCard from "./TaskCard";
import Empty from "../../../Components/Common/Empty";
import Toast from "../../../Components/Toast/Toast";
import ConfirmAction from "../../../Components/Modal/ConfirmAction";
import useTaskActions from "../Hooks/useTaskActions";
import EditTaskModal from "./EditTaskModal";
import useEditTask from "../Hooks/useEditTask";
import useShowToast from "../../../Hooks/useShowToast";
import PriorityQuickFilter from "./PriorityQuickFilter";
import TaskFilters from "./TaskFilters";
import FilterBadge from "../../../Components/Ui/FilterBadge";
import Input from "../../../Components/Ui/Input";
import { SearchIcon } from "../../../Components/Icons";
import Modal from "../../../Components/Modal/Modal";
import useTask from "../Hooks/useTask";
import useModal from "../../../Hooks/useModal";
export default function Task() {
  const { search, setSearch, Tasks, activeFilter, setActiveFilter } = useTask();

  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: showSuccessToast,
    showToast: openSuccessToast,
    closeToast: closeSuccessToast,
  } = useShowToast();

  const {
    filteredTask,
    selectedTask,
    showDelete,
    showDeleteToast,
    closeDeleteToast,
    closeDeleteModal,
    handleDelete,
    confirmDeleteTask,
  } = useTaskActions(Tasks ?? []);

  const {
    selectedTask: selectedEditTask,
    showEditToast,
    closeEditToast,
    selectTaskToEdit,
    updatedTask,
  } = useEditTask({
    tasks: Tasks ?? [],
    closeModal: closeEditModal,
  });

  const handleTaskSuccess = () => {
    closeCreateModal();
    openSuccessToast();
  };

  return (
    <div className=" w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10 space-y-8 font-sans">
      {/* Main Content (Sidebar + List) */}
      <div className=" rounded-xl  flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar (30%) */}
        <aside className="w-full lg:w-[30%] shrink-0 flex flex-col gap-6">
          <TaskFilters />
          <PriorityQuickFilter />
        </aside>

        <div className="w-full lg:w-[70%] space-y-6">
          {/* Bulk Action Bar */}

          {/* Quick Filters Bar & Search */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 sm:px-4 sm:py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto [&::-webkit-scrollbar]:hidden">
              <FilterBadge
                label="Todas"
                isActive={activeFilter === "Todas"}
                onClick={() => setActiveFilter("Todas")}
                count={Tasks.length}
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
                icon={<SearchIcon className="size-4 text-zinc-400" />}
              />
            </div>
          </div>

          {(Tasks ?? []).length === 0 ? (
            <Empty onCreate={openCreateModal} />
          ) : (
            <section aria-label="Listado de tareas" className="w-full">
              {filteredTask.length !== Tasks.length && (
                <div className="pb-2 mb-3">
                  <span className="text-[13px] text-zinc-400 font-medium">
                    Mostrando {filteredTask.length} de {Tasks.length} tareas en
                    total
                  </span>
                </div>
              )}

              {filteredTask.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[720px] overflow-y-auto pr-2 items-start [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
                  {filteredTask.map((task) => (
                    <div key={task._id} className="flex flex-col py-0.5">
                      <TaskCard
                        id={task._id}
                        name={task.name}
                        description={task.description}
                        category={task.categoryId?.nameCategory}
                        dateInit={task.dateInit}
                        dateFinish={task.dateFinish}
                        priority={task.priority}
                        onDelete={() => handleDelete(task._id)}
                        onEdit={() => {
                          selectTaskToEdit(task._id);
                          openEditModal();
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white/60 py-8">
                  <Empty
                    title="No se encontraron tareas"
                    description="Prueba con otro nombre o cambia los filtros."
                    onCreate={openCreateModal}
                  />
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {isCreateOpen && (
        <Modal
          width="low"
          labelConfirm="Crear tarea"
          labelCancel="Cancelar"
          Confirm={() => console.log("")}
          Cancel={closeCreateModal}
          closeModal={closeCreateModal}
          modalTitle="Crear tarea"
          formId="CreateTask"
          contentModal={<CreateTask onSuccess={handleTaskSuccess} />}
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
            <EditTaskModal task={selectedEditTask} onSave={updatedTask} />
          }
          typeBtnConfirm="submit"
        />
      )}

      <div className="fixed right-6 top-6 z-50 w-full max-w-sm pointer-events-none">
        <div className="pointer-events-auto">
          <Toast
            titleToast="Se ha creado una nueva tarea"
            typeToast="success"
            isOpen={showSuccessToast}
            onClose={closeSuccessToast}
          />
        </div>
      </div>

      {showEditToast && (
        <div className="fixed right-6 top-5 z-50 w-full max-w-sm pointer-events-none">
          <div className="pointer-events-auto">
            <Toast
              titleToast="La tarea se ha actualizado correctamente"
              typeToast="success"
              isOpen={showEditToast}
              onClose={closeEditToast}
            />
          </div>
        </div>
      )}

      {showDeleteToast && (
        <div className="fixed right-6 top-5 z-50 w-full max-w-sm pointer-events-none">
          <div className="pointer-events-auto">
            <Toast
              titleToast="La tarea se ha eliminado correctamente"
              typeToast="warning"
              isOpen={showDeleteToast}
              onClose={closeDeleteToast}
            />
          </div>
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
