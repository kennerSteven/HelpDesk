
import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";

import useCreateUser from "../Hooks/useCreateUser";

export default function CreateNewUser() {

  const { HandleChange, HandleSubmit, newUser } = useCreateUser()


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">





        <div className=" shadow-xl shadow-zinc-300 rounded-xl p-5 bg-whit">
          <form onSubmit={HandleSubmit} className="space-y-4">

            <div className="mb-5">
              <span className="text-xs font-medium text-gray-400">
                Administración
              </span>

              <h1 className="text-2xl font-semibold tracking-tight text-black">
                Nuevo usuario
              </h1>
            </div>
            <div>


              <Input
                value={newUser.name}
                name="name"
                onChange={HandleChange}
                placeholder="Nombre del usuario"
              />
            </div>


            <div>


              <Input
                value={newUser.password}
                name="password"
                onChange={HandleChange}
                placeholder="Contraseña"
                type="password"
              />
            </div>

            <div>


              <select

                name="role"
                value={newUser.role}
                onChange={HandleChange}
                className="
                  w-full
                  h-10
                  rounded-lg
                  border border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-black
                  outline-none
                  transition
                  hover:border-gray-300
                  focus:border-black
                  focus:bg-white
                "
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>


            <div className="pt-1">
              <Button
                typeBtn="submit"
                labelBtn="Crear usuario"
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}