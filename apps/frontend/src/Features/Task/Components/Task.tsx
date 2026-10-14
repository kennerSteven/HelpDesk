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
import Modal from "../../../Components/Modal/Modal";
import useTask from "../Hooks/useTask";
import useModal from "../../../Hooks/useModal";
import ProjectTasksContainer from "../../Projects/Components/ProjectTasksContainer";
export default function Task() {
  const { search, setSearch, Tasks, activeFilter, setActiveFilter, Projects } =
    useTask();

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

  console.log(Projects);
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
    <div className="w-full max-w-[1700px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 font-sans">
      {/* Main Content (3 Secciones: Filtros -> Proyectos -> Tareas Normales) */}
      <div className="rounded-xl flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* 1. Barra de Filtros (Sidebar) */}
        <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-6">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            totalTasks={Tasks.length}
          />
          <PriorityQuickFilter />
        </aside>

        {/* 2. Componentes de Proyectos (al lado derecho de la barra de filtros) */}
        <div className="w-full xl:w-[420px] 2xl:w-[460px] shrink-0 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                Proyectos
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {Projects?.length || 0}
              </span>
            </div>
          </div>

          {!Projects || Projects.length === 0 ? (
            <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-semibold text-slate-700">
                  No hay proyectos creados
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Crea tu primer proyecto desde el botón "+ Nuevo" en los
                  filtros para agrupar tareas.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4  overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {Projects.map((project: any) => (
                <ProjectTasksContainer
                  key={project._id || project.id}
                  project={project}
                  onDeleteTask={handleDelete}
                  onEditTask={(id) => {
                    selectTaskToEdit(id);
                    openEditModal();
                  }}
                  onAddTask={() => openCreateModal()}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. Tareas Normales (a la derecha del componente de proyectos) */}
        <div className="w-full flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                Tareas Generales
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {filteredTask.length}
              </span>
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
                <div className="grid grid-cols gap-2 overflow-y-auto pr-2 items-start [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
                  {filteredTask.map((task) => (
                    <div key={task._id} className="flex flex-col py-0.5">
                      <TaskCard
                        id={task._id}
                        name={task.name}
                        description={task.description}
                        category={task.categoryId?.nameCategory}
                        status={task.status}
                        steps={task.steps}
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

      <Toast
        titleToast="Se ha creado una nueva tarea"
        typeToast="success"
        isOpen={showSuccessToast}
        onClose={closeSuccessToast}
      />

      {showEditToast && (
        <Toast
          titleToast="La tarea se ha actualizado correctamente"
          typeToast="success"
          isOpen={showEditToast}
          onClose={closeEditToast}
        />
      )}

      {showDeleteToast && (
        <Toast
          titleToast="La tarea se ha eliminado correctamente"
          typeToast="warning"
          isOpen={showDeleteToast}
          onClose={closeDeleteToast}
        />
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
