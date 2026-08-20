import type { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

export default function Input({ name, value, onChange, type = "text", placeholder }: InputProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="border p-2 rounded-xl  border-zinc-100 bg-zinc-50 w-full"
    />
  );
}