import { useAuth } from "../../../Features/Login/Context/Login/UseLogin";
import { sidebarSections } from "./Sidebar.config";
import SidebarItem from "./SidebarItems";
import { LogoutIcon } from "../../../Components/Icons/SidebarIcons";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <aside className="sticky top-0 flex h-screen w-64 min-w-64 flex-col justify-between border-r border-slate-200/90 bg-white shadow-xs z-30 select-none">
      {/* Brand Header */}
      <div className="flex  border-b border-slate-100">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs font-bold text-base tracking-wider">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
              Task Manager
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Workspace
            </span>
          </div>
        </div>


       

      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.id} className="space-y-1.5">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-3 space-y-2">
        {/* User preview */}
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-xs shrink-0">
            {userInitial}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="truncate text-xs font-bold text-slate-900">
              {user?.name || "Usuario"}
            </span>
            <span className="truncate text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {user?.role || "Activo"}
            </span>
          </div>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="group flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-150 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
        >
          <LogoutIcon className="size-4 opacity-75 group-hover:opacity-100 text-slate-500 group-hover:text-rose-600" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
