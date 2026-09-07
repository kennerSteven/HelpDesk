import Button from "../../../Components/Ui/Button";
import FieldMessageError from "../../../Components/Common/FieldMessage";
import Input from "../../../Components/Ui/Input";
import Select from "../../../Components/Ui/Select";


import { CreateUserSchema } from "@repo/schemas";

import useCreateUser from "../Hooks/useCreateUser";
import { useZodForm } from "../../../Hooks/useZodForm";
const roleOptions = [

  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

export default function CreateNewUser() {
  const { loading, HandleSubmit } = useCreateUser();
  const { useAppForm } = useZodForm();
  const { register, errors, handleSubmit } = useAppForm({
    schema: CreateUserSchema,
  });
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className=" shadow-xl shadow-zinc-300 rounded-xl p-5 bg-whit">
          <form onSubmit={handleSubmit(HandleSubmit)} className="space-y-4">
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
                register={register}
                name="name"
                label="Nombre"
                showLabel={true}
                placeholder="Nombre del usuario"
              />
              {errors.name && (
                <FieldMessageError message={errors.name.message} />
              )}
            </div>
            <div>
              <Input
                register={register}
                name="password"
                label="Contraseña"
                showLabel={true}
                placeholder="Contraseña"
                type="password"
              />
              {errors.password && (
                <FieldMessageError message={errors.password.message} />
              )}
            </div>

            <div>
              <div>
                <div>
                  <Select
                    register={register}
                    name="role"
                    label="Rol"
                    objectValues={roleOptions}
                  />
                  {errors.role && <FieldMessageError message={errors.role.message} />}
                </div>
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
