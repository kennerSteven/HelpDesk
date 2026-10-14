import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useZodForm } from "../../../Hooks/useZodForm";
import {
  CreateProjectSchema,
  type CreateProjectSchemaType,
} from "@repo/schemas";
import { createProject } from "../Services/project.service";
import { projectKeys } from "../Constants/projectKeys";

interface UseCreateProjectProps {
  onClose?: () => void;
}

export default function useCreateProject({
  onClose,
}: UseCreateProjectProps = {}) {
  const queryClient = useQueryClient();
  const { useAppForm } = useZodForm();

  const { register, reset, errors, handleSubmit, setValue } = useAppForm({
    schema: CreateProjectSchema,
  });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      reset();
      onClose?.();
    },
    onError: (error) => {
      console.error("Error al crear proyecto:", error);
    },
  });

  function onSubmit(data: CreateProjectSchemaType) {
    createProjectMutation.mutate(data);
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    isSubmitting: createProjectMutation.isPending,
    isSuccess: createProjectMutation.isSuccess,
    isError: createProjectMutation.isError,
  };
}
