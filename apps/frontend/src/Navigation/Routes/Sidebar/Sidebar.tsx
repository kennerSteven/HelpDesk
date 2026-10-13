// import { useAuth } from "../../../Features/Login/Context/Login/UseLogin";
import { sidebarSections } from "./Sidebar.config";
import SidebarItem from "./SidebarItems";
// import { LogoutIcon } from "../../../Components/Icons/SidebarIcons";

export default function Sidebar() {
        // const { user, logout } = useAuth();

  return (
    <aside className="sticky top-0 flex h-screen  flex-col justify-between border-r border-slate-200/90 bg-white shadow-xs z-30 select-none">
      {/* Brand Header */}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.id} className="space-y-1.5">
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
