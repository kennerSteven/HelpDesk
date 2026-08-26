import { useState } from "react";
import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import type { CreateUserTypes } from "../Types/Types";
import { useNavigate } from "react-router-dom";

export default function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  function HandleSubmit(data: CreateUserTypes) {
    console.log(data)
    const users = GetStorageItem("users", []);
    users.push(data);
    SetStorageItem("users", users);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login", { replace: true });
    }, 2000);
  }

  return {
    HandleSubmit,
    loading,
  };
}
