import Input, { type InputProps } from "./Input";

export type DateIconType = "init" | "finish";

export interface InputDateProps extends Omit<InputProps, "type"> {
  dateType?: DateIconType;
  containerClassName?: string;
}

export default function InputDate({
  dateType = "init",
  icon,
  containerClassName = "",
  label,
  showLabel = true,
  required = false,
  ...rest
}: InputDateProps) {
  const defaultIcon =
    dateType === "finish" ? (
      <svg
        className="size-4 text-rose-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
        />
      </svg>
    ) : (
      <svg
        className="size-4 text-zinc-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );

  return (
    <div
      className={`flex flex-col rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-3 ${containerClassName}`}
    >
      <Input
        type="date"
        showLabel={showLabel}
        label={label}
        required={required}
        icon={icon || defaultIcon}
        {...rest}
      />
    </div>
  );
}
