import React from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  onChange?: () => void;
  register?: UseFormRegister<FieldValues> | any;
  description?: string;
  className?: string;
}

export default function Checkbox({
  label,
  name,
  onChange,
  register,
  description,
  className = "",
  disabled = false,
  ...rest
}: CheckboxProps) {
  const registeredProps = register ? register(name) : {};

  return (
    <label
      htmlFor={name}
      className={`flex items-start gap-2.5 select-none ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      <div className="flex h-5 items-center">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          onClick={onChange}
          {...registeredProps}
          {...rest}
          className="size-4.5 rounded-md border-zinc-300 text-zinc-900 accent-zinc-900 transition-colors focus:ring-2 focus:ring-zinc-900/20 focus:ring-offset-0"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-800 leading-tight">
          {label}
        </span>
        {description && (
          <span className="text-xs text-zinc-500 mt-0.5">{description}</span>
        )}
      </div>
    </label>
  );
}

