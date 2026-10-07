import { type TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register?: any;
  type?: string;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  rows?: number;
  maxLength?: number;
  showCounter?: boolean;
  currentLength?: number;
  badge?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
}

export default function TextArea({
  name,
  register,
  placeholder,
  label,
  showLabel = false,
  rows = 3,
  maxLength,
  showCounter = false,
  currentLength,
  badge,
  helperText,
  error,
  required = false,
  className = "",
  textareaClassName = "",
  disabled = false,
  ...rest
}: TextAreaProps) {
  const registeredProps = register ? register(name) : {};

  return (
    <div className={`w-full ${className}`}>
      {showLabel && label && (
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label
              htmlFor={name}
              className="flex items-center gap-1 text-[13px] font-semibold tracking-tight text-zinc-600"
            >
              {label}
              {required && <span className="text-rose-500">*</span>}
            </label>
            {badge && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
                {badge}
              </span>
            )}
          </div>

          {showCounter && maxLength && (
            <span
              className={`text-[11px] font-medium ${(currentLength || 0) >= maxLength * 0.9
                ? "font-bold text-rose-500"
                : "text-zinc-400"
                }`}
            >
              {currentLength || 0} / {maxLength}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          {...registeredProps}
          {...rest}
          className={`w-full min-h-[96px] resize-y rounded-xl border bg-zinc-50/70 p-3 text-base font-medium text-zinc-800 placeholder-zinc-400 outline-none transition-all duration-150 ${error
            ? "border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
            : "border-zinc-200 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/15"
            } ${disabled ? "cursor-not-allowed bg-zinc-100 text-zinc-400" : ""
            } ${textareaClassName}`}
        />
      </div>

      {helperText && !error && (
        <p className="mt-1 text-[11px] text-zinc-400">{helperText}</p>
      )}

      {error && <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}

