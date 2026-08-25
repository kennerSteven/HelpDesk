import type { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
}

export default function Input({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  label,
  showLabel = false,
}: InputProps) {
  return (
    <div>
      {showLabel && label && (
        <label
          htmlFor={name}
          className="block mb-2 text-md font-medium text-zinc-700"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded-xl  border-zinc-100 bg-zinc-50 w-full"
      />
    </div>
  );
}