import type { SVGProps } from "react";

export default function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}
