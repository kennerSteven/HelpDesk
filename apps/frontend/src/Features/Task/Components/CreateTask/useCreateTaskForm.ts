import { useEffect } from "react";
import { useZodForm } from "../../../../Hooks/useZodForm";
import useModal from "../../../../Hooks/useModal";
import useCategory from "../../../Category/Hooks/useCategory";
import useHandleDate from "../../Hooks/useHandleDate";
import useSubmitTask from "../../Hooks/useSubmitTask";
import { CreateTaskSchema } from "@repo/schemas";

interface UseCreateTaskFormProps {
  onSuccess?: () => void;
}

export function useCreateTaskForm({ onSuccess }: UseCreateTaskFormProps = {}) {
  const { HandleSubmit } = useSubmitTask();
  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset, watch, setValue } = useAppForm(
    {
      schema: CreateTaskSchema,
    },
  );
  const { openModal, closeModal, isOpen } = useModal();
  const { GetAllCategories, categories, UpdateCategories } = useCategory({
    closeModal,
  });

  const selectedPriority = watch("priority") || "MEDIUM";
  const descriptionValue = watch("description") || "";
  const dateInitValue = watch("dateInit") || "";
  const dateFinishValue = watch("dateFinish") || "";

  const {
    datePreset,
    handleSelectToday,
    handleSelectTomorrow,
    handleSelectCustom,
    handleCustomDateChange,
    todayString,
    tomorrowString,
  } = useHandleDate({
    setValue,
    dateInitValue,
    dateFinishValue,
  });

  useEffect(() => {
    GetAllCategories();
  }, []);

  const categoriesOptions = categories.map((c: any) => ({
    id: c._id,
    value: c._id,
    label: c.nameCategory,
  }));

  const handleSaveTask = async (data: any) => {
    await HandleSubmit(data);
    reset();
    closeModal();
    onSuccess?.();
  };

  return {
    register,
    errors,
    handleSubmit,
    handleSaveTask,
    watch,
    setValue,

    // Categorias & Modales
    openModal,
    closeModal,
    isOpen,
    categories,
    UpdateCategories,
    categoriesOptions,

    // UI states
    selectedPriority,
    descriptionValue,

    // Fechas
    dateInitValue,
    dateFinishValue,
    datePreset,
    handleSelectToday,
    handleSelectTomorrow,
    handleSelectCustom,
    handleCustomDateChange,
    todayString,
    tomorrowString,
  };
}
