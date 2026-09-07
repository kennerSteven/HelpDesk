import Button from "../../../../Components/Ui/Button";
import FieldMessageError from "../../../../Components/Common/FieldMessage";
import Input from "../../../../Components/Ui/Input";
import TextArea from "../../../../Components/Ui/TextArea";
import { CategorySchema } from "../../../../Schemas/Category.schema";
import {
  GetStorageItem,
  SetStorageItem,
} from "../../../../Utils/Storage.utils";
import { useState } from "react";
import { useZodForm } from "../../../../Hooks/useZodForm";

interface CategoryTypes {
  nameCategory: string;
  descriptionCategory?: string;
}

export default function CreateCategory() {
  const [categoriesList, setCategoriesList] = useState<CategoryTypes[]>(() =>
    GetStorageItem("category", []),
  );

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit } = useAppForm({
    schema: CategorySchema,
  });

  function HandleSubmit(Data: CategoryTypes) {
    const categoryData = GetStorageItem("category", []);
    const normalizedData: CategoryTypes = {
      nameCategory: Data.nameCategory.trim(),
      descriptionCategory: Data.descriptionCategory?.trim() ?? "",
    };

    const nextCategories = [...categoryData, normalizedData];
    SetStorageItem("category", nextCategories);
    setCategoriesList(nextCategories);
  }

  return (
    <div className=" items-center grid grid-cols-2 gap-10">
      <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto scrollbar-none h-[25vw] h-max-3xl">
        {categoriesList.map((i, k) => (
          <div
            className="flex  p-4 gap-5  bg-zinc-100 border-l-4 border-l-zinc-800 rounded-xl shadow-md shadow-zinc-200 "
            key={`${i.nameCategory}-${k}`}
          >
            <div>
              <strong>Nombre</strong>
              <p>{i.nameCategory}</p>
            </div>
            <div>
              <strong>Descripcion</strong>
              <p className="text-mauve-400">
                {i.descriptionCategory || <em>Sin descripcion</em>}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(HandleSubmit)}
        className="px-4 py-8  rounded-xl shadow-md shadow-zinc-200"
      >
        <div className="my-5">
          <Input
            name="nameCategory"
            register={register}
            label="Nombre de la categoria"
            showLabel={true}
            placeholder="Nombre de la categoria"
          />
        </div>
        {errors.nameCategory && (
          <FieldMessageError message={errors.nameCategory.message} />
        )}
        <TextArea
          name="descriptionCategory"
          register={register}
          label="Descripcion de la categoria (Opcional)"
          showLabel={true}
          placeholder="Descripcion de la categoria"
        />
     
        <div className="flex justify-end mt-5">
          <Button typeBtn="submit" labelBtn="Crear categoria" />
        </div>
      </form>
    </div>
  );
}
