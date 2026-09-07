import type { SVGProps } from "react";

export default function InversionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="size-6 text-current"
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
        d="M3 3v18h18M7 14l4-4 4 4 5-6m0 0h-3.5m3.5 0v3.5"
      />
    </svg>
  );
}
