import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface useZodForm {
  schema: any;
}

export function useZodForm() {

  function useAppForm({ schema }: useZodForm) {
    const {
      formState: { errors },
      register,
      handleSubmit,
      reset,
    } = useForm({
      resolver: zodResolver(schema),
    });
    return { register, handleSubmit, errors, reset };
  }

  return {
    useAppForm,
  };
}
