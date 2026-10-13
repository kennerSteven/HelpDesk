import { useQuery } from "@tanstack/react-query";
import { getCalendar } from "../../Services/calendar.service";
import { calendarKeys } from "../../Constants/calendarKeys";
import CalculateDaysBetween from "../../../../Utils/CalculateDaysBetween";
import type { CalendarCompleteResponse } from "@repo/schemas";
import type { TypeCalendarIncludeDateBetween } from "../../Types/types";

export default function useCalendarKpi() {
  const { data: Calendar = [] } = useQuery<CalendarCompleteResponse[]>({
    queryFn: getCalendar,
    queryKey: calendarKeys.all,
  });

  const taskNames: TypeCalendarIncludeDateBetween[] = Calendar.map((c: CalendarCompleteResponse) => ({
    // Mapea toda la data del objeto taskId (name, description, priority, dates, etc.)
    ...c.taskId,
    calendarId: c._id,
    calendarDate: c.date,
    calendarTitle: c.title,
    daysBetween: CalculateDaysBetween(c.date),
  }));

  return {
    taskNames,
    Calendar,
  };
}
