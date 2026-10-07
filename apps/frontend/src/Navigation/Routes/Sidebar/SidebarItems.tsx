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
        end={item.exact ?? item.to === "/"}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
            isActive
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900"
          }`
        }
      >
        <span className="shrink-0 transition-transform duration-150 group-hover:scale-105">
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
        {item.badge && (
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 group-hover:bg-slate-200">
            {item.badge}
          </span>
        )}
      </NavLink>
    </li>
  );
}
