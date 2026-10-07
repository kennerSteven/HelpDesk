import { useEffect, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import {
  getTodayString,
  getTomorrowString,
} from "../../../Utils/Date.utils";

export type DatePreset = "today" | "tomorrow" | "custom";

interface UseHandleDateProps {
  setValue: UseFormSetValue<any>;
  dateInitValue?: string;
  dateFinishValue?: string;
}

export default function useHandleDate({
  setValue,
  dateInitValue,
  dateFinishValue,
}: UseHandleDateProps) {
  const [datePreset, setDatePreset] = useState<DatePreset>("today");

  // Inicializar con la fecha de hoy por defecto al cargar si los campos están vacíos
  useEffect(() => {
    const today = getTodayString();
    if (!dateInitValue) {
      setValue("dateInit", today, { shouldValidate: true });
    }
    if (!dateFinishValue) {
      setValue("dateFinish", today, { shouldValidate: true });
    }
  }, []);

  const handleSelectToday = () => {
    const today = getTodayString();
    setValue("dateInit", today, { shouldValidate: true, shouldDirty: true });
    setValue("dateFinish", today, { shouldValidate: true, shouldDirty: true });
    setDatePreset("today");
  };

  const handleSelectTomorrow = () => {
    const tomorrow = getTomorrowString();
    setValue("dateInit", tomorrow, { shouldValidate: true, shouldDirty: true });
    setValue("dateFinish", tomorrow, { shouldValidate: true, shouldDirty: true });
    setDatePreset("tomorrow");
  };

  const handleSelectCustom = () => {
    setDatePreset("custom");
    if (!dateInitValue) {
      setValue("dateInit", getTodayString(), { shouldValidate: true, shouldDirty: true });
    }
    if (!dateFinishValue) {
      setValue("dateFinish", getTodayString(), { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("dateInit", val, { shouldValidate: true, shouldDirty: true });
    setValue("dateFinish", val, { shouldValidate: true, shouldDirty: true });
  };

  return {
    datePreset,
    setDatePreset,
    handleSelectToday,
    handleSelectTomorrow,
    handleSelectCustom,
    handleCustomDateChange,
    todayString: getTodayString(),
    tomorrowString: getTomorrowString(),
  };
}
