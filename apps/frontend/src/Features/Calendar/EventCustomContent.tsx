/**
 * EventCustomContent.tsx
 * 
 * Componente para renderizar los eventos dentro de cada celda de FullCalendar
 * con diseño minimalista monocromático exclusivamente en color negro.
 */

interface EventCustomContentProps {
  event: {
    id?: string;
    title: string;
    allDay?: boolean;
    extendedProps?: {
      category?: string;
      categoryName?: string;
      priority?: string;
      description?: string;
      status?: string;
    };
  };
  timeText?: string;
  view?: {
    type: string;
  };
}

/**
 * Estilo visual unificado en color negro para todos los eventos del calendario
 */
const BLACK_STYLE = {
  bg: "bg-zinc-900 hover:bg-zinc-800",
  text: "text-white",
  border: "border-zinc-900",
  dot: "bg-zinc-400",
  bar: "bg-zinc-900",
};

export function getEventCategoryColor(
  _category?: string,
  _titleFallback: string = "",
  _idFallback: string = ""
) {
  return BLACK_STYLE;
}

export const EventCustomContent = ({
  event,
  timeText,
  view,
}: EventCustomContentProps) => {
  const category =
    event.extendedProps?.categoryName ||
    event.extendedProps?.category;
  const isDayOrWeekView =
    view?.type === "timeGridDay" ||
    view?.type === "dayGridDay" ||
    view?.type === "timeGridWeek";

  return (
    <div
      className="flex min-w-0 items-center justify-between gap-1.5 px-2 py-1 text-[11px] font-medium rounded-md border bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900 transition-all duration-150 cursor-pointer w-full overflow-hidden shadow-xs hover:shadow-sm"
      title={`${event.title}${category ? ` (${category})` : ""}`}
    >
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <span className="size-1.5 shrink-0 rounded-full bg-zinc-400" />
        {timeText && (
          <span className="shrink-0 text-[10px] font-semibold text-zinc-300">
            {timeText}
          </span>
        )}
        <span className="truncate font-medium text-white">{event.title}</span>
      </div>

      {isDayOrWeekView && category && (
        <span className="hidden sm:inline-block shrink-0 text-[9px] uppercase tracking-wider font-semibold text-zinc-400 ml-1">
          {category}
        </span>
      )}
    </div>
  );
};
