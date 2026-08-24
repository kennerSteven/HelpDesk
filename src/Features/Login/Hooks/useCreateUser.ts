import { useState } from "react";
import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import useErrors from "../../../Shared/Hooks/useErrors";
import useForm from "../../../Shared/Hooks/useForm";
import { useNavigate } from "react-router-dom";
export default function useCreateUser() {
  const { values: newUser, HandleChange } = useForm({
    name: "",
    role: "",
    password: "",
  });
  const { errors, setErrors } = useErrors({ name: "", password: "", role: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = {
      name: "",
      password: "",
      role: "",
    };

    if (!newUser.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }
    if (!newUser.password.trim()) {
      errors.password = "La contraseña es obligatoria.";
    }
    if (!newUser.role.trim()) {
      errors.role = "El rol es obligatorio.";
    }
    setErrors(errors);
    const hasErrors =
      errors.name !== "" || errors.password !== "" || errors.role !== "";
    if (hasErrors) return;

    const users = GetStorageItem("users", []);
    users.push(newUser);
    SetStorageItem("users", users);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login", { replace: true });
    }, 2000);
  }

  return {
    HandleSubmit,
    HandleChange,
    newUser,
    errors,
    loading,
  };
}
