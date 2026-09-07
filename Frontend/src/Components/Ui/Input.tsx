interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  register: any;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  label,
  showLabel = false,
  register,
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
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded-xl  border-zinc-100 bg-zinc-50 w-full"
      />
    </div>
  );
}
