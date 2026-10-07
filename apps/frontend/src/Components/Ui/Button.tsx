import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  typeBtn?: "button" | "submit" | "reset";
  labelBtn?: string;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
  formId?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white shadow-sm shadow-zinc-900/20 hover:bg-zinc-800 active:bg-zinc-950 border border-transparent",
  secondary:
    "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 border border-zinc-200/80",
  outline:
    "bg-white text-zinc-800 hover:bg-zinc-50 active:bg-zinc-100 border border-zinc-300 shadow-xs",
  danger:
    "bg-rose-50 text-rose-600 hover:bg-rose-100 active:bg-rose-200 border border-rose-200",
  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-5 text-base gap-2.5 rounded-xl",
};

export default function Button({
  typeBtn = "button",
  onClick,
  labelBtn,
  loading = false,
  loadingText,
  formId,
  className = "",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  children,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const content = children || labelBtn;

  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      <button
        type={typeBtn}
        form={formId}
        disabled={isDisabled}
        onClick={typeBtn === "button" && !isDisabled ? onClick : undefined}
        className={`inline-flex items-center justify-center font-bold tracking-tight select-none transition-all duration-150 active:scale-[0.98] ${
          fullWidth ? "w-full" : ""
        } ${sizeStyles[size]} ${
          isDisabled
            ? "bg-zinc-200 text-zinc-400 border-transparent cursor-not-allowed shadow-none"
            : variantStyles[variant]
        } ${className}`}
      >
        {loading ? (
          <>
            <svg
              className="size-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{loadingText || content}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="shrink-0">{icon}</span>
            )}
            {content && <span>{content}</span>}
            {icon && iconPosition === "right" && (
              <span className="shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    </div>
  );
}

