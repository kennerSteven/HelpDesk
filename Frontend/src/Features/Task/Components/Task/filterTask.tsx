import Button from "../../../../Components/Ui/Button";
import Select from "../../../../Components/Ui/Select";
import SearchIcon from "../../../../Components/Icons/SearchIcon";

export interface SelectOption {
  value: string;
  label: string;
}

interface props {
  register: any;
  objectCategory: SelectOption[];
  priority: SelectOption[];
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

export default function FilterTask({
  register,
  objectCategory,
  priority,
  search,
  onSearchChange,
  onCreate,
}: props) {
  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-inner">
      <div className="flex flex-col rounded-b-3xl">
        <div className="flex items-center justify-between border-b border-zinc-100 p-5">
          <h2 className="text-lg font-bold text-zinc-900">
            Filtrar resultados
          </h2>
          <Button
            typeBtn="button"
            labelBtn="Crear tarea"
            onClick={onCreate}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-3">
          <div className="relative flex items-end">
            <SearchIcon className="pointer-events-none absolute bottom-2 left-2 size-5 text-zinc-700" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full border-0 border-b-2 border-zinc-300 bg-transparent py-2 pl-9 pr-3 text-zinc-900 outline-none focus:border-zinc-800"
              placeholder="Buscar tarea..."
            />
          </div>
          <Select
            name="categoryFilter"
            label="Categoría"
            register={register}
            objectValues={objectCategory}
          />

          <Select
            name="priority"
            label="Prioridad"
            register={register}
            objectValues={priority}
          />
        </div>
      </div>
    </section>
  );
}
