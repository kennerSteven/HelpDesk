import type { SVGProps } from "react";

export default function OcioIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M6 10v4m-2-2h4m6 0h.01m3.99 0h.01M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z"
      />
    </svg>
  );
}
