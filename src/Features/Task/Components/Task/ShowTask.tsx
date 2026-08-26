import { useState } from "react";
import Button from "../../../../Components/Ui/Button";
import Modal from "../../../../Components/Modal/Modal";
import { GetStorageItem } from "../../../../Utils/Storage.utils";
import CreateTask from "../CreateTask/CreateTask";
import type{ TaskType } from "../../Types/TaskTypes";


export default function ShowTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>(() =>
    GetStorageItem("task", []),
  );

  const refreshTasks = () => {
    setTasks(GetStorageItem("task", []));
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Tareas</h1>
            <p className="text-sm text-zinc-500">
              Gestiona tus tareas creadas en el sistema.
            </p>
          </div>

          <Button
            typeBtn="button"
            labelBtn="Crear tarea"
            onClick={() => setIsOpen(true)}
          />
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-500">
            Sin data
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task, index) => (
              <div
                key={`${task.name}-${index}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200"
              >
                {task.photo && (
                  <img
                    src={task.photo}
                    alt={task.name}
                    className="mb-4 h-40 w-full rounded-xl object-cover"
                  />
                )}

                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {task.name}
                  </h2>
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                    {task.priority}
                  </span>
                </div>

                <p className="mb-3 text-sm text-zinc-600">
                  {task.description || "Sin descripción"}
                </p>

                <div className="space-y-2 text-sm text-zinc-600">
                  <p>
                    <span className="font-medium text-zinc-800">Categoría:</span>{" "}
                    {task.category}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-800">Estado:</span>{" "}
                    {task.status}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-800">Inicio:</span>{" "}
                    {task.dateInit}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-800">Fin:</span>{" "}
                    {task.dateFinish}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <Modal
          width="medium"
          modalTitle="Crear tarea"
          contentModal={
            <CreateTask
              onSuccess={() => {
                refreshTasks();
                setIsOpen(false);
              }}
            />
          }
          closeModal={() => {
            refreshTasks();
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
