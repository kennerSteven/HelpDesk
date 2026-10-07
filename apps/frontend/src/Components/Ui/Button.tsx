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
    "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 active:opacity-80",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 active:opacity-80",
  outline:
    "bg-transparent text-zinc-900 border border-zinc-900 hover:bg-zinc-50 active:scale-95 active:opacity-80",
  danger:
    "bg-rose-500 text-white hover:bg-rose-600 active:scale-95 active:opacity-80",
  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-50 active:scale-95 active:opacity-80",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[32px] px-4 text-[13px] gap-1.5 rounded-full",
  md: "min-h-[44px] px-6 text-[17px] gap-2 rounded-full",
  lg: "min-h-[50px] px-8 text-[19px] gap-2.5 rounded-full",
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
        className={`inline-flex items-center justify-center font-semibold tracking-tight select-none transition-[opacity,transform,background-color] duration-200 ease-out ${
          fullWidth ? "w-full" : ""
        } ${sizeStyles[size]} ${
          isDisabled
            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
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

