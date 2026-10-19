import { Routes, Route } from "react-router-dom";
import Login from "../../Features/Login/Components/Login";
import ProtectedRoute from "./ProtectedRoute";
import CreateNewUser from "../../Features/Login/Components/CreateNewUser";

import ProjectPage from "../../Features/Projects/Pages/Project";
import DashboardLayout from "../../Layouts/DashboardLayout";
import CalendarPage from "../../Features/Calendar/Page/CalendarPage";
import ProjectTopbar from "../../Features/Projects/Components/ProjectTopbar";
import CalendarTopbar from "../../Features/Calendar/Components/CalendarTopbar";

export default function App() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createNewUser" element={<CreateNewUser />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<ProjectTopbar />}>
                  <ProjectPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<ProjectTopbar />}>
                  <ProjectPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<ProjectTopbar />}>
                  <ProjectPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<ProjectTopbar />}>
                  <ProjectPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Calendar"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<CalendarTopbar />}>
                  <CalendarPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <DashboardLayout topBar={<CalendarTopbar />}>
                  <CalendarPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
