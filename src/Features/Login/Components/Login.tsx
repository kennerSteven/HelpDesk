import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";

import useLogin from "../Hooks/useLogin";

export default function Login() {
  const { HandleChange, HandleSubmit, error, user, fieldError } = useLogin();

  return (
    <div>
      <form
        className="flex justify-center items-center min-h-screen"
        onSubmit={HandleSubmit}
      >
        <div className=" bg-white shadow-md shadow-zinc-200 p-5 rounded-xl">
          <h1 className="text-2xl text-center py-3 ">Iniciar sesion</h1>
          <div className="flex flex-col">
            <Input
              name="name"
              value={user.name}
              placeholder="Name"
              onChange={HandleChange}
            />
            {fieldError.name && <p>{fieldError.name}</p>}
            <Input
              name="password"
              value={user.password}
              onChange={HandleChange}
              type="password"
              placeholder="Password"
            />
            {fieldError.password && <p>{fieldError.password}</p>}
            <div className="m-auto my-3">
              <Button labelBtn="Iniciar sesion" typeBtn="submit" />
            </div>
          </div>

          {error && <p>{error}</p>}
        </div>
      </form>
      {/* <div className="mt-10">
      <h1 className="text-4xl ">CREAR nuevo usuario</h1>
      <CreateNewUser />
    </div> */}
    </div>
  );
}
