import Button from "../Ui/Button";

interface EmptyProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onCreate?: () => void;
}

export default function Empty({
  title = "No se encontraron tareas",
  description = "Comienza creando tu primera tarea. Solo tomará unos segundos.",
  buttonLabel = "Crear tarea",
  onCreate,
}: EmptyProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-8">
      <div className="max-w-md items-center text-center">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mx-auto size-20 text-zinc-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        <h2 className="mt-6 text-2xl font-bold text-zinc-900">{title}</h2>
        <p className="mt-4 text-pretty text-zinc-700">{description}</p>

        {onCreate && (
          <Button
            typeBtn="button"
            labelBtn={buttonLabel}
            onClick={onCreate}
            className="mt-6 w-full rounded-lg! px-6! py-3! text-sm! font-medium! transition-colors"
          />
        )}
      </div>
    </div>
  );
}
