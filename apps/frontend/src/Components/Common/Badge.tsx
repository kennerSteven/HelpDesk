import React from "react";

export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "black"
  | "blue"
  | "indigo"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  title: string;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>) => void;
  isActive?: boolean;
  disabled?: boolean;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-1 text-[11px] gap-1.5",
  md: "px-3.5 py-2 text-xs gap-2 font-bold tracking-wide",
  lg: "px-4.5 py-2.5 text-sm gap-2.5 font-bold tracking-wide",
};

const variantStyles: Record<BadgeVariant, string> = {
  black: "border-zinc-200 bg-zinc-100 text-zinc-800 hover:bg-zinc-200/80",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  warning: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  danger: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  neutral: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
};

const activeVariantStyles: Record<BadgeVariant, string> = {
  black: "border-zinc-900 bg-zinc-900 text-white shadow-xs ring-2 ring-zinc-900/20",
  success: "border-emerald-600 bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20",
  warning: "border-amber-500 bg-amber-500 text-white shadow-xs ring-2 ring-amber-500/20",
  danger: "border-rose-600 bg-rose-600 text-white shadow-xs ring-2 ring-rose-500/20",
  blue: "border-blue-600 bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/20",
  indigo: "border-indigo-600 bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-500/20",
  neutral: "border-slate-800 bg-slate-800 text-white shadow-xs ring-2 ring-slate-800/20",
};

export default function Badge({
  title,
  icon,
  variant = "black",
  size = "sm",
  className = "",
  onClick,
  isActive = false,
  disabled = false,
}: BadgeProps) {
  const isInteractive = Boolean(onClick);
  const currentStyle = isActive
    ? activeVariantStyles[variant] || activeVariantStyles.black
    : variantStyles[variant] || variantStyles.black;

  const baseClasses = `inline-flex items-center rounded-full border uppercase transition-all duration-150 ${sizeStyles[size]} ${currentStyle} ${
    isInteractive
      ? "cursor-pointer select-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      : ""
  } ${className}`;

  if (isInteractive) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={baseClasses}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{title}</span>
      </button>
    );
  }

  return (
    <span className={baseClasses}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{title}</span>
    </span>
  );
}

