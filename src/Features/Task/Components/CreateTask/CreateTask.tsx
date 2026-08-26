import { useState } from "react";
import Modal from "../../../../Components/Modal/Modal";
import Button from "../../../../Components/Ui/Button";
import FieldMessageError from "../../../../Components/Ui/FieldMessage";
import Input from "../../../../Components/Ui/Input";
import Select from "../../../../Components/Ui/Select";
import TextArea from "../../../../Components/Ui/TextArea";
import { CreateTaskSchema } from "../../../../Schemas/Task.schema";
import { GetStorageItem } from "../../../../Utils/Storage.utils";
import { useZodForm } from "../../../../Hooks/useZodForm";
import useCreateTask from "../../Hooks/useCreateTask";
import CreateCategory from "../CreateCategory/CreateCategory";

interface Category {
  nameCategory: string;
  descriptionCategory?: string;
}

const priorityOptions = [
  { value: "", label: "Seleccione una prioridad" },
  { value: "LOW", label: "Baja" },
  { value: "MEDIUM", label: "Media" },
  { value: "HIGH", label: "Alta" },
];

const statusOptions = [
  { value: "", label: "Seleccione un estado" },
  { value: "PENDING", label: "Pendiente" },
  { value: "IN_PROGRESS", label: "En progreso" },
  { value: "COMPLETED", label: "Completada" },
];

interface CreateTaskProps {
  onSuccess?: () => void;
}

export default function CreateTask({ onSuccess }: CreateTaskProps) {
  const { HandleSubmit } = useCreateTask();

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset } = useAppForm({
    schema: CreateTaskSchema,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>(() =>
    GetStorageItem("category", []),
  );

  console.log(categories)

  const categoryOptions = categories.map((category) => ({
    label: category.nameCategory,
    value: category.descriptionCategory,
  }));
  

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          HandleSubmit(data);
          reset();
          onSuccess?.();
        })}
        className="min-h-screen w-full max-w-xl mx-auto flex flex-col justify-center px-4 py-8 space-y-6 rounded-xl shadow-md shadow-zinc-200"
      >
        <div>
          <Input
            name="name"
            register={register}
            label="Nombre"
            showLabel={true}
            placeholder="Nombre de la tarea"
          />
          {errors?.name && <FieldMessageError message={errors.name.message} />}
        </div>

        <div>
          <TextArea
            name="description"
            label="Descripcion"
            showLabel={true}
            register={register}
            placeholder="Descripcion de la tarea"
          />
          {errors?.description && (
            <FieldMessageError message={errors.description.message} />
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              name="dateInit"
              register={register}
              label="Fecha de inicio"
              showLabel={true}
              type="date"
            />
            {errors?.dateInit && (
              <FieldMessageError message={errors.dateInit.message} />
            )}
          </div>

          <div className="flex-1">
            <Input
              name="dateFinish"
              register={register}
              label="Fecha de finalizacion"
              showLabel={true}
              type="date"
            />
            {errors?.dateFinish && (
              <FieldMessageError message={errors.dateFinish.message} />
            )}
          </div>
        </div>

        <div>
          <Input
            name="photo"
            register={register}
            label="Foto"
            showLabel={true}
            placeholder="URL de la foto"
          />
          {errors?.photo && (
            <FieldMessageError message={errors.photo.message} />
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Select
              name="priority"
              register={register}
              label="Prioridad"
              objectValues={priorityOptions}
            />
            {errors?.priority && (
              <FieldMessageError message={errors.priority.message} />
            )}
          </div>

          <div className="flex-1">
            <Select
              name="status"
              register={register}
              label="Estado"
              objectValues={statusOptions}
            />
            {errors?.status && (
              <FieldMessageError message={errors.status.message} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-8  gap-3">
          <div className="col-span-5">
            <Select
              name="category"
              register={register}
              label="Categoria"
              objectValues={categoryOptions}
            />
            {errors?.category && (
              <FieldMessageError message={errors.category.message} />
            )}
          </div>
          <div className="col-span-3 flex items-end">
            <Button
              labelBtn="Crear nueva categoria"
              typeBtn="button"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>

        <div className="flex justify-center ">
          <Button typeBtn="submit" labelBtn="Crear tarea" />
        </div>
      </form>
      <div>
        {openModal && (
          <Modal
            width="medium"
            modalTitle="Crear Categoria"
            contentModal={<CreateCategory />}
            closeModal={() => {
              const updatedCategories = GetStorageItem(
                "category",
                [],
              ) as Category[];

              setCategories(updatedCategories);
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
