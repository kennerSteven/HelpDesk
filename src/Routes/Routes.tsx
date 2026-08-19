import { Routes, Route } from "react-router-dom";
import Login from "../Features/Login/Components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Home";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}
