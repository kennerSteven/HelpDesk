import { useState } from "react";
import Modal from "../../../../Components/Modal/Modal";
import Button from "../../../../Components/Ui/Button";
import FieldMessageError from "../../../../Components/Common/FieldMessage";
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
  descriptionCategory: string;
}

const priorityOptions = [
  { value: "LOW", label: "Baja" },
  { value: "MEDIUM", label: "Media" },
  { value: "HIGH", label: "Alta" },
];

interface CreateTaskProps {
  onSuccess?: () => void;
  close: () => void;
}

export default function CreateTask({ onSuccess, close }: CreateTaskProps) {
  const { HandleSubmit } = useCreateTask();

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset } = useAppForm({
    schema: CreateTaskSchema,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>(() =>
    GetStorageItem("category", []),
  );

  console.log(categories);

  const categoryOptions = categories.map((category) => ({
    label: category.nameCategory,
    value: category.descriptionCategory,
  }));

  return (
    <div className="h-screen w-110 max-w-[90vw] ">
      <form
        className="flex flex-col gap-4 bg-white px-5 h-full overflow-auto"
        id="CreateTask"
        onSubmit={handleSubmit((data) => {
          HandleSubmit(data);
          reset();
          onSuccess?.();
        })}
      >
        <div className="flex justify-between items-center ">
          <h1 className="text-zinc-900 font-bold text-2xl pt-2">
            Crear nueva tarea
          </h1>
          <svg
            onClick={close}
            className="w-6 h-6 text-gray-800 cursor-pointer mt-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
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

        <div className="col-span-4">
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

        <div className="col-span-2 bg-amber-100 p-2 rounded-xl max-w-md mt-4">
          <span>
            Estado : <strong className="text-amber-500">Pendiente</strong>
          </span>
        </div>

        <div className="grid grid-cols-8  gap-3">
          <div className="col-span-7">
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
          <div className="col-span-1 flex items-end">
            <Button
              className=" text-zinc-100"
              labelBtn="+"
              typeBtn="button"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div className=" mt-5">
          <Button labelBtn="Crear Tarea" typeBtn="submit" className="w-full" />
        </div>
      </form>
      <div>
        {openModal && (
          <Modal
            typeBtnConfirm="submit"
            labelConfirm="asds"
            Confirm={() => console.log("object")}
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
