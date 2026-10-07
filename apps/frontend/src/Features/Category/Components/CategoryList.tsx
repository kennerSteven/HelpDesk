import Badge from "../../../Components/Common/Badge";
import type { CategoryTypes } from "../../Task/Types/types";

interface CategoryListProps {
  categories: CategoryTypes[];
  loadingList: boolean;
}

export default function CategoryList({
  categories,
  loadingList,
}: CategoryListProps) {
  return (
    <div className="md:col-span-7 flex flex-col rounded-[28px] bg-zinc-50/60 p-7 sm:p-8 border border-zinc-200/50">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/70 pb-5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900">
            Categorías Existentes
          </h3>
          <Badge
            title={`${categories.length}`}
            variant="black"
            className="font-mono text-xs px-2.5 py-0.5"
          />
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols gap-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-200">
        {loadingList ? (
          <div className="py-12 text-center text-[15px] font-medium text-zinc-400">
            <div className="inline-block size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800 mb-3" />
            <p>Cargando categorías...</p>
          </div>
        ) : categories.length > 0 ? (
          categories.map((cat, index) => (
            <div
              key={cat._id || `${cat.nameCategory}-${index}`}
              className="group flex items-start justify-between rounded-[20px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] active:scale-[0.98] border border-zinc-100/80"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                  <svg
                    className="size-4.5"
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

                <div className="min-w-0 pt-0.5">
                  <h4 className="truncate text-[17px] font-semibold tracking-tight text-zinc-900">
                    {cat.nameCategory}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-zinc-500">
                    {cat.descriptionCategory || "Sin descripción"}
                  </p>
                </div>
              </div>

              <span className="shrink-0 mt-1 rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-bold text-zinc-500">
                #{index + 1}
              </span>
            </div>
          ))
        ) : (
          <div className="xl:col-span-2 flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-zinc-200 py-12 text-center bg-white/50">
            <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-4">
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
            <p className="text-[17px] font-semibold tracking-tight text-zinc-900">
              No hay categorías
            </p>
            <p className="mt-1.5 text-[15px] text-zinc-500 max-w-xs leading-relaxed">
              Crea tu primera categoría usando el formulario de la
              izquierda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
