import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Login/UseLogin";
import type { LoginTypes } from "../Types/LoginTypes";
import { GetStorageItem } from "../../../Utils/Storage.utils";

export default function HandleLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<LoginTypes>({
    name: "",
    password: "",
  });
  const [user, setUser] = useState<LoginTypes>({
    name: "",
    password: "",
  });

  function HandleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

    
    const errors: LoginTypes = {
      name: "",
      password: "",
    };

    if (!fieldError.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }

    if (!fieldError.password.trim()) {
      errors.password = "La contraseña es obligatoria.";
    }
    e.preventDefault();

    setFieldError(errors);

    const hasErrors = errors.name !== "" || errors.password !== "";

    if (hasErrors) {
      return;
    }

    const storedUsers = GetStorageItem("users", "[]");

    const auth = storedUsers.find(
      (storedUser: LoginTypes) =>
        storedUser.name === user.name && storedUser.password === user.password,
    );

    if (!auth) {
      return setError("No ta registrao");
    }

    login(auth);
    navigate("/", { replace: true });
  }

  return {
    HandleChange,
    HandleSubmit,
    error,
    user,
    fieldError,
  };
}
