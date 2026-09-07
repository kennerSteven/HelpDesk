import { useAuth } from "../../../Features/Login/Context/Login/UseLogin";
import { sidebarItems } from "./Sidebar.config";
import SidebarItem from "./SidebarItems";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e border-gray-200 bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-700">
            L
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <ul className="space-y-1 border-t border-gray-100 pt-4">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={logout}
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 hover:bg-red-500 hover:text-red-100 text-red-500 cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
