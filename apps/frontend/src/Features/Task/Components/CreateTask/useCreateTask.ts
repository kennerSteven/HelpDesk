import { useEffect } from "react";
import { useZodForm } from "../../../../Hooks/useZodForm";
import { CreateTaskSchema, type CreateTaskSchemaType } from "@repo/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../Services/task.service";
import { taskKeys } from "../../Constants/taskKeys";
import { projectKeys } from "../../../Projects/Constants/projectKeys";
import useShowToast from "../../../../Hooks/useShowToast";

interface UseCreateTaskFormProps {
  onSuccess: () => void;
  projectId?: string;
}

export function useCreateTask({
  onSuccess,
  projectId,
}: UseCreateTaskFormProps) {
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
    setValue("status", "PENDING");
  }, [setValue]);

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
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

  function onSubmit(data: CreateTaskSchemaType) {
    const rawData = {
      ...data,
      status: data.status || "PENDING",
      projectId: projectId || undefined,
    };
    console.log("Raw Data", rawData);
    mutation.mutate(rawData as any);
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
    showSteps,
  };
}
