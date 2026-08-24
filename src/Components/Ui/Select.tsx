import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  objectValues: Record<string, string>;
  label?: string;
}

export default function Select({ objectValues, label, ...selectProps }: SelectProps) {
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
        {Object.entries(objectValues).map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}