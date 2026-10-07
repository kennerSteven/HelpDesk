import type { SelectOption } from "../../../../Components/Ui/Select";
import Select from "../../../../Components/Ui/Select";

interface Props {
  register: any;
  objectCategory: SelectOption[];
  priority?: SelectOption[];
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  onProgramate?: () => void;
}

export default function FilterTask({
  register,
  objectCategory,
  search,
  onSearchChange,
}: Props) {
  return (
    <section className="bg-slate-50/70 rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4 px-0.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Filtrar resultados
        </h2>
        <span className="text-xs text-slate-400 font-medium">Búsqueda rápida</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Search Input */}
        <div className="md:col-span-7">
          <label className="sr-only" htmlFor="search-tasks">
            Buscar tarea
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path
                  d="m21 21-4.35-4.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <input
              id="search-tasks"
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition outline-none shadow-xs"
              placeholder="Buscar tarea..."
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="md:col-span-5">
          <Select
            name="categoryFilter"
            label="Categoría"
            register={register}
            objectValues={objectCategory}
            className="w-full"
            selectClassName="py-2.5 text-sm rounded-xl border-slate-200 bg-white text-slate-700 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200 shadow-xs"
          />
        </div>
      </div>
    </section>
  );
}

