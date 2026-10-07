import type { ReactNode } from "react";

export type KpiVariant = "default" | "emerald" | "indigo" | "amber" | "rose";

export interface CalendarKpiCardProps {
  icon: ReactNode;
  titulo: string;
  descripcion: string;
  valor: string | number;
  trend?: {
    text: string;
    isPositive?: boolean;
  };
  variant?: KpiVariant;
  className?: string;
}

const variantStyles: Record<
  KpiVariant,
  { iconBg: string; iconColor: string; borderHover: string; glow: string }
> = {
  default: {
    iconBg: "bg-zinc-100",
    iconColor: "text-zinc-800",
    borderHover: "hover:border-zinc-400",
    glow: "group-hover:shadow-zinc-200/50",
  },
  emerald: {
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-300",
    glow: "group-hover:shadow-emerald-500/10",
  },
  indigo: {
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderHover: "hover:border-indigo-300",
    glow: "group-hover:shadow-indigo-500/10",
  },
  amber: {
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-300",
    glow: "group-hover:shadow-amber-500/10",
  },
  rose: {
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    borderHover: "hover:border-rose-300",
    glow: "group-hover:shadow-rose-500/10",
  },
};

export default function CalendarKpiCard({
  icon,
  titulo,
  descripcion,
  valor,
  trend,
  variant = "default",
  className = "",
}: CalendarKpiCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles.borderHover} ${styles.glow} ${className}`}
    >
      {/* Header: Icono y Título */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.iconBg} ${styles.iconColor}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <span className="block truncate text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {titulo}
            </span>
          </div>
        </div>

        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${trend.isPositive !== false
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : "bg-rose-50 text-rose-700 border border-rose-200/60"
              }`}
          >
            {trend.text}
          </span>
        )}
      </div>

      {/* Valor principal */}
      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          {valor}
        </div>
        <p className="mt-1 text-xs text-zinc-500 leading-relaxed line-clamp-2">
          {descripcion}
        </p>
      </div>

    </div>
  );
}
