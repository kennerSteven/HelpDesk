import { useEffect, useState } from "react";
import Button from "../../../../Components/Ui/Button";
import Input from "../../../../Components/Ui/Input";
import TextArea from "../../../../Components/Ui/TextArea";
import Badge from "../../../../Components/Common/Badge";
import Toast from "../../../../Components/Toast/Toast";
import useShowToast from "../../../../Hooks/useShowToast";
import { CategorySchema, type CategorySchemaType } from "@repo/schemas";
import { useZodForm } from "../../../../Hooks/useZodForm";
import { createCategory, getCategories } from "../../Services/category.service";

interface CategoryItem {
  _id?: string;
  id?: string;
  nameCategory: string;
  descriptionCategory?: string;
}

interface CreateCategoryProps {
  onCategoryCreated?: () => void;
}

export default function CreateCategory({ onCategoryCreated }: CreateCategoryProps = {}) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
 

  const {
    isOpen: showToast,
    showToast: openToast,
    closeToast,
  } = useShowToast();

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset } = useAppForm({
    schema: CategorySchema,
  });

  async function loadAllCategories() {
    setLoadingList(true);
    try {
      const data = await getCategories();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.log("Error al obtener categorías:", error);
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    void loadAllCategories();
  }, []);

  async function onSubmitCategory(data: CategorySchemaType) {
    setIsSubmitting(true);
    try {
      const response = await createCategory(data);
      if (response) {
        openToast();
        reset();
        await loadAllCategories();
        onCategoryCreated?.();
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-col gap-6">
      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formulario - Columna Izquierda (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="mb-5 flex items-center gap-3 border-b border-zinc-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs">
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
              <h3 className="text-base font-bold text-zinc-900">
                Nueva Categoría
              </h3>
              <p className="text-xs text-zinc-500">
                Registra una categoría para clasificar tareas
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmitCategory)} className="flex flex-col gap-4">
            <div>
              <Input
                name="nameCategory"
                register={register}
                label="Nombre de la categoría"
                showLabel={true}
                placeholder="Ej. Estudio, Trabajo, Personal..."
                error={errors.nameCategory?.message as string}
                required
              />
            </div>

            <div>
              <TextArea
                name="descriptionCategory"
                register={register}
                label="Descripción (Opcional)"
                showLabel={true}
                placeholder="Añade un breve contexto o detalles de la categoría..."
                rows={3}
                error={errors.descriptionCategory?.message as string}
              />
            </div>

            <div className="mt-2 pt-2">
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
        </div>

        {/* Lista de Categorías - Columna Derecha (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 sm:p-6 shadow-xs">
          {/* Header de la lista */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/70 pb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900">
                Categorías Existentes
              </h3>
              <Badge
                title={`${categories.length}`}
                variant="black"
                className="font-mono text-xs px-2 py-0.5"
              />
            </div>

          </div>

          {/* Contenido / Tarjetas */}
          <div className="flex max-h-[360px] flex-col gap-2.5 overflow-y-auto pr-1">
            {loadingList ? (
              <div className="py-12 text-center text-sm text-zinc-400">
                <div className="inline-block size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800 mb-2" />
                <p>Cargando categorías...</p>
              </div>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <div
                  key={cat._id || cat.id || `${cat.nameCategory}-${index}`}
                  className="group flex items-start justify-between rounded-xl border border-zinc-200/90 bg-white p-3.5 transition-all duration-150 hover:border-zinc-400 hover:shadow-xs"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-zinc-900">
                        {cat.nameCategory}
                      </h4>
                      <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">
                        {cat.descriptionCategory || "Sin descripción"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">
                    #{index + 1}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-10 text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-2">
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-700">
                  No hay categorías
                </p>
                <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                  Crea tu primera categoría usando el formulario de la izquierda.
                </p>
              </div>
            )}
          </div>
        </div>
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
