import type { SelectHTMLAttributes } from "react";


interface SelectOption {
  value:  string;
  label?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  objectValues: SelectOption[];
  label?: string;
}

export default function Select({
  objectValues,
  label,
  ...selectProps
}: SelectProps) {
  console.log(objectValues)
  return (
    <div>
      {label && (
        <label
          htmlFor={selectProps.name}
          className="block mb-1.5 text-xs font-medium text-zinc-700"
        >
          {label}
        </label>
      )}
      <select
        {...selectProps}
        id={selectProps.name}
        className="border p-2 rounded-xl border-zinc-100 bg-zinc-50 w-full"
      >
        {objectValues.map((i) => (
          
            <option key={i.value} value={i.value}>{i.label}</option>
     
        ))}
      </select>
    </div>
  );
}
