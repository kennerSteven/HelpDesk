import type { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  label: string;
  name: string;
  onChange?: () => void;
  register: UseFormRegister<FieldValues>;
}

export default function Checkbox({
  label,
  name,
  onChange,
  register,
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
      <input
     onClick={onChange}
        type="checkbox"
       
        {...register(name)}
        className="size-4 rounded border-zinc-300 accent-zinc-800"
      />
      {label}
    </label>
  );
}
