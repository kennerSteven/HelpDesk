import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  register?: any;
  icon?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  label,
  showLabel = false,
  register,
  icon,
  helperText,
  required = false,
  error,
  className = "",
  inputClassName = "",
  disabled = false,
  ...rest
}: InputProps) {
  const registeredProps = register ? register(name) : {};

  return (
    <div className={`w-full ${className}`}>
      {showLabel && label && (
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
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...registeredProps}
          {...rest}
          className={`w-full rounded-xl border bg-zinc-50/70 py-2.5 text-base font-medium text-zinc-800 placeholder-zinc-400 outline-none transition-all duration-150 ${
            icon ? "pl-10 pr-3.5" : "px-3.5"
          } ${
            error
              ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
              : "border-zinc-200 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/15"
          } ${
            disabled ? "cursor-not-allowed bg-zinc-100 text-zinc-400" : ""
          } ${inputClassName}`}
        />
      </div>

      {helperText && !error && (
        <p className="mt-1 text-[11px] text-zinc-400">{helperText}</p>
      )}

      {error && <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}

