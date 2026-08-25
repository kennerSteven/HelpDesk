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
import { ValidateFields } from "../../../../Utils/FieldValidate";

export default function CreateCategory() {
  const {
    values: category,
    HandleChange,
    setValues,
  } = useForm({
    nameCategory: "",
    descriptionCategory: "",
  });
  const [error, setError] = useState("");

  const [categoriesList, setCategoriesList] = useState<any[]>(() =>
    GetStorageItem("category", []),
  );

  function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category.nameCategory.trim()) {
      return setError("Por favor complete los campos");
    }
    setError("")

    const categoryData = GetStorageItem("category", []);
    setCategoriesList(categoryData);
    categoryData.push(category);
    SetStorageItem("category", categoryData);
    setValues({
      nameCategory: "",
      descriptionCategory: "",
    });
    
  }

  return (
    <div className=" items-center grid grid-cols-2 gap-10">
      <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto scrollbar-none h-[25vw] h-max-3xl">
        {categoriesList.map((i, k) => (
          <div
            className="flex  p-4 gap-5  bg-zinc-100 border-l-4 border-l-zinc-800 rounded-xl shadow-md shadow-zinc-200 "
            key={k}
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
        onSubmit={HandleSubmit}
        className="px-4 py-8  rounded-xl shadow-md shadow-zinc-200"
      >
        <div className="my-5">
          <Input
            name="nameCategory"
            value={category.nameCategory}
            onChange={HandleChange}
            label="Nombre de la categoria"
            showLabel={true}
            placeholder="Nombre de la categoria"
          />
        </div>

        <TextArea
          name="descriptionCategory"
          value={category.descriptionCategory}
          onChange={HandleChange}
          label="Descripcion de la categoria (Opcional)"
          showLabel={true}
          placeholder="Descripcion de la categoria"
        />
        {error && <FieldMessageError message={error} />}
        <div className="flex justify-end mt-5">
          <Button typeBtn="submit" labelBtn="Crear categoria" />
        </div>
      </form>
    </div>
  );
}
