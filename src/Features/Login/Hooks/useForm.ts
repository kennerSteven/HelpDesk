import { useState, type ChangeEvent } from "react";

export default function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  function HandleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return {
    values,
    setValues,
    HandleChange,
  };
}