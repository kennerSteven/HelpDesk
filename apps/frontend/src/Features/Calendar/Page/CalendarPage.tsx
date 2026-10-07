/**
 * CalendarPage.tsx
 *
 * Página contenedora del Calendario con gestión de carga, estados de error
 * y estructura de contenedor responsiva.
 */

import { useEffect, useState } from "react";
import { Calendar, type CalendarEvent } from "../Components/Calendar";
import { getCalendar } from "../Services/calendar.service";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCalendarTasks() {
      try {
        const tasks = await getCalendar();
        setEvents(tasks);
      } catch (error) {
        console.error("Error al cargar las tareas del calendario:", error);
        setErrorMessage("No se pudieron cargar las tareas del calendario.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCalendarTasks();
  }, []);

  return (
    <div className="min-h-full flex flex-col text-slate-800 bg-[#fbfcfd] p-4 md:p-6 lg:p-8">
      {isLoading ? (
        <div className="max-w-[1600px] w-full mx-auto animate-pulse flex flex-col gap-6">
          <div className="h-16 bg-slate-200/60 rounded-xl w-full" />
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 h-[600px] bg-slate-200/50 rounded-2xl" />
            <div className="xl:col-span-4 h-[600px] bg-slate-200/40 rounded-2xl" />
          </div>
        </div>
      ) : errorMessage ? (
        <div className="max-w-xl mx-auto my-12 rounded-xl bg-rose-50 border border-rose-200 p-6 text-center">
          <p className="text-sm font-semibold text-rose-700">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-1.5 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <Calendar initialEvents={events} />
      )}
    </div>
  );
}
