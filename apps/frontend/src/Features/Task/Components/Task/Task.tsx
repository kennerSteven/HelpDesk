import { useMemo, useState } from "react";
import { GetStorageItem } from "../../../../Utils/Storage.utils";
import CreateTask from "../CreateTask/CreateTask";
import type { TaskType } from "../../Types/TaskTypes";
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

export default function Task() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(() =>
    GetStorageItem("task", []),
  );

  const [category] = useState<any[]>(() => GetStorageItem("category", []));
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
  } = useEditTask({ tasks, setTasks, closeModal });

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
  } = useTaskActions(tasks, setTasks);

  //llama al hook useShowTask
  const {
    isOpen: showSuccessToast,
    showToast,
    closeToast: closeSuccessToast,
  } = useShowToast();

  const priorityOptions = [
    { value: "LOW", label: "Baja" },
    { value: "MEDIUM", label: "Media" },
    { value: "HIGH", label: "Alta" },
  ];

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
        !categoryFilter || task.category === categoryFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      const searchInput = !search || task.name === search;

      return matchesCategory && matchesPriority && searchInput;
    });
  }, [tasks, search, categoryFilter, priorityFilter]);

  //Carga las categorias, memorizando las categorias si no hay alguna nueva
  const categoryParsed = useMemo(() => {
    return category.map((item) => ({
      label: item.descriptionCategory,
      value: item.nameCategory,
    }));
  }, [category]);

  return (
    <div className="flex justify-between">
      <div className="w-full mx-20">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Tareas</h1>

            <p className="text-sm text-zinc-500">
              Gestiona tus tareas creadas en el sistema.
            </p>
          </div>
        </div>

        {/* Filtro por categoría, pasamos los objetos de categoria y prioridads, como tambien el valor de sarch */}
        <FilterTask
          register={register}
          objectCategory={categoryParsed}
          priority={priorityOptions}
          search={search}
          onSearchChange={setSearch}
          onCreate={openModal}
        />
        {/* Analiza, si el objeto el tasks no tiene nada renderiza el componente empty, pero si los calculos de la funcion memo son true
        itera el resultado de los filtros, sino por defecto itera todas las tareas  */}
        {tasks.length === 0 ? (
          <Empty onCreate={openModal} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTask.length > 0 ? (
              filteredTask.map((task) => (
                <ShowTask
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  category={task.category}
                  status={task.status}
                  dateInit={task.dateInit}
                  dateFinish={task.dateFinish}
                  priority={task.priority}
                  onDelete={() => handleDelete(task.id)}
                  onEdit={() => {
                    selectTaskToEdit(task.id);
                    openEditModal();
                  }}
                />
              ))
            ) : (
              <div className="col-span-full py-8">
                <Empty
                  title="No se encontraron tareas"
                  description="Prueba con otro nombre o cambia los filtros."
                  onCreate={openModal}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {isEditOpen && selectedEditTask && (
        <EditTask
          task={selectedEditTask}
          onSave={updateTask}
          onCancel={closeEditModal}
        />
      )}

      <div className="col-span-3">
        {isOpen && (
          <CreateTask close={closeModal} onSuccess={handleTaskSuccess} />
        )}
      </div>

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
