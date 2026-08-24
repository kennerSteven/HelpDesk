import Button from "../../../Components/Ui/Button";
import FieldMessageError from "../../../Components/Ui/FieldMessage";
import Input from "../../../Components/Ui/Input";
import Select from "../../../Components/Ui/Select";

import useCreateUser from "../Hooks/useCreateUser";

const roleOptions = {
  "": "Seleccione una opcion",
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export default function CreateNewUser() {
  const { HandleChange, HandleSubmit, newUser, errors, loading } =
    useCreateUser();

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
                label="Nombre"
                showLabel={true}
                onChange={HandleChange}
                placeholder="Nombre del usuario"
              />
              {errors.name && <FieldMessageError message={errors.name} />}
            </div>
            <div>
              <Input
                value={newUser.password}
                name="password"
                label="Contraseña"
                showLabel={true}
                onChange={HandleChange}
                placeholder="Contraseña"
                type="password"
              />
              {errors.password && (
                <FieldMessageError message={errors.password} />
              )}
            </div>

            <div>
              <div>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={HandleChange}
                  label="Rol"
                  objectValues={roleOptions}
                />
                {errors.role && <FieldMessageError message={errors.role} />}
              </div>
            </div>

            <div className="pt-1">
              <Button
                loadingText="Creando cuenta..."
                labelBtn="Crear cuenta"
                typeBtn="submit"
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
