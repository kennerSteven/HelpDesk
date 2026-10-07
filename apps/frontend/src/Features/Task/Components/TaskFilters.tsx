import type { SelectOption } from "../../../../Components/Ui/Select";
import Select from "../../../../Components/Ui/Select";
import Input from "../../../../Components/Ui/Input";

interface Props {
  register: any;
  objectCategory: SelectOption[];
  priority?: SelectOption[];
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  onProgramate?: () => void;
}

export default function TaskFilters({
  register,
  objectCategory,
  search,
  onSearchChange,
}: Props) {
  return (
    <section className="bg-white rounded-[28px] border border-zinc-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Filtrar resultados
        </h2>
        <span className="text-[13px] text-zinc-400 font-medium">Búsqueda rápida</span>
      </div>
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div>
          <Input
            name="search-tasks"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre..."
            label="Búsqueda"
            showLabel={false}
            icon={
              <svg className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
              </svg>
            }
          />
        </div>

        {/* Category Selector */}
        <div>
          <Select
            name="categoryFilter"
            label="Categoría"
            register={register}
            objectValues={objectCategory}
            className="w-full"
            placeholder="Todas las categorías"
          />
        </div>
      </div>
    </section>
  );
}

