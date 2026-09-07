import { Outlet } from "react-router-dom";
import Sidebar from "../Navigation/Routes/Sidebar/Sidebar";
import React from "react";

export default React.memo(function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
});
