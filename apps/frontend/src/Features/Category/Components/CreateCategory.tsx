import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";
import TextArea from "../../../Components/Ui/TextArea";
import type { CategorySchemaType } from "@repo/schemas";

interface CreateCategoryProps {
  onSubmitCategory: (data: CategorySchemaType) => Promise<void>;
  register: any;
  handleSubmit: any;
  errors: any;
  isSubmitting: boolean;
}

export default function CreateCategory({
  onSubmitCategory,
  register,
  handleSubmit,
  errors,
  isSubmitting,
}: CreateCategoryProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmitCategory)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-5">
        <Input
          name="nameCategory"
          register={register}
          label="Nombre de la categoría"
          showLabel={true}
          placeholder="Ej. Estudio, Trabajo..."
          error={errors.nameCategory?.message as string}
          required
        />

        <TextArea
          name="descriptionCategory"
          register={register}
          label="Descripción (Opcional)"
          showLabel={true}
          placeholder="Añade detalles..."
          rows={3}
          error={errors.descriptionCategory?.message as string}
        />
      </div>

      <div className="sticky bottom-0 z-10 bg-white pt-2 pb-2">
        <Button
          typeBtn="submit"
          labelBtn="Crear Categoría"
          loading={isSubmitting}
          loadingText="Guardando..."
          variant="primary"
          fullWidth
          size="md"
        />
      </div>
    </form>
  );
}
