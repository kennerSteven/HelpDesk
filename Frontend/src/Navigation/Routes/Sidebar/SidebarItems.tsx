import { NavLink } from "react-router-dom";
import type { SidebarItemConfig } from "./Sidebar.config";

interface SidebarItemProps {
  item: SidebarItemConfig;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.to === "/"}
        aria-label={item.label}
        className={({ isActive }) =>
          [
            "group relative flex justify-center rounded-lg px-2 py-1.5 transition-all duration-200",
            isActive
              ? "bg-black text-white shadow-sm"
              : "text-black hover:bg-zinc-100 hover:text-black",
          ].join(" ")
        }
      >
        {item.icon}

        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
          {item.label}
        </span>
      </NavLink>
    </li>
  );
}
