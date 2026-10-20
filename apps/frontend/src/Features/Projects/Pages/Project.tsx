import ProjectFilters from "../Components/ProjectFilters";
import PriorityQuickFilter from "../Components/PriorityQuickFilter";
import ProjectTasksContainer from "../Components/ProjectTasksContainer";
import useProjects from "../Hooks/useProjects";
import useModal from "../../../Hooks/useModal";
import useShowToast from "../../../Hooks/useShowToast";
import Modal from "../../../Components/Modal/Modal";
import Toast from "../../../Components/Toast/Toast";
import CreateTask from "../../Task/Components/CreateTask/CreateTask";
import EditTaskModal from "../../Task/Components/EditTaskModal";
import useEditTask from "../../Task/Hooks/useEditTask";
import useTaskActions from "../../Task/Hooks/useTaskActions";
import useTask from "../../Task/Hooks/useTask";
import { useMemo, useState } from "react";

export default function ProjectPage() {
  const { search, setSearch, activeFilter, setActiveFilter, filteredProjects } =
    useProjects();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { Tasks = [] } = useTask();

  // Consolidar todas las tareas conocidas (globales y dentro de proyectos)
  const allTasks = useMemo(() => {
    const map = new Map<string, any>();
    (Tasks || []).forEach((t: any) => {
      const tid = t._id || t.id;
      if (tid) map.set(tid, t);
    });
    (filteredProjects || []).forEach((p: any) => {
      (p.tasks || []).forEach((t: any) => {
        const tid = t._id || t.id;
        if (tid && !map.has(tid)) map.set(tid, t);
      });
    });
    return Array.from(map.values());
  }, [Tasks, filteredProjects]);

  const {
    isOpen: isCreateTaskOpen,
    openModal: openCreateTaskModal,
    closeModal: closeCreateTaskModal,
  } = useModal();

  const {
    isOpen: isEditTaskOpen,
    openModal: openEditTaskModal,
    closeModal: closeEditTaskModal,
  } = useModal();

  const {
    isOpen: showTaskSuccessToast,
    showToast: openTaskSuccessToast,
    closeToast: closeTaskSuccessToast,
  } = useShowToast();

  const {
    handleDelete,
    showDelete,
    closeDeleteModal,
    selectedTask: selectedTaskDelete,
    confirmDeleteTask,
    showDeleteToast,
    closeDeleteToast,
  } = useTaskActions(allTasks);

  const {
    selectedTask: selectedEditTask,
    selectTaskToEdit,
    updatedTask,
  } = useEditTask({
    tasks: allTasks,
    closeModal: closeEditTaskModal,
  });

  const handleTaskSuccess = () => {
    closeCreateTaskModal();
    openTaskSuccessToast();
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8 font-sans">
      {/* Main Content (Sidebar de Filtros + Grid de Proyectos) */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* 1. Barra de Filtros (Sidebar) */}
        <aside className="flex flex-col gap-6 w-full xl:w-[280px] shrink-0">
          <ProjectFilters
            search={search}
            onSearchChange={setSearch}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            totalTasks={Tasks.length}
          />
          <PriorityQuickFilter />
        </aside>

        {/* 2. Sección de Proyectos (2 por fila) */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                Proyectos
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {filteredProjects?.length || 0}
              </span>
            </div>
          </div>

          {!filteredProjects || filteredProjects.length === 0 ? (
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
                  No hay proyectos encontrados
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Crea tu primer proyecto desde el botón superior o en los
                  filtros para agrupar tareas.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
              {filteredProjects.map((project: any) => (
                <ProjectTasksContainer
                  key={project._id || project.id}
                  project={project}
                  onDeleteTask={handleDelete}
                  onEditTask={(id) => {
                    selectTaskToEdit(id);
                    openEditTaskModal();
                  }}
                  onAddTask={(id, nameProject) => {
                    openCreateTaskModal();
                    setName(nameProject);
                    setId(id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para Crear Tarea */}
      {isCreateTaskOpen && (
        <Modal
          width="low"
          labelConfirm="Crear tarea"
          labelCancel="Cancelar"
          Confirm={() => {}}
          Cancel={closeCreateTaskModal}
          closeModal={closeCreateTaskModal}
          modalTitle={`Crear tarea para el proyecto ${name} con id : ${id}`}
          formId="CreateTask"
          contentModal={
            <CreateTask projectId={id} onSuccess={handleTaskSuccess} />
          }
          typeBtnConfirm="submit"
        />
      )}

      {/* Modal para Editar Tarea */}
      {isEditTaskOpen && selectedEditTask && (
        <Modal
          width="low"
          labelConfirm="Editar tarea"
          labelCancel="Cancelar"
          Confirm={() => {}}
          Cancel={closeEditTaskModal}
          closeModal={closeEditTaskModal}
          modalTitle="Editar tarea"
          formId="edit-task-form"
          contentModal={
            <EditTaskModal task={selectedEditTask} onSave={updatedTask} />
          }
          typeBtnConfirm="submit"
        />
      )}

      {/* Modal para Confirmar Eliminación de Tarea */}
      {showDelete && selectedTaskDelete && selectedTaskDelete.length > 0 && (
        <Modal
          width="low"
          labelConfirm="Eliminar"
          labelCancel="Cancelar"
          Confirm={() => {
            const taskToDelete = selectedTaskDelete[0];
            const targetId = taskToDelete._id || (taskToDelete as any).id;
            if (targetId) {
              confirmDeleteTask(targetId);
            }
          }}
          Cancel={closeDeleteModal}
          closeModal={closeDeleteModal}
          modalTitle="Eliminar tarea"
          typeBtnConfirm="button"
          contentModal={
            <div className="space-y-2 py-1">
              <p className="text-sm text-slate-600 leading-relaxed">
                ¿Estás seguro de que deseas eliminar la tarea{" "}
                <span className="font-semibold text-slate-900">
                  "{selectedTaskDelete[0].name}"
                </span>
                ?
              </p>
              <p className="text-xs text-rose-500 font-medium">
                Esta acción no se puede deshacer y desvinculará la tarea de este proyecto.
              </p>
            </div>
          }
        />
      )}

      {/* Toast Flotante Creación */}
      <Toast
        titleToast="Se ha creado una nueva tarea"
        typeToast="success"
        isOpen={showTaskSuccessToast}
        onClose={closeTaskSuccessToast}
      />

      {/* Toast Flotante Eliminación */}
      <Toast
        titleToast="Tarea eliminada correctamente"
        typeToast="warning"
        isOpen={showDeleteToast}
        onClose={closeDeleteToast}
      />
    </div>
  );
}
