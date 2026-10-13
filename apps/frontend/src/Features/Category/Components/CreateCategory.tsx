import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";
import TextArea from "../../../Components/Ui/TextArea";
import Toast from "../../../Components/Toast/Toast";
import useCreateCategory from "../Hooks/useCreateCategory";

export default function CreateCategory() {
  const {
    errors,
    isSubmitting,
    handleSubmit,
    onSubmitCategory,
    register,
    isOpenSuccessToast,
    isOpenErrorToast,
    closeSuccessToast,
    closeErrorToast,
  } = useCreateCategory();

  console.log(errors);
  return (
    <>
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

      {/* Toast de notificación de éxito: se controla directamente desde useCreateCategory */}
      <div className="fixed right-6 top-6 z-50 w-full max-w-sm pointer-events-none">
        <div className="pointer-events-auto">
          <Toast
            titleToast="Categoría creada correctamente"
            typeToast="success"
            isOpen={isOpenSuccessToast}
            onClose={closeSuccessToast}
          />

          <Toast
            titleToast="Error al crear la categoría"
            typeToast="error"
            isOpen={isOpenErrorToast}
            onClose={closeErrorToast}
          />
        </div>
      </div>
    </>
  );
}
