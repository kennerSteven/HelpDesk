import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Login/UseLogin";
import type { LoginTypes } from "../Types/Types";
import { GetStorageItem } from "../../../Utils/Storage.utils";
import useForm from "./useForm";
import useErrors from "./useErrors";
export default function HandleLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false)
  const { errors: fieldError, setErrors } = useErrors({ name: "", password: "" })
  const { values: user, HandleChange } = useForm({ name: "", password: "" })
  function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors: LoginTypes = {
      name: "",
      password: "",
    };
    if (!user.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }
    if (!user.password.trim()) {
      errors.password = "La contraseña es obligatoria.";
    }
    setErrors(errors);
    const hasErrors = errors.name !== "" || errors.password !== "";
    if (hasErrors) return


    setLoading(true)
    setTimeout(() => {
      const storedUsers = GetStorageItem("users", []);
      const auth = storedUsers.find(
        (storedUser: LoginTypes) =>
          storedUser.name === user.name && storedUser.password === user.password,
      );

      if (!auth) {
        setError("Parece que no se encuentra registrado :(");;
        setLoading(false)
        return
      }

      login(auth);
      navigate("/", { replace: true });

      console.log("error al iniciar sesion", error)
    }, 2000);

  }

  return {
    HandleChange,
    HandleSubmit,
    error,
    user,
    fieldError,
    loading
  };
}
