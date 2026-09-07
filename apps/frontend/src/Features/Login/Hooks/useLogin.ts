import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Login/UseLogin";

import { GetStorageItem } from "../../../Utils/Storage.utils";
import type { LoginTypes } from "../Types/Types";
export default function HandleLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState("");
  function HandleSubmit(data: LoginTypes) {
    setLoading(true);
    setTimeout(() => {
      const storedUsers = GetStorageItem("users", []);
      const auth = storedUsers.find(
        (storedUser: LoginTypes) =>
          storedUser.name === data.name &&
          storedUser.password === data.password,
      );
      if (!auth) {
        setUserNotFound("Usuario no encontrado");
        return setLoading(false);
      }

      login(auth);
      navigate("/", { replace: true });
    }, 2000);
  }

  return {
    HandleSubmit,
    userNotFound,
    loading,
  };
}
