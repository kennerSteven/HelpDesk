import type { SVGProps } from "react";

interface EditIconProps extends SVGProps<SVGSVGElement> {
  id?: string;
  onEdit?: (id: string) => void;
}

export default function EditIcon({ id, onEdit, ...props }: EditIconProps) {
  return (
    <button
      type="button"
      aria-label="Editar tarea"
      className="rounded-lg bg-blue-100 p-2 text-blue-700 transition-colors hover:bg-blue-200"
      onClick={(event) => {
        event.stopPropagation();
        if (id) onEdit?.(id);
      }}
    >
      <svg
        className="size-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
        />
      </svg>
    </button>
  );
}
