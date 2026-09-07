import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface useZodForm {
  schema?: any;
}

export function useZodForm() {

  function useAppForm({ schema }: useZodForm = {}) {
    const {
      formState: { errors },
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
    } = useForm({
      resolver: schema ? zodResolver(schema) : undefined,
    });
    return { register, handleSubmit, errors, reset, watch, setValue };
  }

  return {
    useAppForm,
  };
}
