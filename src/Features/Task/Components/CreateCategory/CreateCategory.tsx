import Button from "../../../../Components/Ui/Button";
import FieldMessageError from "../../../../Components/Ui/FieldMessage";
import Input from "../../../../Components/Ui/Input";
import TextArea from "../../../../Components/Ui/TextArea";
import useForm from "../../../../Shared/Hooks/useForm";
import useErrors from "../../../../Shared/Hooks/useErrors";
import {
  GetStorageItem,
  SetStorageItem,
} from "../../../../Utils/Storage.utils";
import { useState } from "react";

export default function CreateCategory() {
  const {
    values: category,
    HandleChange,
  } = useForm({
    nameCategory: "",
    descriptionCategory: "",
  });
  const { errors } = useErrors({
    nameCategory: "",
    descriptionCategory: "",
  });

  const [categoriesList, setCategoriesList] = useState<any[]>(() =>
    GetStorageItem("category", []),
  );

  function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const categoryData = GetStorageItem("category", []);
    setCategoriesList(categoryData);
    categoryData.push(category);
    SetStorageItem("category", categoryData);
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex ">
        {categoriesList.map((i, k) => (
          <div
            className="flex flex-col gap-5 m-5 bg-white rounded-xl shadow-md shadow-zinc-200 p-2"
            key={k}
          >
            <div>
              <strong>Nombre</strong>
           <p>{i.nameCategory}</p>
            </div>
            <div>
              <strong>Descripcion</strong>
                 <p className="text-mauve-400">{i.descriptionCategory || <em>Sin descripcion</em>}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={HandleSubmit}
        className="px-4 py-8  rounded-xl shadow-md shadow-zinc-200"
      >
        <Input
          name="nameCategory"
          value={category.nameCategory}
          onChange={HandleChange}
          label="Nombre de la categoria"
          showLabel={true}
          placeholder="Nombre de la categoria"
        />
        {errors.nameCategory && (
          <FieldMessageError message={errors.nameCategory} />
        )}

        <TextArea
          name="descriptionCategory"
          value={category.descriptionCategory}
          onChange={HandleChange}
          label="Descripcion de la categoria (Opcional)"
          showLabel={true}
          placeholder="Descripcion de la categoria"
        />
        {errors.descriptionCategory && (
          <FieldMessageError message={errors.descriptionCategory} />
        )}

        <div className="flex justify-center">
          <Button typeBtn="submit" labelBtn="Crear categoria" />
        </div>
      </form>
    </div>
  );
}
