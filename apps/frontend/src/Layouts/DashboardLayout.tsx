import { Outlet } from "react-router-dom";
import Sidebar from "../Navigation/Routes/Sidebar/Sidebar";
import React from "react";

type props = {
  topBar?: React.ReactNode;
  children?: React.ReactNode;
};

export default React.memo(function DashboardLayout({ topBar, children }: props) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="min-h-[72px] py-4 shrink-0 border-b border-slate-200 bg-white flex items-center px-8 shadow-sm z-10">
          {topBar}
        </header>

        <main className="flex-1 overflow-y-auto">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
});
