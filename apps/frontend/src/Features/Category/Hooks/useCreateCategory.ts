import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorySchema, type CategorySchemaType } from "@repo/schemas";
import { useZodForm } from "../../../Hooks/useZodForm";
import { createCategory } from "../Services/category.service";
import { categoryKeys } from "../Constants/categoryKeys";
import useShowToast from "../../../Hooks/useShowToast";

export default function useCreateCategory() {
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenSuccessToast,
    showToast: showSuccesToast,
    closeToast: closeSuccessToast,
  } = useShowToast();
  const {
    isOpen: isOpenErrorToast,
    showToast: showErrorToast,
    closeToast: closeErrorToast,
  } = useShowToast();
  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit, reset } = useAppForm({
    schema: CategorySchema,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      showSuccesToast();
      reset();
    },
    onError: (error) => {
      showErrorToast();
      console.error("Error al crear categoría:", error);
    },
  });

  const onSubmitCategory = (data: CategorySchemaType) => {
    createCategoryMutation.mutate(data);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmitCategory,
    isSubmitting: createCategoryMutation.isPending,
    isOpenSuccessToast,
    isOpenErrorToast,
    closeSuccessToast,
    closeErrorToast,
    closeToast: closeSuccessToast,
  };
}
