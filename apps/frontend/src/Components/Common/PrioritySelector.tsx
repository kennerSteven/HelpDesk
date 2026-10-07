import React from "react";

export type PriorityVariant =
  | "low"
  | "medium"
  | "high"
  | "success"
  | "warning"
  | "danger"
  | "zinc";

export interface PrioritySelectorProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  variant?: PriorityVariant;
  className?: string;
  disabled?: boolean;
}

const variantActiveStyles: Record<
  PriorityVariant,
  { card: string; icon: string }
> = {
  low: {
    card: "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-emerald-600",
  },
  success: {
    card: "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-emerald-600",
  },
  medium: {
    card: "border-amber-300 bg-amber-50 text-amber-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-amber-600",
  },
  warning: {
    card: "border-amber-300 bg-amber-50 text-amber-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-amber-600",
  },
  high: {
    card: "border-rose-300 bg-rose-50 text-rose-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-rose-600",
  },
  danger: {
    card: "border-rose-300 bg-rose-50 text-rose-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-rose-600",
  },
  zinc: {
    card: "border-zinc-300 bg-zinc-100 text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    icon: "text-zinc-800",
  },
};

export default function PrioritySelector({
  title,
  description,
  icon,
  isSelected = false,
  onChange,
  onClick,
  variant = "medium",
  className = "",
  disabled = false,
}: PrioritySelectorProps) {
  const handleClick = () => {
    if (disabled) return;
    onChange?.();
    onClick?.();
  };

  const activeConfig =
    variantActiveStyles[variant] || variantActiveStyles.medium;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`flex min-h-[52px] flex-col items-center justify-center rounded-[14px] border p-2.5 transition-all active:scale-[0.97] ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${
        isSelected
          ? activeConfig.card
          : "border-transparent bg-zinc-50 text-zinc-500 hover:bg-zinc-100/80"
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight">
        {icon && (
          <span
            className={`shrink-0 ${
              isSelected ? activeConfig.icon : "text-zinc-400"
            }`}
          >
            {icon}
          </span>
        )}
        <span>{title}</span>
      </div>
      {description && (
        <span className="text-[10px] font-medium opacity-80">
          {description}
        </span>
      )}
    </button>
  );
}
