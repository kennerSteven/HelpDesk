import { useRef, useState } from "react";
import { formatSpanishDate, getTodayString } from "../../../Utils/Date.utils";
import type { SelectedDateInfo } from "../Types/types";

export type CalendarViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

export default function useCalendarApi() {
  const calendarRef = useRef<any | null>(null);

  const [currentView, setCurrentView] = useState<CalendarViewType>("dayGridMonth");

  const [calendarTitle, setCalendarTitle] = useState("");

  const [selectedDateInfo, setSelectedDateInfo] = useState<SelectedDateInfo>(
    () => {
      const todayStr = getTodayString();
      return {
        dateStr: todayStr,
        dayName: formatSpanishDate(todayStr),
      };
    },
  );

  const handleDatesSet = (dateInfo: any) => {
    if (dateInfo?.view?.title) {
      const rawTitle = dateInfo.view.title;
      const formattedTitle =
        rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
      setCalendarTitle(formattedTitle);
    }
    if (dateInfo?.view?.type) {
      setCurrentView(dateInfo.view.type as CalendarViewType);
    }
  };

  const handleNextMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
  };

  const handlePrevMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
  };

  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    const todayStr = getTodayString();
    setSelectedDateInfo({
      dateStr: todayStr,
      dayName: formatSpanishDate(todayStr),
    });
  };

  const handleChangeView = (viewName: CalendarViewType) => {
    setCurrentView(viewName);
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(viewName);

      if (viewName === "timeGridDay" || viewName === "timeGridWeek") {
        const targetDate = selectedDateInfo?.dateStr || getTodayString();
        api.gotoDate(targetDate);
      }
    }
  };

  const handleSelectDateOnly = (dateStr: string) => {
    const dayName = formatSpanishDate(dateStr);
    setSelectedDateInfo({
      dateStr,
      dayName,
    });
  };

  return {
    calendarRef,
    currentView,
    setCurrentView,
    calendarTitle,
    setCalendarTitle,
    selectedDateInfo,
    setSelectedDateInfo,
    handleDatesSet,
    handleNextMonth,
    handlePrevMonth,
    handleToday,
    handleChangeView,
    handleSelectDateOnly,
  };
}