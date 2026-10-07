import React, { type SelectHTMLAttributes } from "react";

export interface SelectOption {
  id?: string;
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  objectValues: SelectOption[];
  label?: string;
  register?: any;
  name: string;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  selectClassName?: string;
}

export default function Select({
  objectValues = [],
  label,
  register,
  name,
  icon,
  placeholder = "Selecciona una opción",
  required = false,
  helperText,
  error,
  className = "",
  selectClassName = "",
  disabled = false,
  ...rest
}: SelectProps) {
  const registeredProps = register ? register(name) : {};

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor={name}
            className="flex items-center gap-1 text-[13px] font-semibold tracking-tight text-zinc-600"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center text-zinc-400">
            {icon}
          </div>
        )}

        <select
          id={name}
          disabled={disabled}
          {...registeredProps}
          {...rest}
          className={`w-full appearance-none rounded-xl border bg-zinc-50/70 py-2.5 text-base font-medium text-zinc-800 outline-none transition-all duration-150 ${
            icon ? "pl-10 pr-9" : "pl-3.5 pr-9"
          } ${
            error
              ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
              : "border-zinc-200 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/15"
          } ${
            disabled ? "cursor-not-allowed bg-zinc-100 text-zinc-400" : ""
          } ${selectClassName}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {objectValues.map((i, index) => {
            const optionValue = i.value !== undefined ? i.value : (i.id ?? "");
            return (
              <option key={i.id || i.value || index} value={optionValue}>
                {i.label}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {helperText && !error && (
        <p className="mt-1 text-[11px] text-zinc-400">{helperText}</p>
      )}

      {error && <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}

