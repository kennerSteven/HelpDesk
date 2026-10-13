import { Calendar } from "../Components/Calendar";
import useCalendar from "../Hooks/useCalendar";

export default function CalendarPage() {
  const {
    dataCalendar,
    isErrorCalendar,
    errorCalendar,
    isLoadingCalendar,
  } = useCalendar();



  return (
    <div className="min-h-full flex flex-col text-slate-800 bg-[#fbfcfd] p-4 md:p-6 lg:p-8">
      {isLoadingCalendar ? (
        <div className="max-w-[1600px] w-full mx-auto animate-pulse flex flex-col gap-6">
          <div className="h-16 bg-slate-200/60 rounded-xl w-full" />
          <div className="grid grid-cols-1 xl:grid-cols-9 gap-6">
            <div className="xl:col-span-6 h-[600px] bg-slate-200/50 rounded-2xl" />
            <div className="xl:col-span-3 h-[600px] bg-slate-200/40 rounded-2xl" />
          </div>
        </div>
      ) : isErrorCalendar ? (
        <div className="max-w-xl mx-auto my-12 rounded-xl bg-rose-50 border border-rose-200 p-6 text-center">
          <p className="text-sm font-semibold text-rose-700">{errorCalendar?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-1.5 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <Calendar initialEvents={dataCalendar} />
      )}
    </div>
  );
}
