import { useEffect } from "react";
import { useZodForm } from "../../../../Hooks/useZodForm";
import { CreateTaskSchema, type TaskResponseType } from "@repo/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../Services/task.service";
import { taskKeys } from "../../Constants/taskKeys";
import useShowToast from "../../../../Hooks/useShowToast";

interface UseCreateTaskFormProps {
  onSuccess: () => void;
}

export function useCreateTask({ onSuccess }: UseCreateTaskFormProps) {
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenErrorToast,
    showToast: showErrorToast,
    closeToast: closeErrorToast,
  } = useShowToast();

  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset, watch, setValue } = useAppForm(
    {
      schema: CreateTaskSchema,
    },
  );

  useEffect(() => {
    setValue("priority", "MEDIUM");
  }, [setValue]);

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      reset();
      onSuccess();
    },
    onError: (error) => {
      showErrorToast();
      console.error("Error al crear tarea:", error);
    },
  });

  const selectedPriority = watch("priority") || "MEDIUM";
  const descriptionValue = watch("description") || "";
  const dateInitValue = watch("dateInit") || "";
  const dateFinishValue = watch("dateFinish") || "";
const showSteps = watch("showSteps") || false;
  function onSubmit(data: TaskResponseType) {
    mutation.mutate(data);
  }

  return {
    register,
    errors,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    selectedPriority,
    descriptionValue,
    dateInitValue,
    dateFinishValue,
    isOpenErrorToast,
    closeErrorToast,
    isSubmitting: mutation.isPending,
    showSteps
  };
}
