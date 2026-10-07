import { useEffect, useMemo, useState } from "react";
import CreateTask from "../CreateTask/CreateTask";
import ShowTask from "./ShowTask";
import Empty from "../../../../Components/Common/Empty";
import FilterTask from "./filterTask";
import Toast from "../../../../Components/Toast/Toast";
import ConfirmAction from "../../../../Components/Modal/ConfirmAction";
import useTaskActions from "../../Hooks/useTaskActions";
import EditTask from "./editTask";
import useEditTask from "../../Hooks/useEditTask";
import useModal from "../../../../Hooks/useModal";
import useShowToast from "../../../../Hooks/useShowToast";
import { getAllTasks } from "../../Services/task.service";

import PriorityQuickFilter from "./PriorityQuickFilter";

export default function Task() {
  const [search, setSearch] = useState("");

  interface TaskPopulated {
    _id: string;
    name: string;
    description?: string;
    dateInit: string;
    dateFinish: string;
    priority: string;
    categoryId: {
      _id: string;
      nameCategory: string;
      descriptionCategory?: string;
    };
  }

  const [tasks, setTasks] = useState<TaskPopulated[]>([]);

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

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    selectedTask: selectedEditTask,
    showEditToast,
    closeEditToast,
    selectTaskToEdit,
    updateTask,
  } = useEditTask({ tasks: tasks as any, setTasks: setTasks as any, closeModal });

  //Llama al hook de eliminar, destructurando las funciones y pasando parametros necesarios, como el objeto de tasks y la funcion setteadora
  const {
    register,
    categoryFilter,
    priorityFilter,
    selectedTask,
    showDelete,
    showDeleteToast,
    closeDeleteToast,
    handleDelete,
    deleteTask,
    closeDeleteModal,
    refreshTasks,
  } = useTaskActions(tasks as any, setTasks as any);

  //llama al hook useShowTask
  const {
    isOpen: showSuccessToast,
    showToast,
    closeToast: closeSuccessToast,
  } = useShowToast();

  //Funcion que se ejecuta al crear una tarea

  const handleTaskSuccess = () => {
    refreshTasks();
    closeModal();
    showToast();
  };

  //Filtra por campo, o selector de categoria y prioridad, memorizando los items y si no hay cambios no re calcula,y debe cumplir todas sino por defecto
  //muestra todas las tareas

  const filteredTask = useMemo(() => {
    return tasks.filter((task) => {
      const matchesCategory =
        !categoryFilter || task.categoryId === categoryFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      const searchInput = !search || task.name === search;

      return matchesCategory && matchesPriority && searchInput;
    });
  }, [tasks, search, categoryFilter, priorityFilter]);

  //Carga las categorias, memorizando las categorias si no hay alguna nueva

  console.log("Tareas cargadas", tasks);
  const categoryParsed = useMemo(() => {
    return tasks.map((item) => ({
      label: item.categoryId.nameCategory,
      value: item.categoryId.nameCategory,
    }));
  }, [tasks]);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Tareas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Gestiona tus tareas creadas en el sistema.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition shadow-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4.5v15m7.5-7.5h-15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Nueva Tarea</span>
          </button>
        </div>
      </header>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Priority Sidebar */}
        <aside className="lg:col-span-3">
          <PriorityQuickFilter />
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">
          <FilterTask
            register={register}
            objectCategory={categoryParsed}
            search={search}
            onSearchChange={setSearch}
            onCreate={openModal}
          />

          {/* Tasks list */}
          {tasks.length === 0 ? (
            <Empty onCreate={openModal} />
          ) : (
            <section
              aria-label="Listado de tareas"
              className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 space-y-3.5 shadow-xs"
            >
              <div className="flex items-center justify-between px-1 pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Listado de Tareas
                  </h3>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200/80 text-slate-700">
                    {filteredTask.length}
                  </span>
                </div>
                {filteredTask.length !== tasks.length && (
                  <span className="text-xs text-slate-400 font-medium">
                    Filtradas de {tasks.length} totales
                  </span>
                )}
              </div>

              {filteredTask.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredTask.map((task) => (
                    <ShowTask
                      key={task._id}
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
        </main>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-2xl shrink-0 flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl">
            <CreateTask
              close={closeModal}
              onSuccess={handleTaskSuccess}
              showButtons={true}
            />
          </div>
        </div>
      )}

      {isEditOpen && selectedEditTask && (
        <EditTask
          task={selectedEditTask}
          onSave={updateTask}
          onCancel={closeEditModal}
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

      {showDelete && selectedTask[0] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <ConfirmAction
            title="¿Eliminar tarea?"
            description={`¿Seguro que deseas eliminar la tarea "${selectedTask[0].name}"?`}
            typeModal="danger"
            onCancel={closeDeleteModal}
            onDelete={() => deleteTask(selectedTask[0].id)}
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
          />
        </div>
      )}
    </div>
  );
}
