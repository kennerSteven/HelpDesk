export default function CalculateDaysBetween(dateInput?: Date | string | null) {
  if (!dateInput) return 0;

  const MILLISECONDS_PER_DAY = 86400000;

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  // Las barras obligan a JavaScript a usar la hora local y no UTC
  const localDateStr =
    typeof dateInput === "string" ? dateInput.replace(/-/g, "/") : dateInput;
  const calendarDate = new Date(localDateStr);
  calendarDate.setHours(0, 0, 0, 0);

  const calculateDiference =
    (calendarDate.getTime() - todayDate.getTime()) / MILLISECONDS_PER_DAY;
  return calculateDiference;
}
