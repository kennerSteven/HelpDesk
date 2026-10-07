import { useEffect } from "react";
import Toast from "../../../Components/Toast/Toast";
import useShowToast from "../../../Hooks/useShowToast";
import { CategorySchema } from "@repo/schemas";
import { useZodForm } from "../../../Hooks/useZodForm";
import useCategory from "../Hooks/useCategory";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";

interface CategoryProps {
  onCategoryCreated?: () => void;
}

export default function Category({
  onCategoryCreated,
}: CategoryProps = {}) {
  const {
    isOpen: showToast,
    showToast: openToast,
    closeToast,
  } = useShowToast();

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset } = useAppForm({
    schema: CategorySchema,
  });

  const {
    categories,
    loadingList,
    isSubmitting,
    loadAllCategories,
    onSubmitCategory,
  } = useCategory({
    onCategoryCreated,
    openToast,
    reset,
  });

  useEffect(() => {
    void loadAllCategories();
  }, []);

  return (
    <div className="relative flex flex-col gap-1">
      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* COLUMNA IZQUIERDA: FORMULARIO (5 cols) */}
        <div className="md:col-span-5 flex flex-col rounded-[28px] bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 md:sticky md:top-6">
          <div className="mb-8 flex items-center gap-4 border-b border-zinc-100/80 pb-6">
            <div className="flex size-12 items-center justify-center rounded-[16px] bg-zinc-900 text-white shadow-sm">
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900">
                Nueva Categoría
              </h3>
              <p className="mt-0.5 text-[15px] leading-snug text-zinc-500">
                Clasifica tus tareas
              </p>
            </div>
          </div>

          <CreateCategory
            onSubmitCategory={onSubmitCategory}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* COLUMNA DERECHA: LISTA (7 cols) */}
        <CategoryList categories={categories} loadingList={loadingList} />
      </div>

      {/* Toast de notificación de éxito */}
      {showToast && (
        <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
          <Toast
            titleToast="Categoría creada correctamente"
            typeToast="success"
            isOpen={showToast}
            onClose={closeToast}
          />
        </div>
      )}
    </div>
  );
}
