import React from "react";

type ColorTheme = "slate" | "amber" | "blue" | "emerald" | "violet" | "rose";

interface FilterBadgeProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  count?: number;
  colorTheme?: ColorTheme;
}

export default function FilterBadge({
  label,
  isActive = false,
  onClick,
  count,
  colorTheme = "slate",
}: FilterBadgeProps) {
  const themeStyles: Record<
    ColorTheme,
    { active: string; inactive: string; countActive: string; countInactive: string }
  > = {
    slate: {
      active: "bg-[#0F172A] text-white border-[#0F172A]",
      inactive: "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-slate-100 text-slate-500",
    },
    amber: {
      active: "bg-amber-500 text-white border-amber-500",
      inactive: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-amber-200/50 text-amber-700",
    },
    blue: {
      active: "bg-blue-500 text-white border-blue-500",
      inactive: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-blue-200/50 text-blue-700",
    },
    emerald: {
      active: "bg-emerald-500 text-white border-emerald-500",
      inactive: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-emerald-200/50 text-emerald-700",
    },
    violet: {
      active: "bg-violet-500 text-white border-violet-500",
      inactive: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-violet-200/50 text-violet-700",
    },
    rose: {
      active: "bg-rose-500 text-white border-rose-500",
      inactive: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
      countActive: "bg-white/20 text-white",
      countInactive: "bg-rose-200/50 text-rose-700",
    },
  };

  const currentTheme = themeStyles[colorTheme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all cursor-pointer border shadow-sm ${
        isActive ? currentTheme.active : currentTheme.inactive
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] min-w-[20px] font-bold ${
            isActive ? currentTheme.countActive : currentTheme.countInactive
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
