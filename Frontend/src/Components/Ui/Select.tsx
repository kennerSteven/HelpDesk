import type { SelectHTMLAttributes } from "react";

export  interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  objectValues: SelectOption[];
  label?: string;
  register? : any
  name : string
}

export default function Select({ objectValues, label,register,name }: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block mb-1.5 text-xs font-medium text-zinc-700">
          {label}
        </label>
      )}
    
      <select {...register(name)} className="border p-2 rounded-xl border-zinc-100 bg-zinc-50 w-full">
          <option value="">Selecciona una opcion</option>
        {objectValues.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
    </div>
  );
}
