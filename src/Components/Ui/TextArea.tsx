import type { ChangeEvent } from "react";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
}

export default function TextArea({
  name,
  value,
  onChange,
  placeholder,
  label,
  showLabel = false,
}: TextAreaProps) {
  return (
    <div>
      {showLabel && label && (
        <label
          htmlFor={name}
          className="block mb-1.5 text-xs font-medium text-zinc-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded-xl border-zinc-100 bg-zinc-50 w-full min-h-28 resize-y"
      />
    </div>
  );
}