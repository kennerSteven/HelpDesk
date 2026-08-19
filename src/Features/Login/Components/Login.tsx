import { useState, type ChangeEvent } from "react";
import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";

import { useAuth } from "../Context/Login/UseLogin";
import { replace, useNavigate } from "react-router-dom";
import CreateNewUser from "./CreateNewUser";

interface props {
  name: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState<props>({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");

  function HandleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

    e.preventDefault();

    const storedUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    console.log(storedUsers)
    const auth = storedUsers.find(
      (storedUser: props) =>
        storedUser.name === user.name &&
        storedUser.password === user.password
    );

    if (!auth) {
      return setError("No ta registrao");
    }

    login(auth);
    console.log("Si esta registrado");

    navigate("/", { replace: true });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl ">Iniciar sesion</h1>
        <Input name="name" value={user.name} onChange={HandleChange} />
        <Input name="password" value={user.password} onChange={HandleChange} />
        <Button labelBtn="Iniciar sesion" typeBtn="submit" />
        {error && <p>{error}</p>}
      </form>
      <div className="mt-10">
        <h1 className="text-4xl ">CREAR nuevo usuario</h1>
        <CreateNewUser />
      </div>
    </div>
  );
}
