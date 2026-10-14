import { useState } from "react";

// Los 5 colores en tonos pasteles definidos en inglés y mayúsculas
export const COLORS = {
  RED: {
    id: "RED",
    name: "Red",
    hex: "#FDA4AF",
    bgClass: "bg-rose-200",
    borderClass: "border-rose-300",
  },
  BLUE: {
    id: "BLUE",
    name: "Blue",
    hex: "#BAE6FD",
    bgClass: "bg-sky-200",
    borderClass: "border-sky-300",
  },
  YELLOW: {
    id: "YELLOW",
    name: "Yellow",
    hex: "#FEF08A",
    bgClass: "bg-amber-200",
    borderClass: "border-amber-300",
  },
  GREEN: {
    id: "GREEN",
    name: "Green",
    hex: "#A7F3D0",
    bgClass: "bg-emerald-200",
    borderClass: "border-emerald-300",
  },
  PURPLE: {
    id: "PURPLE",
    name: "Purple",
    hex: "#E9D5FF",
    bgClass: "bg-purple-200",
    borderClass: "border-purple-300",
  },
};

export const PROJECT_COLORS = ["RED", "BLUE", "YELLOW", "GREEN", "PURPLE"] as const;
export const AVAILABLE_COLORS = Object.values(COLORS);

// Tarjeta individual de color cuadrada que recibe el prop onclick
export function ColorCard(props: any) {
  const { color, isSelected, onclick, onClick, ...rest } = props;
  const handleClick = onclick || onClick;

  const colorData =
    typeof color === "string"
      ? COLORS[color as keyof typeof COLORS] || {
          id: color,
          name: color,
          bgClass: "bg-slate-200",
          borderClass: "border-slate-300",
        }
      : color;

  return (
    <button
      type="button"
      title={colorData?.name || colorData?.id}
      aria-label={colorData?.name || colorData?.id}
      onClick={() => handleClick?.(colorData?.id || colorData)}
      className={`size-9 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 shadow-2xs ${
        colorData?.bgClass
      } ${colorData?.borderClass} ${
        isSelected
          ? "ring-2 ring-offset-2 ring-slate-800 scale-105 shadow-xs"
          : "hover:scale-105 hover:opacity-100 opacity-85 hover:shadow-xs"
      }`}
      {...rest}
    >
      {isSelected && (
        <svg
          className="size-4 text-slate-800 drop-shadow-xs stroke-[2.8]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}

// Componente principal que contiene literalmente los 5 colores con su prop onclick
export default function SelectColor(props: any) {
  const {
    value,
    onChange,
    onclick,
    onClick,
    className = "",
    ...rest
  } = props;

  const [selected, setSelected] = useState<any>(value || "BLUE");

  const handleColorClick = (colorId: string) => {
    setSelected(colorId);
    if (onclick) {
      onclick(colorId);
    }
    if (onClick) {
      onClick(colorId);
    }
    if (onChange) {
      onChange(colorId);
    }
  };

  const currentSelectedId = value !== undefined ? value : selected;

  return (
    <div className={`flex items-center gap-2.5 ${className}`} {...rest}>
      {/* 1. Color RED */}
      <ColorCard
        color={COLORS.RED}
        isSelected={currentSelectedId === "RED"}
        onclick={() => handleColorClick("RED")}
      />

      {/* 2. Color BLUE */}
      <ColorCard
        color={COLORS.BLUE}
        isSelected={currentSelectedId === "BLUE"}
        onclick={() => handleColorClick("BLUE")}
      />

      {/* 3. Color YELLOW */}
      <ColorCard
        color={COLORS.YELLOW}
        isSelected={currentSelectedId === "YELLOW"}
        onclick={() => handleColorClick("YELLOW")}
      />

      {/* 4. Color GREEN */}
      <ColorCard
        color={COLORS.GREEN}
        isSelected={currentSelectedId === "GREEN"}
        onclick={() => handleColorClick("GREEN")}
      />

      {/* 5. Color PURPLE */}
      <ColorCard
        color={COLORS.PURPLE}
        isSelected={currentSelectedId === "PURPLE"}
        onclick={() => handleColorClick("PURPLE")}
      />
    </div>
  );
}


