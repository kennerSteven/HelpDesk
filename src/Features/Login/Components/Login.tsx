import Button from "../../../Components/Ui/Button";
import FieldMessageError from "../../../Components/Ui/FieldMessage";
import Input from "../../../Components/Ui/Input";

import useLogin from "../Hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    HandleChange,
    HandleSubmit,
    error,
    user,
    fieldError,
    loading,
  } = useLogin();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-sm ">




        <div className=" shadow-xl shadow-zinc-300 rounded-xl p-5 bg-white">

          <form
            onSubmit={HandleSubmit}
            className="flex flex-col gap-4"
          >

            <div className="mb-3">
              <span className="text-xs font-medium text-zinc-400">
                Bienvenido
              </span>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black">
                Iniciar sesión
              </h1>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-1.5 text-xs font-medium text-zinc-700"
              >
                Usuario
              </label>

              <Input

                name="name"
                value={user?.name || ""}
                placeholder="Ingresa tu usuario"
                onChange={HandleChange}
              />

              {fieldError?.name && (
                <FieldMessageError message={fieldError.name} />
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-xs font-medium text-zinc-700"
              >
                Contraseña
              </label>

              <Input

                name="password"
                value={user.password}
                onChange={HandleChange}
                type="password"
                placeholder="Ingresa tu contraseña"
              />

              {fieldError.password && (
                <FieldMessageError message={fieldError.password} />
              )}
            </div>


            {error && (
              <FieldMessageError message={error} />
            )}


            <div className="border-t border-zinc-100 pt-4">

              <p className="text-xs text-zinc-500 text-center">
                ¿No estás registrado?{" "}
                <Link
                  to="/createNewUser"
                  replace
                  className="
                    text-black
                    font-semibold
                    underline
                    underline-offset-2
                    hover:text-zinc-500
                    transition
                  "
                >
                  Regístrate aquí
                </Link>
              </p>

            </div>


            <div className="flex justify-center">
              <Button
                loadingText="Iniciando sesión..."
                labelBtn="Iniciar sesión"
                typeBtn="submit"
                loading={loading}
              />
            </div>

          </form>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-zinc-400">
          Acceso seguro al sistema
        </p>

      </div>
    </main>
  );
}