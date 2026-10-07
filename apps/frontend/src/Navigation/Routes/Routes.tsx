import { Routes, Route } from "react-router-dom";
import Login from "../../Features/Login/Components/Login";
import ProtectedRoute from "./ProtectedRoute";

import CreateNewUser from "../../Features/Login/Components/CreateNewUser";
import Task from "../../Features/Task/Components/Task/Task";

import DashboardLayout from "../../Layouts/DashboardLayout";
import CalendarPage from "../../Features/Calendar/CalendarPage";

export default function App() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createNewUser" element={<CreateNewUser />} />
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
