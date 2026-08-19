import { useState, type ChangeEvent } from "react";
import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";
import { MOCK_USERS } from "../Data/MockUsers";
import { useAuth } from "../Context/Login/UseLogin";
import { replace, useNavigate } from "react-router-dom";

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
    console.log(user);
    setUser({
      name: "",
      password: "",
    });

    const auth = MOCK_USERS.find(
      (mock) => mock.name === user.name && mock.password === user.password,
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
        <Input name="name" value={user.name} onChange={HandleChange} />
        <Input name="password" value={user.password} onChange={HandleChange} />
        <Button labelBtn="Iniciar sesion" typeBtn="submit" />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
